import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/button";
import "./loginPage.css"; // Make sure the CSS file is properly linked

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",  // Change from "email" to "username" as per Flask API
    password: "",
  });

  const navigate = useNavigate(); // Redirect after login

  // Update state as user types into inputs
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://ugabackend.onrender.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // Send { "username": "...", "password": "..." }
      });

      const data = await response.json();

      if (response.ok) {
        alert("Logged in successfully!");
        console.log("Login Success:", data);

        // Store JWT token in localStorage
        localStorage.setItem("token", data.token);

        // Redirect to a dashboard or home page
        navigate("/dashboard");
      } else {
        alert(`Login failed: ${data.error}`);
      }
    } catch (error) {
      console.error("Error logging in:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <main className="login-container">
      <h1 className="login-heading">Login</h1>

      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            className="login-input"
            placeholder="Enter your username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            className="login-input"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <Button type="submit" className="primary login-button">
          Sign In
        </Button>
      </form>

      <p className="login-footer-text">
        Don’t have an account? <Link to="/signup">Sign Up</Link>
      </p>
    </main>
  );
};

export default Login;
