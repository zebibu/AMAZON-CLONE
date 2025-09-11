import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LayOut from "../../components/LayOut/LayOut";
import "./Signup.css";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    console.log({ name, email, password });
    alert("Account created successfully!");
    navigate("/auth"); 
  };

  return (
    <LayOut>
      <div className="signup-container">
        <div className="signup-box">
          {/* Amazon Logo */}
          <Link to="/" className="signup-logo">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
              alt="Amazon Logo"
            />
          </Link>

          <h1>Create Account</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Your Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <label htmlFor="confirmPassword">Re-enter Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

            <button type="submit" className="signup-button">
              Continue
            </button>
          </form>

          <p className="signup-footer">
            Already have an account? <Link to="/auth">Sign in</Link>
          </p>
        </div>
      </div>
    </LayOut>
  );
}

export default Signup;
