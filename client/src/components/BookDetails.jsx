import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchBookById } from "../api";
import {
  Paper,
  Typography,
  CircularProgress,
  Alert,
  Button,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getBook = async () => {
      try {
        const data = await fetchBookById(id);
        setBook(data);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching book:", err); // Improved error logging
      } finally {
        setLoading(false);
      }
    };

    getBook();
  }, [id]); // Add `id` to the dependency array

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;
  if (!book) return <Alert severity="warning">Book not found</Alert>;

  return (
    <Paper style={{ padding: "20px", margin: "20px" }}>
      <Typography variant="h4" gutterBottom>
        {book.title}
      </Typography>
      Add book cover photo
      <Box
        component="img"
        src={book.photoUrl}
        alt={book.title}
        sx={{
          maxWidth: "100%",
          height: "auto",
          borderRadius: "8px",
          marginBottom: "20px",
        }}
        onError={(e) => {
          e.target.src = "https://via.placeholder.com/200"; // Fallback image
        }}
      />
      <Typography variant="h6" gutterBottom>
        Author: {book.author}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Pages: {book.pages}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Genres: {book.genres.join(", ")}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Rating: {book.rating}
      </Typography>
      <Button variant="contained" color="primary" component={Link} to="/books">
        Back to Book List
      </Button>
    </Paper>
  );
};

export default BookDetails;
