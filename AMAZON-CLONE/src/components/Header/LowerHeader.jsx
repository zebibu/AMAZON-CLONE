import React from "react";
import { AiOutlineMenu } from "react-icons/ai";
import "./LowerHeader.css";

function LowerHeader() {
  return (
    <div className="lower-header">
      <ul>
        <li>
          <AiOutlineMenu />
          <p>All</p>
        </li>
        <li>Today's Deals</li>
        <li>Customer Service</li>
        <li>Registry</li>
        <li>Gift Cards</li>
        <li>Sell</li>
      </ul>
    </div>
  );
}

export default LowerHeader;
