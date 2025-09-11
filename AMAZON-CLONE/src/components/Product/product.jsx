import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import Loader from "../Loader/Loader"; // make sure the path is correct
import "./Product.css";

function Product() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true); // start loading
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        setProducts(res.data);
        setLoading(false); // stop loading
      })
      .catch((err) => {
        console.log(err);
        setLoading(false); // stop loading on error
      });
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <section className="product-grid">
          {products.map((singleProduct) => (
            <ProductCard products={singleProduct} key={singleProduct.id}
            renderAdd={true} />
          ))}
        </section>
      )}
    </>
  );
}

export default Product;
