import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/button";

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    username: "",  // Using "username" instead of "name"
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://ugabackend.onrender.com/register", {  // FastAPI endpoint
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),  // Send { "username": "...", "password": "..." }
      });

      const data = await response.json();

      if (response.ok) {
        alert("Signup successful! You can now log in.");
        console.log("Signup Success:", data);

        setFormData({
          username: "",
          password: "",
        });

        navigate("/login"); // Redirect to login page
      } else {
        alert(`Signup failed: ${data.detail}`);  // Show error message from FastAPI
      }
    } catch (error) {
      console.error("Error signing up:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="signup-container">
      <h1>Create an Account</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Choose a username"
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Choose a password"
            required
          />
        </div>

        <Button type="submit" className="primary">
          Sign Up
        </Button>
      </form>
    </div>
  );
};

export default SignUpPage;
