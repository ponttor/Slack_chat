import axios from "axios";
import * as yup from "yup";
import { createBrowserHistory } from "history";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import AuthContext from '../AuthContext';

const validationSchema = yup.object({
  username: yup
    .string()
    .min(3, "Please enter your real name")
    .required("Full name is required"),
  password: yup.string().required("Password is required"),
});

const Login = () => {
  const { isAuthenticated, login } = useContext(AuthContext);
  console.log(isAuthenticated);
  const history = useHistory();
  // setIsAuth(true);
  // const history = createBrowserHistory();
  const onSubmit = async (values) => {
    try {
      const response = await axios.post("/api/v1/login", values);
      localStorage.setItem("token", response.data.token);
      console.log(values.name);
      login(values.name);
      // setIsAuthenticated(true);
      // history.push("/");
      // setIsAuth(true);
    } catch (err) {
      console.log("wtf");
      console.log(err.response.statusText);
    }
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit,
    validationSchema,
  });

  // const pageRender = () => {
  //   if isAuth {? history.push("/") : }history.push("/login");
  // };

  return (
    <>
      {isAuthenticated && history.push('/')}
      <div className="container mt-3 ">
        <div className="row d-flex justify-content-center align-items-center">
          <div className="col-md-5 ">
            <div className="d-flex justify-content-center align-items-center">
              <div className="container h-100 d-flex justify-content-center">
                <div className="row d-flex justify-content-center">
                  <div className="col">
                    <form className="" onSubmit={formik.handleSubmit}>
                      <label className="d-block" htmlFor="username">
                        Name
                      </label>
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

                      <label className="d-block" htmlFor="password">
                        Password
                      </label>
                      <input
                        className="d-block"
                        type="password"
                        id="password"
                        name="password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                      />
                      <div className="text-danger fs-6">
                        {formik.errors.password}
                      </div>

                      <button type="submit" className="bg-primary d-block">
                        Button
                      </button>
                    </form>
                    <div>
                      <hr />
                      Registration link
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
