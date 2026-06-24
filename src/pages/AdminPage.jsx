import React, { useEffect, useState } from "react";
import "./styles/StudentPage.css";
import { useNavigate } from "react-router-dom";
import { Trash2, Pencil, Plus, LogOut, Check, X } from "lucide-react";

function AdminPage() {
  const navigate = useNavigate();
  const [book_result, setBooks] = useState([]);
  const [editingBookId, setEditingBookId] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/getbooks")
      .then((res) => res.json())
      .then((data) => {
        setBooks(data);
      });
  }, []);

  async function deleteBook(id) {
    const token = JSON.parse(localStorage.getItem("token") || '""');
    const req = await fetch(`http://localhost:8000/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const res = await req.json();
    setBooks(res);
  }

  async function editBook(event, id) {
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
    setEditingBookId(null);
  }

  return (
    <div className="StudentPage-page">
      <h1 className="StudentPage-header">Admin Page</h1>
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

      <div className="book-grid">
        {book_result.map((each_book) => (
          <article key={each_book.id} className="book-card">
            <div>
              <h2 className="book-title">{each_book.title}</h2>
              <div className="book-detail">
                <strong>Quantity</strong>
                <span>{each_book.quantity}</span>
              </div>
            </div>

            <div className="book-card-actions" style={{ marginBottom: editingBookId === each_book.id ? "1rem" : "0" }}>
              <button
                className="delete-btn"
                title="Delete Book"
                onClick={() => {
                  const userConfirmed = confirm(
                    "Are you sure you want to delete this book?",
                  );
                  if (userConfirmed) {
                    deleteBook(each_book.id);
                  }
                }}
              >
                <Trash2 size={16} />
                Delete
              </button>
              <button
                className="edit-btn"
                title="Edit Book"
                onClick={() => {
                  setEditingBookId(
                    editingBookId === each_book.id ? null : each_book.id,
                  );
                }}
              >
                <Pencil size={16} />
                Edit
              </button>
            </div>

            {editingBookId === each_book.id && (
              <form
                className="edit-form-dropdown"
                onSubmit={(event) => {
                  editBook(event, each_book.id);
                }}
                id={`editForm-${each_book.id}`}
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
                    placeholder="Quantity"
                    name="quantity"
                    defaultValue={each_book.quantity}
                    required
                  />
                </div>

                <div className="edit-form-actions">
                  <button type="submit" className="save-btn">
                    <Check size={14} />
                    Save
                  </button>
                  <button
                    type="button"
                    className="cancel-btn"
                    onClick={() => setEditingBookId(null)}
                  >
                    <X size={14} />
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </article>
        ))}
      </div>

      <button className="add-book-btn" onClick={() => navigate("/add")}>
        <Plus size={18} />
        Add Book
      </button>
    </div>
  );
}

export default AdminPage;
