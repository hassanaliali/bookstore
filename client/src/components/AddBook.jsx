import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [pages, setPages] = useState("");
  const [genres, setGenres] = useState("");
  const [rating, setRating] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const genresArray = genres.split(",").map((genre) => genre.trim());
    await axios.post("http://localhost:5000/api/books", {
      title,
      author,
      pages,
      genres: genresArray,
      rating,
      photoUrl,
    });
    navigate("/");
  };

  return (
    <div>
      <h1>Add Book</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Pages"
          value={pages}
          onChange={(e) => setPages(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Genres (comma-separated)"
          value={genres}
          onChange={(e) => setGenres(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Photo URL"
          value={photoUrl}
          onChange={(e) => setPhotoUrl(e.target.value)}
          required
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default AddBook;
