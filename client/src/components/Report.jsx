import React, { useState } from "react";
import axios from "axios";

const Report = () => {
  const [genre, setGenre] = useState("");
  const [author, setAuthor] = useState("");
  const [rating, setRating] = useState("");
  const [books, setBooks] = useState([]);

  const fetchReport = async () => {
    const response = await axios.get("http://localhost:5000/api/books/report", {
      params: { genre, author, rating },
    });
    setBooks(response.data);
  };

  return (
    <div>
      <h1>Book Report</h1>
      <input
        type="text"
        placeholder="Genre"
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
      />
      <input
        type="text"
        placeholder="Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />
      <input
        type="number"
        placeholder="Rating"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
      />
      <button onClick={fetchReport}>Generate Report</button>
      <ul>
        {books.map((book) => (
          <li key={book._id}>
            <img src={book.photoUrl} alt={book.title} width="100" />
            <h2>{book.title}</h2>
            <p>Author: {book.author}</p>
            <p>Pages: {book.pages}</p>
            <p>Genres: {book.genres.join(", ")}</p>
            <p>Rating: {book.rating}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Report;
