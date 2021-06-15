import React, { useEffect, useState } from "react";

import { API } from "../backend";
import Base from "./Base";
import Card from "./Card";
import { getProducts } from "../admin/helper/adminapicall";

function Home() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);

  const loadAllProducts = () => {
    getProducts().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProducts(data);
        console.log(data);
      }
    });
  };

  useEffect(() => {
    loadAllProducts();
  }, []);

  return (
    <Base title="Home Page" description="Welcome to the T-shirt store">
      <div className="row">
        {products.map((product, i) => {
          return (
            <div className="col-4" key={i}>
              <Card product={product} />
            </div>
          );
        })}
      </div>
    </Base>
  );
}

export default Home;
