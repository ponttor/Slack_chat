import axios from 'axios';
import * as yup from 'yup';
import { useFormik } from 'formik';
import React from 'react';

const Signup = () => {
  const onSubmit = async (values) => {
    try {
      const response = await axios.post('/api/v1/signup', values);
      console.log(response.data);
    } catch (err) {
      if (err.response.statusText === 'Conflict') {
        console.log(err.response.statusText);
      }
    }
  };

  const validationSchema = yup.object({
    username: yup.string().min(3, 'Please enter your real name').max(20, 'Please enter your real name').required('Full name is required'),
    password: yup.string().min(6, 'Minimum 6 symbols').required('Password is required'),
    passwordConfirm: yup.string().oneOf([yup.ref('password'), ''], 'Passwords must match'),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      passwordConfirm: '',
    },
    validateOnBlur: true,
    onSubmit,
    validationSchema,
  });

  return (
    <div className="d-flex flex-column align-items-center">
      <div>Sign up</div>
      <form onSubmit={formik.handleSubmit}>
        <label className="d-block" htmlFor='username'>Имя</label>
        <input
          className="d-block"
          type="text"
          id="username"
          name="username"
          onChange={formik.handleChange}
          value={formik.values.name}
        />
        <div className="text-danger">{formik.errors.name}</div>

        <label className="d-block" htmlFor='password'>Пароль</label>
        <input
          className="d-block"
          type="password"
          id="password"
          name="password"
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        <div className="text-danger fs-6">{formik.errors.password}</div>
        {/* <div>{error}</div> */}

        <label className="d-block" htmlFor='passwordConfirm'>Подтверждение пароля</label>
        <input
          className="d-block"
          type="passwordConfirm"
          id="passwordConfirm"
          name="passwordConfirm"
          onChange={formik.handleChange}
          value={formik.values.passwordConfirm}
        />
        <div className="text-danger fs-6">{formik.errors.passwordConfirm}</div>

        <button type="submit" className="bg-primary d-block">Button</button>
      </form>
    </div>
  );
};

export default Signup;
