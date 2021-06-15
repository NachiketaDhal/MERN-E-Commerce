import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";

import { signin, authenticate, isAuthenticated } from "../auth/helper";

import Base from "../core/Base";

function Signin() {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    didRedirect: false,
  });

  const { email, password, error, loading, didRedirect } = values;
  const { user } = isAuthenticated();

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
    setValues({ ...values, error: false, loading: true });
    signin({ email, password })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, loading: false });
        } else {
          authenticate(data, () => {
            setValues({
              ...values,
              didRedirect: true,
            });
          });
        }
      })
      .catch(console.log("Signin process failed"));
  };

  const performRedirect = () => {
    if (didRedirect) {
      if (user && user.role === 1) {
        return <Redirect to="/admin/dashboard" />;
      } else {
        return <Redirect to="/user/dashboard" />;
      }
    }
    if (isAuthenticated()) {
      return <Redirect to="/" />;
    }
  };

  const loadingMessage = () => {
    return (
      loading && (
        <div className="alert alert-info">
          <h2>Loading...</h2>
        </div>
      )
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

  const signInFrom = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 pull-left">
          <form onSubmit={handleSubmit}>
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
  return (
    <Base title="Sign in page" description="A page for user to signin!">
      {loadingMessage()}
      {errorMessage()}
      {signInFrom()}
      {performRedirect()}
      <p className="text-white text-center">{JSON.stringify(values)}</p>
    </Base>
  );
}

export default Signin;
