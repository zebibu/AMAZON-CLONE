import React, { useContext } from "react";
import LayOut from "../../components/LayOut/LayOut";
import ProductCard from "../../components/Product/ProductCard";
import { DataContext } from "../../components/DataProvider/DataProvider";
import CurrencyFormat from "../../components/currencyFormat/CurrencyFormat";
import { Link } from "react-router-dom";
import "./Cart.css";

function Cart() {
  const [{ basket, user }, dispatch] = useContext(DataContext);
  const total = basket?.reduce((amount, item) => amount + item.price, 0);

  return (
    <LayOut>
      <section className="cart-container">
        <div className="cart-items">
          <h3>Your shopping basket</h3>
          <hr />
          {basket?.length === 0 ? (
            <p>Opps ! No item in your cart</p>
          ) : (
            basket?.map((item, i) => {
              return (
                <ProductCard
                  key={i}
                  product={item}
                  flex={true}
                  renderAdd={false}
                  renderDesc={true}
                />
              );
            })
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
