import React, { useState, useEffect } from "react";
import LayOut from "../../components/LayOut/LayOut";
import { useParams } from "react-router-dom";
import axios from "axios";
import { productUrl } from "../../Api/endPoints";
import ProductCard from "../../components/Product/ProductCard";
import "./Results.css";
import Loader from "../../components/Loader/Loader";

function Results() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true); // ✅ Add loading state
  const { categoryName } = useParams();

  useEffect(() => {
    setLoading(true); // start loading
    axios
      .get(`${productUrl}/products/category/${categoryName}`)
      .then((res) => {
        setResults(res.data);
        setLoading(false); // done loading
      })
      .catch((err) => {
        console.log(err);
        setLoading(false); // stop loading on error
      });
  }, [categoryName]);

  return (
    <LayOut>
      <section>
        <h1 style={{ padding: "30px" }}>Results</h1>
        <p style={{ padding: "30px" }}>category / {categoryName}</p>
        <hr />
        {loading ? (
          <Loader />
        ) : (
          <div className="products_container">
            {results?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </LayOut>
  );
}

export default Results;
