import React from "react";
import Rating from "@mui/material/Rating";
import CurrencyFormat from "../currencyFormat/CurrencyFormat";
import "./Product.css";

function ProductCard({ product }) {
  if (!product) return null; // ✅ guard if no product passed

  const { image, title, rating, price } = product;

  return (
    <div className="product-card">
      <a href="">
        <img src={image} alt={title} className="product-card__image" />
      </a>
      <div className="product-card__info">
        <h3 className="product-card__title">{title}</h3>

        <div className="product-card__rating">
          <Rating value={rating?.rate || 0} precision={0.1} />
          <small className="product-card__rating-count">
            {rating?.count || 0}
          </small>
        </div>

        <div className="product-card__price">
          <CurrencyFormat amount={price} />
        </div>

        <button className="product-card__button">Add to cart</button>
      </div>
    </div>
  );
}

export default ProductCard;
