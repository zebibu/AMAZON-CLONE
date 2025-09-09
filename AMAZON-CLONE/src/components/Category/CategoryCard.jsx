import React from "react";
import { Link } from "react-router-dom";

function CategoryCard({ data }) {
  // console.log(data);
  return (
    <div className="category-card-box">
      <Link to={`/category/${data.name}`}>
        <span>
          <h2 className="category-card-title">{data.title}</h2>
        </span>
        <img
          src={data.imgLink}
          alt={data.title}
          className="category-card-image"
        />
        <Link to="" className="category-card-link">
          Shop now
        </Link>
      </Link>
    </div>
  );
}

export default CategoryCard;
