
import { useContext } from 'react';
import { Navigate, Outlet} from 'react-router-dom';
import { AuthContext } from '../AuthContext';

export default function ProtectedRoute() {

  const {isLoggedIn, userId} = useContext(AuthContext);
  console.log(userId);
  console.log(isLoggedIn);

  return isLoggedIn ? <Outlet/> : <Navigate to="/" replace/>
}