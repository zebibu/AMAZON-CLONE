import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";
import { auth } from "../../Utility/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { DataContext } from "../../components/DataProvider/DataProvider";


function Auth() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [{user}, dispatch] = useContext(DataContext);

console.log(user)

  const authHandler = async (e) => {
    e.preventDefault();

    console.log(e.target.name);

    if (e.target.name == "signin") {
      // firebase auth
      signInWithEmailAndPassword(auth, email, password).then((userInfo) => {
        dispatch({
          type: "SET_USER",
          user: userInfo.user
        })
      }).catch((err) => {
        setError(err);
      })
    }else createUserWithEmailAndPassword(auth, email, password).then((userInfo) => {
      dispatch({
        type: "SET_USER",
        user: userInfo.user,
      });
    })
    .catch((err) => {
      console.log(err)
    })
  };

  // console.log(email, password);

  return (
    <section className="auth">
      {/* Logo */}
      <Link to="/" className="auth-logo">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
          alt="amazon-logo"
        />
      </Link>

      {/* form */}
      <div className="auth-container">
        <h1 className="auth-title">Sign-In</h1>
        <form className="auth-form">
          <div className="auth-input-group">
            <label htmlFor="email">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
            />
          </div>

          <div className="auth-input-group">
            <label htmlFor="password">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
            />
          </div>

          <button
            type="submit"
            onClick={authHandler}
            name="signin"
            className="auth-signin-btn"
          >
            Sign In
          </button>
        </form>

        {/* Agreement */}
        <p className="auth-agreement">
          By signing-in you agree to Amazon's{" "}
          <span>Conditions of Use & Sale</span>. Please see our{" "}
          <span>Privacy Notice</span>, our <span>Cookies Notice</span>, and our{" "}
          <span>Interest-Based Ads Notice</span>.
        </p>

        {/* Sign-up */}
        <button
          type="submit"
          className="auth-register-btn"
          onClick={authHandler}
          name="signup"
        >
          Create your Amazon Account
        </button>
      </div>
    </section>
  );
}

export default Auth;
