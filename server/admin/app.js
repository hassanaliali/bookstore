const express = require("express");
const { getDb, connectToDb } = require("./db");

const { ObjectId } = require("mongodb");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// Enable CORS for all routes
const app = express();
app.use(cors());

let db;

// Connect to the database
connectToDb((err) => {
  if (err) {
    console.error("Failed to connect to the database:", err);
    process.exit(1); // Exit the process if the database connection fails
  } else {
    console.log("Connected to the database");
    db = getDb();

    // Start the server after the database connection is established
    const port = process.env.PORT || 4010;
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  }
});

// Home route
app.get("/", (req, res) => {
  res.send("Hello from the home page");
});

// Books route
app.get("/books", (req, res) => {
  let books = [];

  // Check if the database connection is established
  if (!db) {
    return res
      .status(500)
      .json({ error: "Database connection not established" });
  }

  // Fetch all books from the "books" collection
  db.collection("books")
    .find()
    .toArray() // Convert the cursor to an array
    .then((books) => {
      res.status(200).json(books);
    })
    .catch((err) => {
      console.error("Error fetching books:", err);
      res.status(500).json({ error: "Could not fetch the documents" });
    });
});

app.get("/books/:id", (req, res) => {
  const id = req.params.id;

  // Validate the ID
  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid book ID" });
  }

  // Convert id to ObjectId
  const objectId = new ObjectId(id);

  // Fetch the book by ID
  db.collection("books")
    .findOne({ _id: objectId })
    .then((book) => {
      if (!book) {
        return res.status(404).json({ error: "Book not found" });
      }
      res.status(200).json(book);
    })
    .catch((err) => {
      console.error("Error fetching book:", err);
      res.status(500).json({ error: "Could not fetch the document" });
    });
});

app.use(bodyParser.json());

// Book Schema
const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  pages: Number,
  genres: [String],
  rating: Number,
  photoUrl: String,
});

const Book = mongoose.model("Book", bookSchema);

// Routes
// Add a book
app.post("/books", async (req, res) => {
  const { title, author, pages, genres, rating, photoUrl } = req.body;
  const newBook = new Book({ title, author, pages, genres, rating, photoUrl });
  await newBook.save();
  res.status(201).json(newBook);
});

// Get all books
app.get("/books", async (req, res) => {
  const books = await Book.find();
  res.json(books);
});

// Update a book
app.put("/books/:id", async (req, res) => {
  const { id } = req.params;
  const { title, author, pages, genres, rating, photoUrl } = req.body;
  const updatedBook = await Book.findByIdAndUpdate(
    id,
    { title, author, pages, genres, rating, photoUrl },
    { new: true }
  );
  res.json(updatedBook);
});

// Delete a book
app.delete("/books/:id", async (req, res) => {
  const { id } = req.params;
  await Book.findByIdAndDelete(id);
  res.status(204).send();
});

// Reporting by genre, author, or rating
app.get("/books/report", async (req, res) => {
  const { genre, author, rating } = req.query;
  const query = {};
  if (genre) query.genres = genre;
  if (author) query.author = author;
  if (rating) query.rating = { $gte: Number(rating) };
  const books = await Book.find(query);
  res.json(books);
});
