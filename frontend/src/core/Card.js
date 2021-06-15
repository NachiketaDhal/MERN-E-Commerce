import React, { useState } from "react";
import { Redirect } from "react-router";

import ImageHelper from "./helper/ImageHelper";
import { addItemToCart, removeItemFromCart } from "./helper/CartHelper";

const Card = ({
  product,
  addToCart = true,
  removeFromCart = false,
  setReload = (f) => f,
  reload = undefined,
}) => {
  const [redirect, setRedirect] = useState(false);

  const productName = product ? product.name : "Product Name Here";
  const productDescription = product
    ? product.description
    : "Product description";

  const addCart = () => {
    addItemToCart(product, () => {
      setRedirect(true);
    });
  };

  const getRedirect = (redirect) => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  return (
    <div className="card text-white bg-dark border border-info ">
      <div className="card-header lead">{productName}</div>
      <div className="card-body">
        {getRedirect(redirect)}
        <ImageHelper product={product} />
        <p className="lead bg-success font-weight-normal text-wrap">
          {productDescription}
        </p>
        <p className="btn btn-success rounded  btn-sm px-4">
          $ {product.price}
        </p>
        <div className="row">
          {addToCart && (
            <div className="col-12">
              <button
                onClick={addCart}
                className="btn col-12 btn-outline-success mt-2 mb-2"
              >
                Add to Cart
              </button>
            </div>
          )}
          {removeFromCart && (
            <div className="col-12">
              <button
                onClick={() => {
                  removeItemFromCart(product._id);
                  setReload(!reload);
                }}
                className="btn col-12 btn-outline-danger mt-2 mb-2"
              >
                Remove from cart
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
