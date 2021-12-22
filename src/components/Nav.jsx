import React, { useContext } from 'react';
import i18next from 'i18next';
// import AuthContext from '../AuthContext.js';

export default function Nav() {
  // const { setIsAuth } = useContext(AuthContext);

  function logout(e) {
    e.preventDefault();
    // setIsAuth(false);
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <div className="navbar-brand">{i18next.t('title')}</div>
        <button onClick={logout} className="btn btn-primary" type="button">{i18next.t('logOutButton')}</button>
      </div>
    </nav>
  );
}
