import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { delteProduct, getProducts } from "./helper/adminapicall";

function ManageProducts() {
  const [products, setProducts] = useState([]);

  const { user, token } = isAuthenticated();

  const preload = () => {
    getProducts()
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        }
        setProducts(data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    preload();
  }, []);

  const onDelete = (productId) => {
    delteProduct(productId, user._id, token)
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        }
        preload();
      })
      .catch((err) => console.log(err));
  };

  return (
    <Base title="Welcome admin" description="Manage products here">
      <h2 className="mb-4">All products:</h2>
      <Link className="btn btn-info" to={`/admin/dashboard`}>
        <span className="">Admin Home</span>
      </Link>
      <div className="row">
        <div className="col-12">
          <h2 className="text-center text-white my-3">Total 3 products</h2>

          {products.map((product, i) => {
            return (
              <div className="row text-center mb-2" key={i}>
                <div className="col-4">
                  <h3 className="text-white text-left">{product.name}</h3>
                </div>
                <div className="col-4">
                  <Link
                    className="btn btn-success"
                    to={`/admin/product/update/${product._id}`}
                  >
                    <span className="">Update</span>
                  </Link>
                </div>
                <div className="col-4">
                  <button
                    onClick={() => {
                      onDelete(product._id);
                    }}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Base>
  );
}

export default ManageProducts;
