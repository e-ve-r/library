import React, { useEffect, useState } from "react";
import "./styles/catalogue.css";
import { useNavigate } from "react-router-dom";

function AdminPage() {
  const navigate = useNavigate();
  const books = JSON.parse(localStorage.getItem("result") || "[]");
  const [book_result, setBooks] = useState(books);

  // dynamically shows form when clicked on edit button
  const [showForm, setShowForm] = useState(false);

  async function deleteBook(id) {
    const req = await fetch(`http://localhost:8000/delete/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    const res = await req.json();
    setBooks(res);
  }

  async function editBook(event, id) {
    // book edit data
    // note: event get passed as the first argument by default
    event.preventDefault();
    const formData = new FormData(event.target);
    const book_title = formData.get("title");
    const book_quantity = formData.get("quantity");
    const book_id = id;
    const data = {
      id: book_id,
      title: book_title,
      quantity: parseInt(book_quantity, 10),
    };
    const req = await fetch(`http://localhost:8000/edit/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const res = await req.json();
    setBooks(res);
    setShowForm(false);
  }

  return (
    <div className="catalogue-page">
      <h1 className="catalogue-header">Admin Page</h1>
      <div className="book-grid">
        {book_result.map((each_book) => (
          <article key={each_book.id} className="book-card">
            <h2 className="book-title">{each_book.title}</h2>
            <p className="book-detail">
              <strong>Quantity:</strong> {each_book.quantity}
            </p>
            <div className="book-card-actions">
              <button
                className="delete-btn"
                onClick={() => {
                  const userConfirmed = confirm(
                    "Are you sure you want to delete this book?",
                  );
                  if (userConfirmed) {
                    deleteBook(each_book.id);
                  }
                }}
              >
                Delete Entry
              </button>
              <button
                className="edit-btn"
                onClick={() => {
                  setShowForm(!showForm);
                }}
              >
                Edit Entry
              </button>
            </div>

            {showForm && (
              <form
                className="edit-form-dropdown"
                onSubmit={(event) => {
                  editBook(event, each_book.id);
                }}
                id="newBook"
              >
                <div className="form-field">
                  <label>Book Title</label>
                  <input
                    type="text"
                    placeholder="Book title"
                    name="title"
                    defaultValue={each_book.title}
                    required
                  />
                </div>

                <div className="form-field">
                  <label>Quantity</label>
                  <input
                    type="number"
                    placeholder="quantity"
                    name="quantity"
                    defaultValue={each_book.quantity}
                    required
                  />
                </div>

                <div className="edit-form-actions">
                  <button type="submit" className="save-btn">
                    Save
                  </button>
                  <button
                    type="button"
                    className="cancel-btn"
                    onClick={() => setShowForm(!showForm)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </article>
        ))}
      </div>
      <button onClick={() => navigate("/add")}>Add Book</button>
    </div>
  );
}

export default AdminPage;
