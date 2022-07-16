require("dotenv").config({
  path: "./.env.local",
});

const express = require("express");
const cors = require("cors");
const mongodb = require("mongodb");
const expressFileUpload = require("express-fileupload");
const uuid = require("uuid");

const DB_ENDPOINT = `mongodb+srv://redaxe:${process.env.DB_PASSWORD}@cluster0.h6rgl.mongodb.net/?retryWrites=true&w=majority`;

const app = express();
app.use(cors());
app.use(express.json());
app.use(expressFileUpload());

app.get("/list", async (req, res) => {
  const connection = await mongodb.MongoClient.connect(DB_ENDPOINT);
  const db = connection.db("blog");
  const collection = db.collection("post");

  const posts = await collection.find({}).sort({ _id: -1 }).toArray();
  res.json(posts);
  connection.close();
});

app.post("/create", async (req, res) => {
  const connection = await mongodb.MongoClient.connect(DB_ENDPOINT);
  const db = connection.db("blog");
  const collection = db.collection("post");

  const post = req.body;
  post.time = new Date(post.time);
  console.log(post.time);
  await collection.insertOne(post);

  res.json({
    success: true,
  });
  connection.close();
});

app.post("/upload/image", async (req, res) => {
  const image = req.files.image;
  const imageName = uuid.v4() + "." + image.name.split(".").pop();
  image.mv(`./public/images/${imageName}`);
  res.json({
    data: "http://localhost:3636/images/" + imageName,
  });
});

app.get("/images/:imageName", async (req, res) => {
  res.sendFile(`${__dirname}/public/images/${req.params.imageName}`);
});

app.get("/article/:id", async (req, res) => {
  const connection = await mongodb.MongoClient.connect(DB_ENDPOINT);
  const db = connection.db("blog");
  const collection = db.collection("post");

  const post = await collection.findOne({
    _id: mongodb.ObjectId(req.params.id),
  });
  res.json(post);
  connection.close();
});

app.delete("/article/:id", async (req, res) => {
  const connection = await mongodb.MongoClient.connect(DB_ENDPOINT);
  const db = connection.db("blog");
  const collection = db.collection("post");

  await collection.deleteOne({
    _id: mongodb.ObjectId(req.params.id),
  });
  res.json({
    success: true,
  });
  connection.close();
});

app.patch("/article/:id", async (req, res) => {
  const connection = await mongodb.MongoClient.connect(DB_ENDPOINT);
  const db = connection.db("blog");
  const collection = db.collection("post");

  const post = req.body;
  post.time = new Date(post.time);
  await collection.updateOne(
    { _id: mongodb.ObjectId(req.params.id) },
    { $set: post }
  );
  res.json({
    success: true,
  });
  connection.close();
})

app.listen(3636, () => {
  console.log("Server is running on port 3636");
});
