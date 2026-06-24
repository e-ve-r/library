import React, { useEffect, useState } from "react";
import "./styles/StudentPage.css";
import { useNavigate } from "react-router-dom";
import { BookOpen, LogOut, User, Lock, CheckCircle2 } from "lucide-react";

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
  }, [username]);

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
        <LogOut size={16} />
        Logout
      </button>
      <div className="welcome-banner">
        <User
          size={18}
          style={{
            verticalAlign: "middle",
            marginRight: "0.4rem",
            color: "var(--lavender-deep)",
          }}
        />
        Welcome back, <strong>{username}</strong>!
      </div>
      <div className="book-grid">
        {book_result.map((book) => (
          <article key={book.id} className="book-card">
            <div>
              <h2 className="book-title">{book.title}</h2>
              <div className="book-detail">
                <strong>Quantity</strong>
                <span>{book.quantity}</span>
              </div>
            </div>
            <div className="book-card-actions">
              {overdues_result ? (
                <button
                  className="borrow-btn"
                  onClick={() => {
                    alert("You can borrow!");
                  }}
                >
                  <BookOpen size={16} />
                  Borrow Book
                </button>
              ) : (
                <button
                  className="borrow-btn blocked"
                  onClick={() => {
                    alert("Clear you overdues!");
                  }}
                >
                  <Lock size={16} />
                  Clear Overdues
                </button>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default StudentPage;
