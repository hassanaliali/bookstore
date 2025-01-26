import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BookList from "./components/BookList";
import BookDetails from "./components/BookDetails";
import Navbar from "./components/Navbar";
import { Container } from "@mui/material";
import { Typography } from "@mui/material";
import AddBook from "./components/AddBook";
import EditBook from "./components/EditBook";
import Report from "./components/Report";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Container>
        <Routes>
          <Route
            path="/"
            element={
              <Typography variant="h4">Welcome to the Bookstore App</Typography>
            }
          />
          <Route path="/books" element={<BookList />} />
          <Route path="/books/:id" element={<BookDetails />} />
          <Route path="/add" element={<AddBook />} />
          <Route path="/edit/:id" element={<EditBook />} />
          <Route path="/report" element={<Report />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
