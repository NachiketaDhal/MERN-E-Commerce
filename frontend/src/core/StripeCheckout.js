import React, { useState } from "react";
import { Link } from "react-router-dom";
import StripeCheckoutButton from "react-stripe-checkout";

import { isAuthenticated } from "../auth/helper";
import { API } from "../backend";
import { cartEmpty, loadCart } from "./helper/CartHelper";
import { createOrder } from "./helper/OrderHelper";

function StripeCheckout({ products, setReload = (f) => f, reload: undefined }) {
  const [data, setData] = useState({
    loading: false,
    success: false,
    error: "",
    address: "",
  });

  const token = isAuthenticated() && isAuthenticated().token;
  const userId = isAuthenticated() && isAuthenticated().user._id;

  const getFinalPrice = () => {
    return products
      .map((product) => product.price)
      .reduce((curValue, acc) => curValue + acc, 0);
  };

  const makePayment = (token) => {
    const body = {
      token,
      products,
    };
    const headers = {
      "Content-Type": "application/json",
    };
    return fetch(`${API}/stripepayment`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    })
      .then((response) => {
        console.log(response);
        const { status } = response;
        console.log("STATUS: ", status);
      })
      .catch((err) => console.log(err));
  };

  const showStripeButton = () => {
    return isAuthenticated() ? (
      <StripeCheckoutButton
        stripeKey={process.env.REACT_APP_STRIPE_PUBLIC_KEY}
        token={makePayment}
        amount={getFinalPrice() * 100}
        name="Buy T-shirt"
        billingAddress
        shippingAddress
      >
        <button className="btn btn-success my-4">Pay with stripe</button>
      </StripeCheckoutButton>
    ) : (
      <Link to="/signin" className="btn btn-warning my-4">
        Sign in to proceed
      </Link>
    );
  };
  return (
    <div>
      <h3 className="text-white">
        Stripe checkout {getFinalPrice()} <br />
        {showStripeButton()}
      </h3>
    </div>
  );
}

export default StripeCheckout;
