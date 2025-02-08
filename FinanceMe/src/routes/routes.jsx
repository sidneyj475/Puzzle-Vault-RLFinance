// Routes.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/loginPage/loginPage';
import Signup from '../pages/signup';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
};

export default AppRoutes;
