import React from 'react'
import LayOut from '../../components/LayOut/LayOut';
import Carousel from "../../components/Carousel/carousel";
import Category from "../../components/Category/category";
import Product from "../../components/Product/product";

function Landing() {
  return (
    <LayOut>
      <Carousel />
      <Category />
      <Product />
    </LayOut>
  );
}

export default Landing
