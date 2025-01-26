const mongoose = require("mongoose");

const bookSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true, // Title is required
      trim: true, // Remove extra spaces
    },
    author: {
      type: String,
      required: true, // Author is required
      trim: true,
    },
    pages: {
      type: Number,
      required: true, // Pages is required
      min: 1, // Minimum 1 page
    },
    genres: {
      type: [String], // Array of strings
      required: true, // Genres is required
      validate: {
        validator: function (genres) {
          return genres.length > 0; // At least one genre must be provided
        },
        message: "At least one genre is required.",
      },
    },
    rating: {
      type: Number,
      required: true, // Rating is required
      min: 0, // Minimum rating is 0
      max: 5, // Maximum rating is 5
    },
    photoUrl: {
      type: String,
      trim: true,
      validate: {
        validator: function (url) {
          // Simple URL validation (you can use a library like `validator` for more robust validation)
          return /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(
            url
          );
        },
        message: "Invalid photo URL.",
      },
    },
  },
  {
    timestamps: true, // Automatically add `createdAt` and `updatedAt` fields
  }
);

// Create the Book model
const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
