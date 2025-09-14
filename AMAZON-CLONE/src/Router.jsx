import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./Pages/Landing/Landing";
import Auth from "./Pages/Auth/auth";
import Cart from "./Pages/Cart/Cart";
import Orders from "./Pages/Orders/Orders";
import Payment from "./Pages/Payment/Payment";
import Results from "./Pages/Results/Results";
import ProductDetail from "./Pages/ProductDetail/ProductDetail";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

const stripePromise = loadStripe(
  "pk_test_51S6gFFDrAR6DRow5T1YKkG4fMFifQJtBKxMhkdTsyBFRCuE4B5MKxohdJz1HJ4rC0AC8n1T0QUN9LDvZXtwLPx4g00POeMC7Ev"
);

function Routing() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/cart" element={<Cart />} />
      <Route path="/orders" element={
        <ProtectedRoute msg={"You need to login to your orders"} redirect="/orders">
        <Orders />
      </ProtectedRoute>

      } />
      

        <Route path="/category/:categoryName" element={<Results />} />
        <Route path="/product/:productId" element={<ProductDetail />} />
        <Route
          path="/payment"
          element={
            <ProtectedRoute msg="You need to login to proceed to payment" redirect="/payment">
              <Elements stripe={stripePromise}>
              <Payment />
            </Elements>
            </ProtectedRoute>
            
          }
        />
      </Routes>
    </Router>
  );
}

export default Routing;
