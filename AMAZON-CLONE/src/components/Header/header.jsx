import React from "react";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { BsSearch } from "react-icons/bs";
import { AiOutlineShoppingCart } from "react-icons/ai";
import "./header.css";
import LowerHeader from "./LowerHeader";

function header() {
  return (
    <>
      <div className="header">
        <section className="header-container">
          {/* Left - Logo & Delivery */}
          <div className="header-left">
            {/* logo */}
            <a href="" className="header-logo">
              <img
                src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
                alt="amazon logo"
              />
            </a>
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

            <a href="" className="header-link">
              <div>
                <p className="header-small">Sign In</p>
                <span className="header-bold">Account & Lists</span>
              </div>
            </a>

            <a href="" className="header-link">
              <div>
                <p className="header-small">Returns</p>
                <span className="header-bold">& Orders</span>
              </div>
            </a>

            {/* 🛒 Cart */}
            <a href="/cart" className="header-cart">
              <span className="cart-count">0</span>
              <AiOutlineShoppingCart className="cart-icon" />
              <span className="cart-text">Cart</span>
            </a>
          </div>
        </section>
      </div>
      <LowerHeader />
    </>
  );
}

export default header;
