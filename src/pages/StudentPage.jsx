import React, { useEffect, useState } from "react";
import "./styles/StudentPage.css";
import { useNavigate } from "react-router-dom";

function StudentPage() {
  const [book_result, setBookResult] = useState(
    JSON.parse(localStorage.getItem("result") || "[]"),
  );

  const navigate = useNavigate();
  const role = JSON.parse(localStorage.getItem("role") || "");
  const username = JSON.parse(localStorage.getItem("username") || "");
  const overdues = JSON.parse(localStorage.getItem("overdues") || "");
  return (
    <div className="StudentPage-page">
      <h1 className="StudentPage-header">Library Student Page</h1>
      <div className="welcome-banner">
        Welcome back, <strong>{username}</strong>!
      </div>
      <div className="book-grid">
        {book_result.map((book) => (
          <article key={book.id} className="book-card">
            <h2 className="book-title">{book.title}</h2>
            <p className="book-detail">
              <strong>Quantity:</strong> {book.quantity}
            </p>
            <div className="book-card-actions">
              <button
                className="borrow-btn"
                onClick={() => {
                  if (!overdues) {
                    alert("You can borrow!");
                  } else {
                    alert("Clear you overdues!");
                  }
                }}
              >
                Borrow Book
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default StudentPage;
