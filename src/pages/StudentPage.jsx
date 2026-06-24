import React, { use, useEffect, useState } from "react";
import "./styles/StudentPage.css";
import { useNavigate } from "react-router-dom";

function StudentPage() {
  // better approach not to keep books stored at local storage
  const [book_result, setBookResult] = useState([]);
  const [overdues_result, setOverduesResult] = useState(false);
  const navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem("token") || "");
  const username = JSON.parse(localStorage.getItem("username") || "");

  useEffect(() => {
    fetch("http://localhost:8000/getbooks")
      .then((res) => res.json())
      .then((data) => {
        setBookResult(data);
      });
  }, []);

  useEffect(() => {
    fetch(`http://localhost:8000/overdues/${username}`)
      .then((res) => res.json())
      .then((data) => {
        setOverduesResult(data);
      });
  }, []);

  return (
    <div className="StudentPage-page">
      <h1 className="StudentPage-header">Library Student Page</h1>
      <button
        className="logout-btn"
        onClick={() => {
          localStorage.clear();
          navigate("/");
        }}
      >
        Logout
      </button>
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
                  if (overdues_result) {
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
