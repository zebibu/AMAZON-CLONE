import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LayOut from "../../components/LayOut/LayOut";
import "./Signup.css"; // Reusing the same CSS

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add sign in logic here (Firebase, backend, etc.)
    console.log({ email, password });
    alert("Signed in successfully!");
    navigate("/"); // Redirect to home page
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

          <h1>Sign-In</h1>
          <form onSubmit={handleSubmit}>
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

            <button type="submit" className="signup-button">
              Sign In
            </button>
          </form>

          <p className="signup-footer">
            New to Amazon? <Link to="/signup">Create your account</Link>
          </p>
        </div>
      </div>
    </LayOut>
  );
}

export default Signin;
