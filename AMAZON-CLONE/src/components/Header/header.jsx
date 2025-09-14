/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { Link } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { AiOutlineShoppingCart } from "react-icons/ai";
import "./header.css";
import LowerHeader from "./LowerHeader";
import { DataContext } from "../DataProvider/DataProvider";
import { auth } from "../../Utility/firebase";

function Header() {
  const [{ basket, user }, dispatch] = useContext(DataContext);

  const totalItems = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);

  return (
    <section className="fixed">
      <div className="header">
        <section className="header-container">
          {/* Left - Logo & Delivery */}
          <div className="header-left">
            {/* logo */}
            <Link to="/" className="header-logo">
              <img
                src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
                alt="amazon logo"
              />
            </Link>
            {/* delivery */}
            <div className="header-location">
              <HiOutlineLocationMarker className="header-location-icon" />
              <div>
                <p className="header-location-text">Deliver to</p>
                <span className="header-location-country">Ethiopia</span>
              </div>
            </div>
          </div>

          {/* Middle - Search */}
          <div className="header-search">
            <select className="header-search-select">
              <option value="">All</option>
            </select>
            <input
              type="text"
              placeholder="Search product"
              className="header-search-input"
            />
            <button className="header-search-icon">
              <BsSearch />
            </button>
          </div>

          {/* Right - Links */}
          <div className="header-right">
            <div className="header-lang">
              <img
                src="https://static.vecteezy.com/system/resources/previews/016/767/909/original/united-states-of-american-flag-free-vector.jpg"
                alt=""
              />
              <select>
                <option value="">EN</option>
              </select>
            </div>

            <Link to={!user && "/auth"} className="header-link">
              <div className="header-small">
                {user ? (
                  <>
                    <p>Hello {user?.email?.split("@")[0]}</p>
                    <span onClick={() => auth.signOut()}>Sign Out</span>
                  </>
                ) : (
                  <>
                    <p>Hello, sign In</p>
                    <span className="header-bold">Account & Lists</span>
                  </>
                )}
              </div>
            </Link>

            <Link to="/orders" className="header-link">
              <div>
                <p className="header-small">Returns</p>
                <span className="header-bold">& Orders</span>
              </div>
            </Link>

            {/* 🛒 Cart */}
            <Link to="/cart" className="header-cart">
              <span className="cart-count">{totalItems}</span>
              <AiOutlineShoppingCart className="cart-icon" />
              <span className="cart-text">Cart</span>
            </Link>
          </div>
        </section>
      </div>
      <LowerHeader />
    </section>
  );
}

export default Header;
