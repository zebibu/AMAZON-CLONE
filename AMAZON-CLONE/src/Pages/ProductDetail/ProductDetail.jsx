import React, { useEffect, useState } from "react";
import LayOut from "../../components/LayOut/LayOut";
import { useParams } from "react-router-dom";
import axios from "axios";
import { productUrl } from "../../Api/endPoints";
import ProductCard from "../../components/Product/ProductCard";
import "./ProductDetail.css";
import Loader from "../../components/Loader/Loader";

function ProductDetail() {
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${productUrl}/products/${productId}`)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [productId]);

  return (
    <LayOut>
      <div className="products_container">
        {loading ? (
          <Loader />
        ) : (
          <ProductCard product={product} flex={true} renderDesc={true} 
          renderAdd={true}/>
        )}
      </div>
    </LayOut>
  );
}

export default ProductDetail;
