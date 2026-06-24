import React from "react";
import { useNavigate } from "react-router-dom";
import "./styles/addBook.css";
import { Plus, X } from "lucide-react";

function AddBook() {
  const navigate = useNavigate();
  async function submitBook(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const id = parseInt(formData.get("id"));
    const title = formData.get("title");
    const quantity = parseInt(formData.get("quantity"));

    const newbook = { id, title, quantity };

    const req = await fetch("http://localhost:8000/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newbook),
    });

    if (req.ok) {
      const res = await req.json();
      localStorage.setItem("result", JSON.stringify(res));
      navigate("/admin");
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
          <label htmlFor="quantity">Quantity</label>
          <input
            type="number"
            name="quantity"
            id="quantity"
            required
            placeholder="e.g. 2"
          />
        </div>

        <div className="button-group">
          <button
            type="button"
            className="cancel-btn"
            onClick={() => {
              navigate("/admin");
            }}
            style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}
          >
            <X size={16} />
            Cancel
          </button>
          <button
            type="submit"
            className="submit-btn"
            style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}
          >
            <Plus size={16} />
            Add Book
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddBook;
