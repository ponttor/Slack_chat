import React from 'react';
import i18next from 'i18next';

export default function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <div className="navbar-brand">{i18next.t('title')}</div>
        <button onClick={() => console.log('hey')} className="btn btn-primary" type="button">{i18next.t('logOutButton')}</button>
      </div>
    </nav>
  );
}
