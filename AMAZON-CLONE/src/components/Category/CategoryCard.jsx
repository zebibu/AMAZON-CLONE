import React from "react";

function CategoryCard({ data }) {
  return (
    <div className="category-card-box">
      <a href="">
        <span>
          <h2 className="category-card-title">{data.title}</h2>
        </span>
        <img
          src={data.imgLink}
          alt={data.title}
          className="category-card-image"
        />
        <a className="category-card-link">Shop now</a>
      </a>
    </div>
  );
}

export default CategoryCard;
