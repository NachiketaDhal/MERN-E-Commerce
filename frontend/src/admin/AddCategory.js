import React, { useState } from "react";
import { Link } from "react-router-dom";

import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { createCategory } from "./helper/adminapicall";

function AddCategory() {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { user, token } = isAuthenticated();

  const goBack = () => {
    return (
      <div className="">
        <Link className="btn btn-sm btn-success mb-3" to="/admin/dashboard">
          Go back to DashBoard
        </Link>
      </div>
    );
  };

  const handleChange = (e) => {
    setError("");
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    // Backend request fired
    createCategory(user._id, token, { name }).then((data) => {
      if (data.error) {
        setError(true);
      } else {
        setError("");
        setSuccess(true);
        setName("");
      }
    });
  };

  const successMessage = () => {
    if (success) {
      return <h4 className="text-success">Category created successfully</h4>;
    }
  };

  const warningMessage = () => {
    if (error) {
      <h4 className="text-danger">Failed to create Category</h4>;
    }
  };

  const myCategoryForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <p className="lead">Enter the category</p>
          <input
            className="form-control"
            type="text"
            autoFocus
            required
            placeholder="e.g. Summer"
            value={name}
            onChange={handleChange}
          />
          <button className="btn btn-outline-info my-4">
            Create a Category
          </button>
        </div>
      </form>
    );
  };

  return (
    <Base
      title="Create a category"
      description="Add a new category for T-shirts"
      className="container bg-info p-4"
    >
      <div className="row bg-white rounded">
        <div className="col-md-8 offset-md-2 text-dark">
          {successMessage()}
          {warningMessage()}
          {myCategoryForm()}
          {goBack()}
        </div>
      </div>
    </Base>
  );
}

export default AddCategory;
