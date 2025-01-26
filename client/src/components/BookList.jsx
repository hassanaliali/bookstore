import React, { useEffect, useState } from "react";
import { fetchBooks } from "../api";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  CircularProgress,
  Alert,
  CardMedia,
} from "@mui/material";

import { Link } from "react-router-dom";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getBooks = async () => {
      try {
        const data = await fetchBooks();

        setBooks(data);
      } catch (err) {
        setError(err.message);
        console.log("there is an error");
      } finally {
        setLoading(false);
      }
    };

    getBooks();
  }, []);

  console.log(books);
  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;
  if (books.length === 0) return <Typography>No books found.</Typography>;

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Book List
      </Typography>
      <Grid container spacing={3}>
        {books.map((book) => (
          <Grid item key={book._id} xs={12} sm={6} md={4}>
            <Card>
              {/* Add book cover photo */}
              <CardMedia
                component="img"
                height="200"
                image={book.photoUrl}
                alt={book.title}
                style={{ objectFit: "cover" }}
              />
              <CardContent>
                <Typography
                  variant="h6"
                  component={Link}
                  to={`/books/${book._id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  {book.title}
                </Typography>
                <Typography color="textSecondary">by {book.author}</Typography>
                <Typography variant="body2">Pages: {book.pages}</Typography>
                <Typography variant="body2">Rating: {book.rating}</Typography>
                <Link to={`/edit/${book._id}`}>Edit</Link>
                {/* <button onClick={() => deleteBook(book._id)}>Delete</button> */}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default BookList;
