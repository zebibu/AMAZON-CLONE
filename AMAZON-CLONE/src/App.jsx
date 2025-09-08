import { useState } from "react";
import "./App.css";
import Header from "./components/Header/header";
import Carousel from "./components/Carousel/carousel";
import Category from "./components/Category/category";
import Product from "./components/Product/product";

function App() {
  return (
    <>
      <Header />
      <Carousel />
      <Category />
      <Product />
    </>
  );
}

export default App;
