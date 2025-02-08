// App.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './routes/routes.jsx';
import './index.css';
import { AuthContext } from './authcontext.jsx';


function App() {
  const [token, setToken] = useState();
  const [userId, setUserId] = useState();
  const [name, setName] = useState();
  const [loading, setLoading] = useState(true);

  const login = useCallback((name, userId, token, expirationDate) => {
    setToken(token);
    setUserId(userId);
    setName(name);

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
    setName(null);
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
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{
      token,
      userId,
      name,
      login,
      logout
    }}>
      <RouterProvider router={router} />
    </AuthContext.Provider>

  );
}

export default App;
