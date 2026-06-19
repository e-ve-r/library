import React, { useEffect, useState } from "react";
import "./styles/catalogue.css";
import { useNavigate } from "react-router-dom";

function Catalogue() {
  const [book_result, setBookResult] = useState(
    JSON.parse(localStorage.getItem("result") || "[]"),
  );

  const navigate = useNavigate();
  // const role = localStorage.getItem("role") || "";

  async function handleDelete(id) {
    const req = await fetch(`http://localhost:8000/delete?id=${id}`, {
      method: "DELETE",
    });
    const res = await req.json();
    setResult(res);
    localStorage.setItem("result", JSON.stringify(res));
  }

  async function handleEdit(edit) {
    const req = await fetch(`http://localhost:8000/edit`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(edit),
    });
    const res = await req.json();
    setResult(res);
    localStorage.setItem("result", JSON.stringify(res));
  }

  return (
    <div className="catalogue-page">
      <h1 className="catalogue-header">Library Catalogue</h1>
      <div className="book-grid">
        {book_result.map((book) => (
          <article key={book.id} className="book-card">
            {/* <h1>{book.id}</h1> */}
            <h2 className="book-title">{book.title}</h2>
            {/* conditional rendering */}
            {/* {role === "admin" && (
              <button
                onClick={() => {
                  handleDelete(book.id);
                }}
              >
                Delete Book
              </button>
            )} */}
          </article>
        ))}
      </div>
      {/* {role === "admin" && (
        <button
          onClick={() => {
            navigate("/add");
          }}
        >
          Add Book
        </button>
      )} */}
    </div>
  );
}

export default Catalogue;
