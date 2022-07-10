require("dotenv").config({
  path: "./.env.local"
})

const express = require("express")
const cors = require("cors")
const mongodb = require("mongodb")
const expressFileUpload = require("express-fileupload")
const uuid = require("uuid")

const DB_ENDPOINT = `mongodb+srv://redaxe:${process.env.DB_PASSWORD}@cluster0.h6rgl.mongodb.net/?retryWrites=true&w=majority`

const app = express()
app.use(cors())
app.use(express.json())
app.use(expressFileUpload())

app.get("/list", async (req, res) => {
  const connection = await mongodb.MongoClient.connect(DB_ENDPOINT)
  const db = connection.db("blog")
  const collection = db.collection("post")

  const posts = await collection.find({}).toArray()
  res.json(posts)
  connection.close()
})

app.post("/create", async (req, res) => {
  const connection = await mongodb.MongoClient.connect(DB_ENDPOINT)
  const db = connection.db("blog")
  const collection = db.collection("post")

  const post = req.body
  await collection.insertOne(post)
  
  res.json({
    success: true
  })
  connection.close()
})

app.post("/upload/image", async (req, res) => {
  const image = req.files.image
  const imageName = uuid.v4() + '.' + image.name.split(".").pop()
  image.mv(`./public/images/${imageName}`)
  res.json({
    data: "http://localhost:3636/images/" + imageName
  })
})

app.get("/images/:imageName", async (req, res) => {
  res.sendFile(`${__dirname}/public/images/${req.params.imageName}`)
})

app.listen(3636, () => {
  console.log("Server is running on port 3636")
})