// App.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './routes/routes.jsx';
import './index.css';
import { AuthContext } from './authcontext.jsx';
import Loading from './components/Loading.jsx';


function App() {
  const [token, setToken] = useState();
  const [userId, setUserId] = useState();
  const [username, setUsername] = useState();
  const [loading, setLoading] = useState(true);

  const login = useCallback((name, userId, token, expirationDate) => {
    console.log("loggin in");
    console.log(token);
    console.log(userId);
    setToken(token);
    setUserId(userId);
    setUsername(name);

    const tokenExpiration =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);

    localStorage.setItem(
      "puzzleVaultData",
      JSON.stringify({
        name,
        userId,
        token,
        expiration: tokenExpiration.toISOString()
      })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    setUsername(null);
    localStorage.removeItem('puzzleVaultData');
  }, []);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('puzzleVaultData'));
    if (userData && userData.token && new Date(userData.expiration) > new Date()) {
      login(userData.name, userData.userId, userData.token, new Date(userData.expiration));
    }
    setLoading(false);
  }, [login]);

  if (loading) {
    return <Loading />;
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn: !!token,
      token,
      userId,
      username,
      login,
      logout
    }}>
      <RouterProvider router={router} />
    </AuthContext.Provider>

  );
}

export default App;
