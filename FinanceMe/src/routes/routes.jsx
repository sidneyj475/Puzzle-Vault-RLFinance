// Routes.jsx
import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import LoginPage from '../pages/LoginPage/LoginPage';
import SignUpPage from '../pages/SignUpPage/SignUpPage';
import LandingPage from '../pages/LandingPage/LandingPage';
import RoomSelectPage from '../pages/RoomSelectPage/RoomSelectPage';
import Room from '../pages/Room/Room';
import ProtectedRoute from './ProtectedRoute';
import ViewRoom from '../pages/Room/ViewRoom.jsx';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/sign-up',
    element: <SignUpPage />,
  },
  { path: '/landingPage', element: <LandingPage /> },
  { path: '/roomSelect', element: <RoomSelectPage />},
  { path: '/room/:roomGenre/:roomNumber', element: <Room />},
  { path: '/path-to-room2', element: <ViewRoom />},
  {
    path: '/',
    element: <ProtectedRoute />,
       children:  [
        { path: '/landingPage', element: <LandingPage /> },
        { path: '/roomSelect', element: <RoomSelectPage />},
        { path: '/room/:roomGenre/:roomNumber', element: <Room />}
      ]
  },
]);

export default router

