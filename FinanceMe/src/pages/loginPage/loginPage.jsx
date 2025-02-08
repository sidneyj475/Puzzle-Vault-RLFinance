// Login.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/button';
import './loginPage'; // <-- Import the CSS file

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  // Update state as user types into the inputs
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle login form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Your login logic goes here (e.g., API call)
    console.log('Login credentials:', formData);
    alert('Logged in successfully!');
  };

  return (
    <main className="login-container">
      {}
      {}
      
      <h1 className="login-heading">Login</h1>
      
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="email">Email Address</label>
          <input 
            type="email"
            id="email"
            name="email"
            className="login-input"
            placeholder="Enter your email"
            value={formData.email}
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

        {/* Using the custom Button component with the "primary" class */}
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
