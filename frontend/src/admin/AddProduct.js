import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Base from "../core/Base";
import { createProduct, getCategories } from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper";

function AddProduct() {
  const { user, token } = isAuthenticated();

  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    stock: 0,
    photo: "",
    categories: [],
    category: "",
    loading: false,
    error: "",
    createdProduct: "",
    getRedirect: false,
    formData: "",
  });

  const {
    name,
    description,
    price,
    stock,
    categories,
    category,
    loading,
    error,
    createdProduct,
    getRedirect,
    formData,
  } = values;

  const preload = () => {
    getCategories().then((data) => {
      console.log(data);
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, categories: data, formData: new FormData() });
        console.log("CATEGORIES: ", categories);
      }
    });
  };

  useEffect(() => {
    preload();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const timeOut = setTimeout(() => {}, 2000);
  });

  const handleChange = (e) => {
    const { name } = e.target;
    let value;
    if (name === "photo") {
      value = e.target.files[0];
    } else {
      value = e.target.value;
    }
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, error: "", loading: true });
    createProduct(user._id, token, formData)
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setValues({
            ...values,
            name: "",
            description: "",
            price: "",
            photo: "",
            stock: "",
            loading: false,
            createdProduct: data.name,
          });
        }
      })
      .catch((err) => console.log(err));
  };

  const successMessage = () => {
    return (
      <div
        className="alert alert-success mt-3"
        style={{ display: createdProduct ? "block" : "none" }}
      >
        <h4>{createProduct} created successfully</h4>
      </div>
    );
  };

  const errorMessage = () => {
    return (
      <div
        className="alert alert-danger mt-3"
        style={{ display: !createProduct ? "block" : "none" }}
      >
        <h4>{createProduct} created successfully</h4>
      </div>
    );
  };

  const showLoading = () => {
    if (loading) {
      return <h1 className="bg-dark">Loading...</h1>;
    }
  };

  const createProductForm = () => (
    <form onSubmit={handleSubmit}>
      <span>Post photo</span>
      <div className="form-group">
        <label className="btn btn-block btn-success">
          <input
            onChange={handleChange}
            type="file"
            name="photo"
            accept="image"
            placeholder="choose a file"
          />
        </label>
      </div>
      <div className="form-group">
        <input
          onChange={handleChange}
          name="name"
          className="form-control"
          placeholder="Name"
          value={name}
        />
      </div>
      <div className="form-group">
        <textarea
          onChange={handleChange}
          name="description"
          className="form-control"
          placeholder="Description"
          value={description}
        />
      </div>
      <div className="form-group">
        <input
          onChange={handleChange}
          type="number"
          name="price"
          className="form-control"
          placeholder="Price"
          value={price}
        />
      </div>
      <div className="form-group">
        <select
          onChange={handleChange}
          name="category"
          className="form-control"
          placeholder="Category"
          value={category}
        >
          <option>Select</option>
          {categories &&
            categories.map((category, i) => {
              return (
                <option value={category._id} key={i}>
                  {category.name}
                </option>
              );
            })}
        </select>
      </div>
      <div className="form-group">
        <input
          onChange={handleChange}
          type="number"
          name="stock"
          className="form-control"
          placeholder="Quantity"
          value={stock}
        />
      </div>

      <button type="submit" className="btn btn-outline-success my-2">
        Create Product
      </button>
    </form>
  );
  return (
    <Base
      title="Add a Product here"
      description="Welcome to product creation section"
      className="container bg-info p-4"
    >
      <Link to="/admin/dashboard" className="btn btn-dark btn-md mb-3">
        Back to DashBoard
      </Link>
      <div className="row bg-dark text-white rounded">
        <div className="col-md-8 offset-md-2">
          {showLoading()}
          {successMessage()}
          {errorMessage()}
          {createProductForm()}
        </div>
      </div>
    </Base>
  );
}

export default AddProduct;
