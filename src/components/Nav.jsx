import React, { useContext } from 'react';
import i18next from 'i18next';
import AuthContext from '../AuthContext';

export default function Nav() {
  const { isAuthenticated, logout } = useContext(AuthContext);

  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <div className="navbar-brand">{i18next.t('navTitle')}</div>
        {isAuthenticated && <button onClick={logout} className="btn btn-primary" type="button">{i18next.t('navLogoutButton')}</button>}
      </div>
    </nav>
  );
}
