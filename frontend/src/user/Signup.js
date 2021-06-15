import React, { useState } from "react";
import { Link } from "react-router-dom";

import Base from "../core/Base";
import { signup } from "../auth/helper/";

function Signup() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });
  const { name, email, password, error, success } = values;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      error: false,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, error: false });
    signup({ name, email, password })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, success: false });
        } else {
          setValues({
            ...values,
            name: "",
            email: "",
            password: "",
            error: "",
            success: true,
          });
        }
      })
      .catch((err) => console.log(err));
  };

  const signUpFrom = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name" className="text-light">
                Name
              </label>
              <input
                className="form-control"
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email" className="text-light">
                Email
              </label>
              <input
                className="form-control"
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password" className="text-light">
                Password
              </label>
              <input
                className="form-control"
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={handleChange}
              />
            </div>
            <button className="btn btn-success" style={{ marginTop: "1rem" }}>
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  };

  const successMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-success"
            style={{ display: success ? "block" : "none" }}
          >
            New account was created successfully, please
            <Link to="/signin">login here</Link>
          </div>
        </div>
      </div>
    );
  };

  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-danger"
            style={{ display: error ? "block" : "none" }}
          >
            {error}
          </div>
        </div>
      </div>
    );
  };

  return (
    <Base title="Sign up page" description="A page for user to signup!">
      {successMessage()}
      {errorMessage()}
      {signUpFrom()}
      <p className="text-white text-center">{JSON.stringify(values)}</p>
    </Base>
  );
}

export default Signup;
