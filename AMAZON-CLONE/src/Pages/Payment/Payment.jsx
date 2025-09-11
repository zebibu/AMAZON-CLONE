import React, { useContext } from "react";
import { Link } from "react-router-dom";
import LayOut from "../../components/LayOut/LayOut";
import { DataContext } from "../../components/DataProvider/DataProvider";
import ProductCard from "../../components/Product/ProductCard";
import CurrencyFormat from "../../components/currencyFormat/CurrencyFormat";
import "./Payments.css";

function Payment() {
  const [{ basket, user }] = useContext(DataContext);

  const total = basket?.reduce(
    (amount, item) => amount + item.price * item.amount,
    0
  );

  return (
    <LayOut>
      <section className="payment-container">
        <h2>
          Checkout (<Link to="/cart">{basket?.length} items</Link>)
        </h2>

        {/* Delivery Address */}
        <div className="payment-section">
          <div className="payment-title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment-address">
            <p>{user?.email}</p>
            <p>123 Main Street</p>
            <p>Addis Ababa, Ethiopia</p>
          </div>
        </div>

        {/* Review Items */}
        <div className="payment-section">
          <div className="payment-title">
            <h3>Review Items</h3>
          </div>
          <div className="payment-items">
            {basket?.map((item, i) => (
              <ProductCard
                key={i}
                product={item}
                flex={true}
                renderAdd={false}
                renderDesc={true}
              />
            ))}
          </div>
        </div>

        {/* Payment Method */}
        <div className="payment-section">
          <div className="payment-title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment-details">
            <CurrencyFormat amount={total} className="currency-format" />
            <button className="payment-button">Proceed to Pay</button>
          </div>
        </div>
      </section>
    </LayOut>
  );
}

export default Payment;
