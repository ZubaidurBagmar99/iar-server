require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.zxjz8qw.mongodb.net/?retryWrites=true&w=majority`;
// const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
// const url = "mongodb://127.0.0.1:27017";

const client = new MongoClient(url, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const dbConnect = async () => {
  try {
    client.connect();
    console.log("Database Connected Successfully✅ ");
  } catch (error) {
    console.log(error.name, error.message);
  }
};
dbConnect();

// Database Collection
const journal = client.db("iarDb").collection("journal");
const magazine = client.db("iarDb").collection("magazine");
const member = client.db("iarDb").collection("member");
const books = client.db("iarDb").collection("books");

app.get("/", (req, res) => {
  res.send("Server is Running!");
});

// main content start

app.get("/journal", async (req, res) => {
  const result = await journal.find().toArray();
  res.send(result);
});

app.get("/journal/:id", async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const result = await journal.findOne(query);
  res.send(result);
});

app.get("/member", async (req, res) => {
  const result = await member.find().toArray();
  res.send(result);
});

app.get("/magazine", async (req, res) => {
  const result = await magazine.find().toArray();
  res.send(result);
});

app.get("/magazine/:id", async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const result = await magazine.findOne(query);
  res.send(result);
});

app.get("/books", async (req, res) => {
  const result = await books.find().toArray();
  res.send(result);
});

app.get("/books/:id", async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const result = await books.findOne(query);
  res.send(result);
});

// main content End
app.listen(port, () => {
  console.log(`Server PORT: ${port}`);
});
