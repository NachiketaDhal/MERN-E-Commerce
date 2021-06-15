import React, { useEffect, useState } from "react";

import { API } from "../backend";
import Base from "./Base";
import Card from "./Card";
import { getProducts } from "../admin/helper/adminapicall";
import { loadCart } from "./helper/CartHelper";
import StripeCheckout from "./StripeCheckout";

function Cart() {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    setProducts(loadCart());
  }, [reload]);

  const loadAllProducts = () => {
    return (
      <div>
        <h2>This section for load all products</h2>
        {products.map((product, i) => {
          return (
            <Card
              product={product}
              key={i}
              addToCart={false}
              removeFromCart={true}
              reload={reload}
              setReload={setReload}
            />
          );
        })}
      </div>
    );
  };

  const loadCheckout = () => {
    return (
      <StripeCheckout
        products={products}
        reload={reload}
        setReload={setReload}
      />
    );
  };

  return (
    <Base title="cart Page" description="Ready to checkout">
      <div className="row">
        <div className="col-4">{loadAllProducts()}</div>
        <div className="col-8">{loadCheckout()}</div>
      </div>
    </Base>
  );
}

export default Cart;
