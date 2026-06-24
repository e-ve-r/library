import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/login.css";
import { LogIn } from "lucide-react";

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

    // first login

    const res = await fetch("http://localhost:8000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      const result = await res.json();
      localStorage.setItem("token", JSON.stringify(result.token));

      // get role based navigation
      const get_user = await fetch("http://localhost:8000/getuser", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${result.token}`,
        },
      });

      if (get_user.ok) {
        const user_details = await get_user.json();
        localStorage.setItem("username", JSON.stringify(user_details.username));
        if (user_details.role === "admin") {
          navigate("/admin");
        } else {
          localStorage.setItem(
            "overdues",
            JSON.stringify(user_details.overdues),
          );
          navigate("/StudentPage");
        }
      } else {
        const err = await get_user.json();
        alert(err.detail || "Failed to fetch user details");
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
        <input type="text" name="username" required />

        <label htmlFor="password">Password</label>
        <input type="password" name="password" required />

        <button type="submit" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}>
          <LogIn size={18} />
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
