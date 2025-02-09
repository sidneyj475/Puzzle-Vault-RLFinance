
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/button';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Logo from '../../components/Logo.jsx';
import './loginPage.css'; // <-- Import the CSS file
import Loading from '../../components/Loading.jsx';

const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [hadAttempt, setHadAttempt] = useState(false);

  const {register, handleSubmit, formState:{ errors }} = useForm({defaultValues: {username: '', password: ''}});

  const Submit = async (formData, e) => {
    setIsLoading(true);
    e.preventDefault();
    try {
      const response = await fetch("https://ugabackend.onrender.com/login", {  // FastAPI endpoint
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // Send { "username": "...", "password": "..." }
      });

      const data = await response.json();

      if (response.ok) {
        setIsLoading(false); 
        // Store JWT token in localStorage
        localStorage.setItem("token", data.token);

        // Redirect to a dashboard or home page
        navigate("/landingpage");
      } else {
        setIsLoading(false);
        setHadAttempt(true);
      }
    } catch (error) {
      setIsLoading(false);
      setHadAttempt(true); 
    }
  };

  return (

    <main className="login-page">
      {isLoading && <Loading/>}
      <div className="logo-container">
      <Logo />
      </div>
      {hadAttempt && <p>Incorrect Password or Username</p>}
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
