import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

// event won't be in the component, only props, events in event handelers
function LoginPage() {
  // always on top
  const [submitted_name, setName] = useState("");
  const [submitted_pass, setPass] = useState("");
  const [submitted_role, setRole] = useState("");

  const navigate = useNavigate();

  async function loginData(event) {
    event.preventDefault();

    const formData = new FormData(event.target);

    const username = formData.get("username");
    const password = formData.get("password");
    const role = formData.get("role");

    setName(username);
    setPass(password);
    setRole(role);

    const data = {
      username,
      password,
      role,
    };

    const res = await fetch("http://localhost:8000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    console.log(result);
    // store JSON string and role for the catalogue
    localStorage.setItem("result", JSON.stringify(result));
    localStorage.setItem("role", role || "");
    navigate("/catalogue");
  }

  return (
    <div id="login">
      <h1>Welcome to Library Portal</h1>
      <form onSubmit={loginData}>
        <label htmlFor="username">Username</label>
        <input type="text" name="username" />

        <label htmlFor="password">Password</label>
        <input type="text" name="password" />

        <label htmlFor="role">Role</label>
        <input type="text" name="role" />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
