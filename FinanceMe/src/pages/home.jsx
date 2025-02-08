// Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Button from './components/Button';

const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to Our App!</h1>
      <p>Please sign up to get started.</p>
      <Link to="/signup">
        <Button className="primary">Go to Signup</Button>
      </Link>
    </div>
  );
};

export default Home;
