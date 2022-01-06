import axios from 'axios';
import * as yup from 'yup';
import i18next from 'i18next';
import { useHistory } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import React, { useState, useContext } from 'react';
import AuthContext from '../AuthContext';

const validationSchema = yup.object({
  username: yup
    .string()
    .required(i18next.t('ValidationReqName')),
  password: yup.string().required(i18next.t('PasswordRequired')),
});
// const validationSchema = yup.object({
//   username: yup
//     .string()
//     .min(3, i18next.t('ValidationMinName'))
//     .required(i18next.t('ValidationReqName')),
//   password: yup.string().required(i18next.t('PasswordRequired')),
// });

const Login = () => {
  const [authFailed, setAuthFailed] = useState(false);
  const [inputClassname, setInputClassname] = useState('form-control');
  const [netError, setNetError] = useState(false);
  const { isAuthenticated, login } = useContext(AuthContext);
  const history = useHistory();

  const handleError = (err) => {
    if (err.response) {
      // if (err.response.status === 401) {
      setAuthFailed(true);
      setInputClassname('form-control is-invalid');
      return;
    }
    if (!err.response) {
      setNetError(true);
      console.log('no network');
    }
  };

  const onSubmit = async (value) => {
    setAuthFailed(false);
    setNetError(false);
    try {
      const response = await axios.post('/api/v1/login', value);
      localStorage.setItem('token', response.data.token);
      login(value.name);
    } catch (err) {
      handleError(err);
    }
  };
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit,
    // validationSchema,
  });

  // console.log(formik);
  console.log(formik.values.username.length);

  return (
    <>
      {isAuthenticated && history.push('/')}
      <div className="container-fluid h-100">
        <div className="h-100 d-flex justify-content-center align-items-center">
          <div className="col-12 col-md-8 col-xxl-6">
            <div className="card shadow-sm">
              <div className="card-body row p-5">
                <div className="d-flex align-items-center justify-content-center col-12 col-md-6 p-4">
                  <img
                    src="https://res.cloudinary.com/ponttor/image/upload/v1640614045/hexlet_pielxk.jpg"
                    className="card-img-top flex-grow-1 rounded-circle p-5"
                    alt={i18next.t('loginTitle')}
                  />
                </div>
                <form
                  className="col-12 col-md-6 mt-3 mt-mb-0"
                  onSubmit={formik.handleSubmit}
                >
                  <h1 className="text-center mb-4">
                    {i18next.t('loginTitle')}
                  </h1>
                  <div className="form-floating mb-3 form-group">
                    <input
                      className={inputClassname}
                      type="text"
                      id="username"
                      name="username"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.name}
                      placeholder={i18next.t('loginName')}
                    />
                    <label className="d-block" htmlFor="username">
                      {i18next.t('loginName')}
                    </label>
                  </div>
                  <div className="text-danger">{formik.errors.username}</div>

                  <div className="form-floating mb-4 form-group">
                    <input
                      className={inputClassname}
                      type="password"
                      id="password"
                      name="password"
                      onChange={formik.handleChange}
                      value={formik.values.password}
                      placeholder={i18next.t('loginPassword')}
                    />
                    <label className="d-block" htmlFor="password">
                      {i18next.t('loginPassword')}
                    </label>
                  </div>
                  {(authFailed && formik.values.username.length !== 0 && formik.values.password.length !== 0) && <Form.Text className="text-danger">{i18next.t('LogError')}</Form.Text>}
                  {(authFailed && formik.values.username.length === 0) && <Form.Text className="text-danger">{i18next.t('LogErrorName')}</Form.Text>}
                  {(authFailed && formik.values.password.length === 0 && formik.values.username.length !== 0) && <Form.Text className="text-danger">{i18next.t('LogErrorPassword')}</Form.Text>}
                  {netError && <Form.Text className="text-danger">{i18next.t('NetError')}</Form.Text>}
                  <button
                    type="submit"
                    className="w-100 mb-3 btn btn-outline-primary"
                  >
                    {i18next.t('loginTitle')}
                  </button>
                </form>
              </div>
              <div className="card-footer p-4">
                <small>
                  <div className="text-center">
                    <span>
                      {i18next.t('loginNoAccount')}
                      {' '}
                    </span>
                    <a href="/signup">{i18next.t('loginRegistration')}</a>
                  </div>
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
