const express = require("express");
const { getDb, connectToDb } = require("./src/configs/db");
const { ObjectId } = require("mongodb");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const Book = require("./src/models/booksModel");
const authRouter = require("./src/routers/authRouter");

require("dotenv").config();
// Enable CORS for all routes
const app = express();
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
let db;

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log(`Serverrrrrrrrrrrrrr is listening ...`);
  })
  .catch((error) => {
    console.log("error");
  });
app.use("/api/auth", authRouter);
app.get("/", (req, res) => {
  res.send("Hello from the home page");
});

app.listen(process.env.PORT, () => {
  console.log(`listen to the port ${process.env.PORT}`);
});
