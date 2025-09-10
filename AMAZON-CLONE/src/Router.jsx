// Routing.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./Pages/Landing/Landing";
import Signup from "./Pages/Auth/Signup";
import Cart from "./Pages/Cart/Cart";
import Orders from "./Pages/Orders/Orders";
import Payment from "./Pages/Payment/Payment";
import Results from "./Pages/Results/Results";
import ProductDetail from "./Pages/ProductDetail/ProductDetail";

function Routing() {
  return (
    <Router>
      <Routes>
        {/* 👇 Default route (Landing Page) */}
        <Route path="/" element={<Landing />} />

        {/* Other routes */}
        <Route path="/auth" element={<Signup />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/category/:categoryName" element={<Results />} />
        <Route path="/product/:productId" element={<ProductDetail />} />
        <Route path="/payment" element={<Payment />} />
      </Routes>
    </Router>
  );
}

export default Routing;
