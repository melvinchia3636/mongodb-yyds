require("dotenv").config({
  path: "./.env.local"
})

const express = require("express")
const cors = require("cors")
const mongodb = require("mongodb")

const DB_ENDPOINT = `mongodb+srv://redaxe:${process.env.DB_PASSWORD}@cluster0.h6rgl.mongodb.net/?retryWrites=true&w=majority`

const app = express()
app.use(cors())
app.use(express.json())

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
  await collection.insertOne(post)``
  res.json(post)
  connection.close()
})

app.listen(3636, () => {
  console.log("Server is running on port 3636")
})