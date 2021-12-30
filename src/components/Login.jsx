import axios from "axios";
import cn from "classnames";
import * as yup from "yup";
import i18next from "i18next";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import React, { useState, useContext } from "react";
import AuthContext from "../AuthContext";

const validationSchema = yup.object({
  username: yup
    .string()
    .min(3, "Please enter your real name")
    .required("Full name is required"),
  password: yup.string().required("Password is required"),
});

const Login = () => {
  const [inputClassname, setInputClassname] = useState("form-control");
  const [error, setError] = useState(false);
  const { isAuthenticated, login } = useContext(AuthContext);
  const history = useHistory();

  const handleError = (err) => {
    if (err.response) {
      // if (err.response.status === 401) {
      console.log(err);
      setError(true);
      setInputClassname("form-control is-invalid");
      console.log(inputClassname);
      return;
    }
    console.log("no network");
  };

  const onSubmit = async (value) => {
    try {
      const response = await axios.post("/api/v1/login", value);
      localStorage.setItem("token", response.data.token);
      login(value.name);
    } catch (err) {
      handleError(err);
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

  console.log(formik);

  return (
    <>
      {isAuthenticated && history.push("/")}
      <div className="container-fluid h-100">
        <div className="h-100 d-flex justify-content-center align-items-center">
          <div className="col-12 col-md-8 col-xxl-6">
            <div className="card shadow-sm">
              <div className="card-body row p-5">
                <div className="d-flex align-items-center justify-content-center col-12 col-md-6 p-4">
                  <img
                    src="https://res.cloudinary.com/ponttor/image/upload/v1640614045/hexlet_pielxk.jpg"
                    className="card-img-top flex-grow-1 rounded-circle p-5"
                    alt={i18next.t("loginTitle")}
                  />
                </div>
                <form
                  className="col-12 col-md-6 mt-3 mt-mb-0"
                  onSubmit={formik.handleSubmit}
                >
                  <h1 className="text-center mb-4">
                    {i18next.t("loginTitle")}
                  </h1>
                  <div className="form-floating mb-3 form-group">
                    <input
                      // className="form-control"
                      className={inputClassname}
                      type="text"
                      id="username"
                      name="username"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.name}
                      placeholder={i18next.t("loginName")}
                    />
                    <label className="d-block" htmlFor="username">
                      {i18next.t("loginName")}
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
                      placeholder={i18next.t("loginPassword")}
                    />
                    <label className="d-block" htmlFor="password">
                      {i18next.t("loginPassword")}
                    </label>
                  </div>
                  <div className="text-danger">{formik.errors.password}</div>
                  {error && (
                    <div className="invalid-tooltip">
                      Неверные имя пользователя или пароль
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-100 mb-3 btn btn-outline-primary"
                  >
                    {i18next.t("loginTitle")}
                  </button>
                </form>
              </div>
              <div className="card-footer p-4">
                <small>
                  <div className="text-center">
                    <span>{i18next.t("loginNoAccount")} </span>
                    <a href="/signup">{i18next.t("loginRegistration")}</a>
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
