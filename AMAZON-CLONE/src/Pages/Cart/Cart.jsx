import React, { useContext } from "react";
import LayOut from "../../components/LayOut/LayOut";
import ProductCard from "../../components/Product/ProductCard";
import { DataContext } from "../../components/DataProvider/DataProvider";
import CurrencyFormat from "../../components/currencyFormat/CurrencyFormat";
import { Link } from "react-router-dom";
import "./Cart.css";
import { Type } from "../../Utility/actionType";

function Cart() {
  const [{ basket, user }, dispatch] = useContext(DataContext);
  const total = basket?.reduce(
    (amount, item) => amount + item.price * item.amount,
    0
  );

  const increment = (item) => {
    dispatch({
      type: Type.ADD_TO_BASKET,
      item,
    });
  };

  const decrement = (id) => {
    dispatch({
      type: Type.REMOVE_FROM_BASKET,
      id,
    });
  };

  return (
    <LayOut>
      <section className="cart-container">
        <div className="cart-items">
          <h3>Your shopping basket</h3>
          <hr />
          {basket?.length === 0 ? (
            <p>Opps ! No item in your cart</p>
          ) : (
            basket?.map((item, i) => (
              <section key={i}>
                <ProductCard
                  product={item}
                  flex={true}
                  renderAdd={false}
                  renderDesc={true}
                />
                {/* Increment / Decrement buttons for each item */}
                <div className="item-controls">
                  <button onClick={() => increment(item)}>+</button>
                  <span>{item.amount}</span>
                  <button onClick={() => decrement(item.id)}>-</button>
                </div>
              </section>
            ))
          )}
        </div>

        {basket?.length !== 0 && (
          <div className="cart-summary">
            <p>
              Subtotal ({basket.length} items):{" "}
              <CurrencyFormat amount={total} />
            </p>
            <span>
              <input type="checkbox" />
              <small>This order contains a gift</small>
            </span>
            <Link to="/payment">Proceed to checkout</Link>
          </div>
        )}
      </section>
    </LayOut>
  );
}

export default Cart;
