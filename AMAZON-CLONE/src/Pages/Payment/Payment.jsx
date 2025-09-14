import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LayOut from "../../components/LayOut/LayOut";
import { DataContext } from "../../components/DataProvider/DataProvider";
import ProductCard from "../../components/Product/ProductCard";
import CurrencyFormat from "../../components/currencyFormat/CurrencyFormat";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { Type } from "../../Utility/actionType";
import "./Payments.css";

function Payment() {
  const [{ basket, user }, dispatch] = useContext(DataContext);
  const stripe = useStripe();
  const elements = useElements();

  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Calculate total
  const total = basket?.reduce(
    (amount, item) => amount + item.price * item.amount,
    0
  );

  // Fetch client secret from backend whenever basket changes
  useEffect(() => {
    if (total > 0) {
      fetch(
        `http://localhost:3000/payments/create?total=${Math.round(
          total * 100
        )}`,
        { method: "POST" }
      )
        .then((res) => res.json())
        .then((data) => setClientSecret(data.clientSecret))
        .catch((err) => console.error("Error fetching clientSecret:", err));
    }
  }, [total]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    if (!stripe || !elements || !clientSecret) return;

    setLoading(true);

    const card = elements.getElement(CardElement);

    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email,
          },
        },
      }
    );

    if (error) {
      setErrorMessage(error.message); // show error in red
    } else if (paymentIntent.status === "succeeded") {
      alert("Payment successful!");
      dispatch({ type: Type.CLEAR_BASKET }); // clear basket only after success
      window.location.href = "/orders"; // redirect
    }

    setLoading(false);
  };

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
            <p className="total-amount">
              Total: <CurrencyFormat amount={total} />
            </p>

            {clientSecret && basket.length > 0 ? (
              <form onSubmit={handleSubmit}>
                {/* Card input */}
                <CardElement
                  options={{
                    style: {
                      base: {
                        fontSize: "16px",
                        color: "#424770",
                        "::placeholder": {
                          color: "#aab7c4",
                        },
                      },
                      invalid: {
                        color: "#9e2146",
                      },
                    },
                  }}
                />
                {errorMessage && (
                  <p className="payment-error">{errorMessage}</p>
                )}
                <button
                  type="submit"
                  disabled={!stripe || loading}
                  className="payment-button"
                >
                  {loading ? "Processing..." : "Pay Now"}
                </button>
              </form>
            ) : (
              <p>Please add items to your basket to proceed with payment.</p>
            )}
          </div>
        </div>
      </section>
    </LayOut>
  );
}

export default Payment;
