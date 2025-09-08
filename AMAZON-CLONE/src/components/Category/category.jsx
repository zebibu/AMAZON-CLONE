import React from "react";
import { CategoryInfos } from "./CategoryFullinfos";
import CategoryCard from "./CategoryCard";
import "./category.css";

function category() {
  return (
    <div className="category-grid">
      {CategoryInfos.map((infos, index) => (
        <CategoryCard key={index} data={infos} />
      ))}
    </div>
  );
}

export default category;
