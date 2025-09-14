import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import LayOut from "../../components/LayOut/LayOut";
import { DataContext } from "../../components/DataProvider/DataProvider";
import ProductCard from "../../components/Product/ProductCard";
import CurrencyFormat from "../../components/currencyFormat/CurrencyFormat";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { axiosInstance } from "../../Api/axios";
import "./Payments.css";
import { ClipLoader } from "react-spinners";
import { db } from "../../Utility/firebase";


function Payment() {
  const [{ basket, user }] = useContext(DataContext);

  
  
  // eslint-disable-next-line no-unused-vars
  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);

  const total = basket?.reduce(
    (amount, item) => amount + item.price * item.amount,
    0
  );

  const [cardError, setCardError] = useState(null);
  const [processing, setProcessing] = useState(false);

  const stripe = useStripe();

  const elements = useElements();

  const handdleChange = (e) => {
    e?.error?.message ? setCardError(e.error.message) : setCardError("");
  };

  const handdlePayment = async (e) => {
    e.preventDefault();

    try {
      setProcessing(true);
      const response = await axiosInstance({
        method: "POST",
        url: `/payment/create?total=${total * 100}`,
      });

      console.log("Response from backend:", response.data);

      const clientSecret = response.data?.clientSecret;

      const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
  payment_method: {
    card: elements.getElement(CardElement)
  },
});

      console.log("Payment successful:", paymentIntent);

      setProcessing(false);

      // Save order in Firestore (Firebase v9)
      await db.collection('users').doc(user?.uid).collection('orders').doc(paymentIntent.id).set({
        basket: basket,
        amount: paymentIntent.amount,
        created: paymentIntent.created,
      });

      
  
    } 
    
    catch (error) {
      console.error(error);
      setProcessing(false);
    }
  };
  return (
    <LayOut>
      <section className="payment-container">
        <h2>
          Checkout (<Link to="/cart">{basket?.length || 0} items</Link>)
        </h2>

        {/* Delivery Address */}
        <div className="payment-section">
          <div className="payment-title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment-address">
            <p>{user?.email || "Guest"}</p>
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
            {basket?.length > 0 ? (
              basket.map((item, i) => (
                <ProductCard
                  key={i}
                  product={item}
                  flex={true}
                  renderDesc
                />
              ))
            ) : (
              <p>Your basket is empty.</p>
            )}
          </div>
        </div>

        {/* Payment Method */}
        <div className="payment-section">
          <div className="payment-title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment-details">
            <CurrencyFormat amount={total} className="currency-format" />

            <form onChange={handdleChange} onSubmit={handdlePayment}>
              {cardError && <small style={{ color: "red" }}>{cardError}</small>}
              <CardElement
                options={{
                  style: {
                    base: {
                      fontSize: "16px",
                      color: "#424770",
                      "::placeholder": { color: "#aab7c4" },
                    },
                    invalid: { color: "#9e2146" },
                  },
                }}
                onChange={handdleChange}
              />
              <button type="submit" className="payment-button">
                {processing ? (
                  <div>
                    <ClipLoader color="gray" size={20} />
                    <p>Please wait...</p>
                  </div>
                ) : (
                  "Pay Now"
                )}
              </button>
            </form>
          </div>
        </div>
      </section>
    </LayOut>
  );
}

export default Payment;
