// src/api.js
const API_BASE_URL = "http://localhost:4010";

export const fetchBooks = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/books`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  } catch (err) {
    console.error("Error fetching books:", err);
    throw err;
  }
};
export const fetchBookById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/books/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  } catch (err) {
    console.error("Error fetching books:", err);
    throw err;
  }
};
