import React from 'react';
import LoginForm from '../components/LoginForm.jsx';
import authStatus from '../context';

const Login = () => (
  <authStatus.Provider value={false}>
    <div className="container mt-3">
      <div className="row">
        <div className="col-md-5">
          <LoginForm />
        </div>
      </div>
    </div>
  </authStatus.Provider>
);
export default Login;
