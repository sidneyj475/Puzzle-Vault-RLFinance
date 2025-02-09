import React, { useState } from 'react';
import Button from '../../components/button';
import './SignUpPage.css';
import { useForm } from 'react-hook-form'
import Logo from '../../components/Logo.jsx';
import { useNavigate, Link } from "react-router-dom";
import Loading from '../../components/Loading.jsx';


export default function SignUpPage (){

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const {register, handleSubmit, formState:{ errors }} = useForm({defaultValues: {name: '', email: '', password: ''}});

  const Submit = async (formData, e) => {
    setIsLoading(true);
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
        setIsLoading(false);
        navigate("/login"); // Redirect to login page
      } else {
        alert(`Signup failed: ${data.detail}`);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error signing up:", error);
      alert("An error occurred. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <main className="signup-page">
      {isLoading && <Loading/>}
      <div className="logo-container">
      <Logo />
      </div>
      <form onSubmit={handleSubmit(Submit)}>
        <p className="signup-page__error-message">{errors.name?.message}</p>
          <input placeholder="Name" {...register("name", {required: "name is required", maxLength: {value: 20, message: "Name must be under 20 characters"}})}/>
          <p className="signup-page__error-message">{errors.username?.message}</p>
          <input placeholder="Username" {...register("username", {required: "username is required", maxLength: {value: 20, message: "Username must be under 20 characters"}})}/>
          <p className="signup-page__error-message">{errors.password?.message}</p>
          <input placeholder="Password" {...register("password", {required: "passname is required", maxLength: {value: 20, message: "Password must be under 20 characters"}})}/>
        <Button type="submit" className="primary" margin={"30px 0 0 0"}>
          Sign Up
        </Button>
        <p className="signup-page__footer">Have an account already? <span><Link to="/login">Sign In</Link></span></p>
      </form>
    </main>
  );
};
