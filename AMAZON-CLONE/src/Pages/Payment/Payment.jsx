import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LayOut from "../../components/LayOut/LayOut";
import { DataContext } from "../../components/DataProvider/DataProvider";
import ProductCard from "../../components/Product/ProductCard";
import CurrencyFormat from "../../components/currencyFormat/CurrencyFormat";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import "./Payments.css";

function Payment() {
  const [{ basket, user }] = useContext(DataContext);
  const stripe = useStripe();
  const elements = useElements();

  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const [cardError, setCardError] = useState(""); // real-time card error

  const total = basket?.reduce((amount, item) => amount + item.price * item.amount, 0) || 0;

  useEffect(() => {
    fetch(`http://localhost:3000/payments/create?total=${Math.max(Math.round(total * 100), 100)}`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret))
      .catch((err) => console.error("Error fetching clientSecret:", err));
  }, [total]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements || !clientSecret) return;

    setLoading(true);
    setCardError("");

    const card = elements.getElement(CardElement);

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: { card, billing_details: { email: user?.email } },
    });

    if (error) {
      setCardError(error.message); // English error message
    } else if (paymentIntent.status === "succeeded") {
      alert("Payment successful!");
      window.location.href = "/orders";
    }

    setLoading(false);
  };

  return (
    <LayOut>
      <section className="payment-container">
        <h2>
          Checkout (<Link to="/cart">{basket?.length || 0} items</Link>)
        </h2>

        {/* Delivery Address */}
        <div className="payment-section">
          <div className="payment-title"><h3>Delivery Address</h3></div>
          <div className="payment-address">
            <p>{user?.email || "Guest"}</p>
            <p>123 Main Street</p>
            <p>Addis Ababa, Ethiopia</p>
          </div>
        </div>

        {/* Review Items */}
        <div className="payment-section">
          <div className="payment-title"><h3>Review Items</h3></div>
          <div className="payment-items">
            {basket?.length > 0 ? basket.map((item, i) => (
              <ProductCard key={i} product={item} flex renderAdd={false} renderDesc />
            )) : <p>Your basket is empty.</p>}
          </div>
        </div>

        {/* Payment Method */}
        <div className="payment-section">
          <div className="payment-title"><h3>Payment Method</h3></div>
          <div className="payment-details">
            <CurrencyFormat amount={total} className="currency-format" />

            <form onSubmit={handleSubmit}>
              <CardElement
                options={{
                  style: {
                    base: { fontSize: "16px", color: "#424770", "::placeholder": { color: "#aab7c4" } },
                    invalid: { color: "#9e2146" },
                  },
                }}
                onChange={(e) => setCardError(e.error ? e.error.message : "")}
              />
              {cardError && <div className="card-error">{cardError}</div>}
              <button type="submit" disabled={!stripe || loading} className="payment-button">
                {loading ? "Processing..." : "Pay Now"}
              </button>
            </form>
            {!clientSecret && <p>Loading payment form...</p>}
          </div>
        </div>
      </section>
    </LayOut>
  );
}

export default Payment;
