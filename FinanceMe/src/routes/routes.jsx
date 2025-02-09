// Routes.jsx
import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import LoginPage from '../pages/LoginPage/LoginPage';
import SignUpPage from '../pages/SignUpPage/SignUpPage';
import LandingPage from '../pages/LandingPage/LandingPage';
import RoomSelectPage from '../pages/RoomSelectPage/RoomSelectPage';
import Room from '../pages/Room/Room';
import ProtectedRoute from './ProtectedRoute';
import RoomOne from '../pages/Room/RoomOne.jsx';
import RoomThree from '../pages/Room/RoomThree.jsx';

const router = createBrowserRouter([
  {
    path: '/' , 
    element: <LoginPage />,
  },
  {
    path: '/sign-up',
    element: <SignUpPage />,
  },
  {
    path: '/',
    element: <ProtectedRoute />,
       children:  [
        { path: '/landingPage', element: <LandingPage /> },
        { path: '/roomSelect', element: <RoomSelectPage />},
        { path: '/room/:roomGenre/:roomNumber', element: <Room />},
        { path: '/path-to-room3', element: <RoomOne />},
        { path: '/path-to-room1', element: <RoomThree />},
        { path: '*', element: <Navigate to="/login" /> },
      ]
  },
]);

export default router

