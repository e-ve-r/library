import React from "react";
import { useNavigate } from "react-router-dom";
import "./styles/addBook.css";

function AddBook() {
  const navigate = useNavigate();
  async function submitBook(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const id = parseInt(formData.get("id"));
    const title = formData.get("title");
    const author = formData.get("author");
    const year = parseInt(formData.get("year"));
    const genre = formData.get("genre");

    const newbook = { id, title, author, year, genre };

    const req = await fetch("http://localhost:8000/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newbook),
    });

    if (req.ok) {
      const res = await req.json();
      localStorage.setItem("result", JSON.stringify(res));
      navigate("/catalogue");
    } else {
      const err = await req.json();
      alert(err.detail || "Failed to add book");
    }
  }

  return (
    <div id="add-book-container">
      <h1>Add New Book</h1>
      <form onSubmit={submitBook}>
        <div className="form-group">
          <label htmlFor="id">Book ID</label>
          <input type="text" name="id" id="id" required placeholder="e.g. 6" />
        </div>

        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            required
            placeholder="e.g. Hamlet"
          />
        </div>

        <div className="form-group">
          <label htmlFor="author">Author</label>
          <input
            type="text"
            name="author"
            id="author"
            required
            placeholder="e.g. William Shakespeare"
          />
        </div>

        <div className="form-group">
          <label htmlFor="year">Published Year</label>
          <input
            type="text"
            name="year"
            id="year"
            required
            placeholder="e.g. 1603"
          />
        </div>

        <div className="form-group">
          <label htmlFor="genre">Genre</label>
          <input
            type="text"
            name="genre"
            id="genre"
            required
            placeholder="e.g. Tragedy"
          />
        </div>

        <div className="button-group">
          <button
            type="button"
            className="cancel-btn"
            onClick={() => navigate("/catalogue")}
          >
            Cancel
          </button>
          <button type="submit" className="submit-btn">
            Add Book
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddBook;
