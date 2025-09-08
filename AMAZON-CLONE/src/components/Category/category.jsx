import React from "react";
import { CategoryInfos } from "./CategoryFullinfos";
import CategoryCard from "./CategoryCard";
import "./category.css";

function Category() {
  return (
    <div className="category-grid-container">
      {CategoryInfos.map((infos, index) => (
        <CategoryCard key={index} data={infos} />
      ))}
    </div>
  );
}

export default Category;
