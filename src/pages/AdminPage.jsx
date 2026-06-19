import React, { useEffect, useState } from "react";
import "./styles/catalogue.css";

function AdminPage() {
  const books = JSON.parse(localStorage.getItem("result") || "[]");
  const [book_result, setBooks] = useState(books);

  async function deleteBook(id) {
    const req = await fetch(`http://localhost:8000/delete/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    const res = await req.json();
    setBooks(res);
  }

  function editBook() {}

  return (
    <div className="catalogue-page">
      <h1 className="catalogue-header">Admin Page</h1>
      <div className="book-grid">
        {book_result.map((each_book) => (
          <article key={each_book.id} className="book-card">
            <h2 className="book-title" contentEditable="true">
              {each_book.title}
            </h2>
            <p className="book-detail">
              <strong>Quantity:</strong> {each_book.quantity}
            </p>
            <div className="book-card-actions">
              <button
                className="delete-btn"
                onClick={() => {
                  // alert(`Are you sure you want to delete ${each_book.title}?`);
                  const userConfirmed = confirm("Do you want to save changes?");
                  if (userConfirmed) {
                    // User clicked 'OK' (returns true)
                    deleteBook(each_book.id);
                  }
                }}
              >
                Delete Entry
              </button>
              <button className="edit-btn" onClick={editBook}>
                Edit Entry
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default AdminPage;
