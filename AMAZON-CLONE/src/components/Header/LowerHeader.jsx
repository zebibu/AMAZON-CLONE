import React, { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import "./LowerHeader.css";

function LowerHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <div className="lower-header">
      <ul className={`menu-list ${menuOpen ? "open" : ""}`}>
        {/* Always visible */}
        <li className="all-menu" onClick={toggleMenu}>
          <AiOutlineMenu />
          <p>All</p>
        </li>

        {/* Hidden on mobile by default */}
        <li className="menu-item">Today's Deals</li>
        <li className="menu-item">Customer Service</li>
        <li className="menu-item">Registry</li>
        <li className="menu-item">Gift Cards</li>
        <li className="menu-item">Sell</li>
      </ul>
    </div>
  );
}

export default LowerHeader;
