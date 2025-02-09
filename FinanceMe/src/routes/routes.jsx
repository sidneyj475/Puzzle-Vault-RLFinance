// Routes.jsx
import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
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
    path: '/',
    element: <LoginPage />,
  },
  {
    path: '/sign-up',
    element: <SignUpPage />,
  },
  { path: '/landingPage', element: <LandingPage /> },
  { path: '/roomSelect', element: <RoomSelectPage />},
  { path: '/room/:roomGenre/:roomNumber', element: <Room />},
  { path: '/path-to-room3', element: <RoomThree />},
  { path: '/path-to-room1', element: <RoomOne />},
  {
    path: '/',
    element: <ProtectedRoute />,
       children:  [
        { path: '/landingPage', element: <LandingPage /> },
        { path: '/roomSelect', element: <RoomSelectPage />},
        { path: '/room/1', element: <Room />},
        { path: '/room/2', element: <Room />},
        { path: '/room/3', element: <Room />},
      ]
  },
]);

export default router

