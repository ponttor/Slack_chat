import axios from 'axios';
import * as yup from 'yup';
import { useFormik } from 'formik';
import React from 'react';

const validationSchema = yup.object({
  username: yup.string().min(3, 'Please enter your real name').required('Full name is required'),
  password: yup.string().required('Password is required'),
});

const LoginForm = () => {
  const onSubmit = async (values) => {
    try {
      const response = await axios.post('/api/v1/login', values);
      localStorage.setItem('token', response.data.token);
      const token = localStorage.getItem('token');
      console.log(token);
    } catch (err) {
      console.log(err.response.statusText);
    }
  };

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit,
    validationSchema,
  });

  return (
    <div className="d-flex flex-column align-items-center">
      <div>Log in</div>
      <form onSubmit={formik.handleSubmit}>
        <label className="d-block" htmlFor="username">Name</label>
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

        <label className="d-block" htmlFor="password">Password</label>
        <input
          className="d-block"
          type="password"
          id="password"
          name="password"
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        <div className="text-danger fs-6">{formik.errors.password}</div>

        <button type="submit" className="bg-primary d-block">Button</button>
      </form>
    </div>
  );
};

export default LoginForm;
