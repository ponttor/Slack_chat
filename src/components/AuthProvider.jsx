import React, { useState } from 'react';
import _ from 'lodash';
import AuthContext from '../AuthContext';

// login
// незалогинен - нул, иначе {}
// логин положить в локал сторэдж узера, ник, id, token и сделать setUser
// логаут user - null, локал стор удалить.

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const token = localStorage.getItem('token');
  // if (token) {
  //   setIsAuthenticated(true);
  // }

  const getNextId = () => Number(_.uniqueId());

  function login(name) {
    setIsAuthenticated(true);
    localStorage.setItem('user', { name, id: getNextId(), token });
    console.log('login');
  }

  function logout() {
    setIsAuthenticated(false);
    localStorage.setItem('user', {});
    localStorage.setItem('token', null);
    console.log('logout');
  }
  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
