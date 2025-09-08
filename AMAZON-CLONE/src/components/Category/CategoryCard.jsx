import React from "react";

function CategoryCard({ data }) {
  return (
    <div className="category-card">
      <a href="">
        <span>
          <h2>{data.title}</h2>
        </span>
        <img src={data.imgLink} alt={data.title} />
        <p>shop now</p>
      </a>
    </div>
  );
}

export default CategoryCard;
