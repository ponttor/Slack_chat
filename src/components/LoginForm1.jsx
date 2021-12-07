import axios from 'axios';
import * as yup from 'yup';
import { useFormik } from 'formik';
import React, { useState, useContext } from 'react';
import { Redirect, useHistory, useLocation } from 'react-router-dom';
import authStatus from '../context';

const validationSchema = yup.object({
  username: yup.string().min(3, 'Please enter your real name').required('Full name is required'),
  password: yup.string().required('Password is required'),
});

  // const [authFailed, setAuthFailed] = useState(false);
  // const MyContext = React.createContext({});
  // const history = useHistory();

      // MyContext.authentification = true;
      // console.log(MyContext.authentification);

      // const { from } = { from: { pathname: '/' } };
      // <Redirect to="/" />;

      // MyContext.authentification = false;
      // console.log(MyContext.authentification);
      // const message = 'some text';
      // const error = new Error(err);
      // setError('erroR');
      // console.log(error);


  // localStorage.removeItem('token');
  // localStorage.clear();
  // const token = localStorage.getItem('token');
  // console.log(token);

  // console.log(token)

  // if (!token) {
  //   history.push({ pathname: '/login' });
  // }
  // console.log(MyContext.authentification);

  // if (MyContext.authentification) {
  //   console.log('history');
  //   console.log(MyContext.authentification);
  //   history.push({ pathname: '/' });
  // }

  // const [error, setError] = useState(null);

  // console.log(formik.touched.name);

const LoginForm1 = () => {
  const [auth, setAuth] = useContext(authStatus);
  const [redirectOnLogin, setRedirectOnLogin] = useState(false);
  const history = useHistory();
  history.push({ pathname: '/login' });

  // localStorage.removeItem('token');

  const onSubmit = async (values) => {
    try {
      const response = await axios.post('/api/v1/login', values);
      // console.log(values);
      // console.log(response.data.token);
      localStorage.setItem('token', { token: JSON.stringify(response.data.token) });
      setAuth(true);
      setRedirectOnLogin(true);
    } catch (err) {
      console.log(err.response.statusText);
      setAuth(false);
    }
  };

  // const history = useHistory();
  // localStorage.removeItem('token');

  const token = localStorage.getItem('token');
  console.log(token);

  // if (!token) {
  //   console.log(token);
  //   history.push({ pathname: '/login' });
  // }

  // if (token) {
  //   console.log(token);
  //   setRedirectOnLogin(true);
  // history.push({ pathname: '/' });
  // }

  // console.log(window.location.href);
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validateOnBlur: true,
    onSubmit,
    validationSchema,
  });
  // console.log(formik);

  return (
    <div className="d-flex flex-column align-items-center">
      <div>Sign up</div>
      <form onSubmit={formik.handleSubmit}>
        <label className="d-block" htmlFor='username'>Name</label>
        <input
          className="d-block"
          type="text"
          id="username"
          name="username"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
        />
        <div className="text-danger">{formik.errors.name}</div>

        <label className="d-block" htmlFor='password'>Password</label>
        <input
          className="d-block"
          type="password"
          id="password"
          name="password"
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        <div className="text-danger fs-6">{formik.errors.password}</div>
        {(!auth) && <div className="text-danger">вы не авторизованы</div>}

        <button type="submit" className="bg-primary d-block">Button</button>
      </form>
    </div>
  );
};

export default LoginForm1;
