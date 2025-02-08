
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/button';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Logo from '../../components/Logo.jsx';
import './loginPage.css'; // <-- Import the CSS file

const Login = () => {
  const navigate = useNavigate();

  const {register, handleSubmit, formState:{ errors }} = useForm({defaultValues: {email: '', password: ''}});

  const Submit = async (formData, e) => {
    console.log(formData);
    e.preventDefault();
    try {
      const response = await fetch("https://ugabackend.onrender.com/register", {  // FastAPI endpoint
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

    <main className="login-page">
      <div className="logo-container">
      <Logo />
      </div>
      <form onSubmit={handleSubmit(Submit)}>
          <p className="login-page__error-message">{errors.username?.message}</p>
          <input placeholder="Username" {...register("username", {required: "Username is required", maxLength: {value: 20, message: "Username must be under 20 characters"}})}/>
          <p className="login-page__error-message">{errors.password?.message}</p>
          <input placeholder="Password" {...register("password", {required: "Password is required", maxLength: {value: 20, message: "Password must be under 20 characters"}})}/>
        <Button type="submit" className="primary" margin={"30px 0 0 0"}>
          Sign In
        </Button>
        <p className="login-page__footer">Don&apos;t have an account? <span><Link to="/sign-up">Sign Up</Link></span></p>
      </form>
    </main>
  );
};

export default Login;
