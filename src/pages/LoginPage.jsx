import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/login.css";

// event won't be in the component, only props, events in event handelers
function LoginPage() {
  // always on top

  const navigate = useNavigate();

  async function loginData(event) {
    event.preventDefault();

    const formData = new FormData(event.target);

    const username = formData.get("username");
    const password = formData.get("password");

    const data = {
      username: username,
      password: password,
    };

    const res = await fetch("http://localhost:8000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      const result = await res.json();
      localStorage.setItem("result", JSON.stringify(result.books));
      localStorage.setItem("role", JSON.stringify(result.role));
      localStorage.setItem("username", JSON.stringify(result.username));

      if (result.role === "admin") {
        navigate("/admin");
      } else {
        localStorage.setItem("overdues", JSON.stringify(result.overdues));
        navigate("/StudentPage");
      }
    } else {
      const err = await res.json();
      alert(err.detail || "Login failed");
    }
  }

  return (
    <div id="login">
      <h1>Welcome to Library Portal</h1>
      <form onSubmit={loginData}>
        <label htmlFor="username">Username</label>
        <input type="text" name="username" />

        <label htmlFor="password">Password</label>
        <input type="text" name="password" />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
