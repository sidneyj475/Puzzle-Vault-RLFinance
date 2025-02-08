// Signup.jsx
import React, { useState } from 'react';
import Button from '../../components/button';

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  // Update form state as the user types
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Replace this with your signup logic (e.g., API call)
    console.log('Signup Data:', formData);
    alert('Signup successful!');
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      password: '',
    });
  };

  return (
    <div className="signup-container">
      <h1>Create an Account</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your full name"
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your email address"
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
