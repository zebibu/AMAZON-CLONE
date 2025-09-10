import React from "react";
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
import CurrencyFormat from "../currencyFormat/CurrencyFormat";
import "./Product.css";

function ProductCard({ product, products, flex, renderDesc }) {
  const data = product || products;
  if (!data) return null;

  const { id, image, title, rating, price, description } = data;

  return (
    <div className={`product-card ${flex ? "product-card-flex" : ""}`}>
      {id ? (
        <Link to={`/product/${id}`}>
          <img src={image} alt={title} className="product-card__image" />
        </Link>
      ) : (
        <img src={image} alt={title} className="product-card__image" />
      )}

      <div className="product-card__info">
        <h3 className="product-card__title">{title}</h3>

        {/* Render description if renderDesc is true */}
        {renderDesc && description && (
          <p className="product-card__description">{description}</p>
        )}

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
