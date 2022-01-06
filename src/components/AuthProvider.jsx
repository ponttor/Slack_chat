import React, { useState } from 'react';
import _ from 'lodash';
import AuthContext from '../AuthContext';

const AuthProvider = ({ children }) => {
  const firstToken = localStorage.getItem('token');
  const [isAuthenticated, setIsAuthenticated] = useState(!!firstToken);
  const [token, setToken] = useState(firstToken);
  // if (token) {
  //   setIsAuthenticated(true);
  // }

  const getNextId = () => Number(_.uniqueId());

  function login(name) {
    setIsAuthenticated(true);
    setToken(localStorage.getItem('token'));
    localStorage.setItem('user', { name, id: getNextId(), token });
  }

  function logout() {
    setIsAuthenticated(false);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }

  function signup(name) {
    setIsAuthenticated(true);
    localStorage.setItem('user', { name, id: getNextId(), token });
  }
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
