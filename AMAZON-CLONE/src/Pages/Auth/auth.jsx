import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";
import { auth } from "../../Utility/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { DataContext } from "../../components/DataProvider/DataProvider";
import { ClipLoader } from "react-spinners";

function Auth() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [{ user }, dispatch] = useContext(DataContext);
  const [loading, setLoading] = useState({
    signIn: false,
    signUp: false,
  });

  // console.log(user);

  const authHandler = async (e) => {
    e.preventDefault();

    // console.log(e.target.name);

    if (e.target.name === "signin") {
      // firebase auth
      setLoading({ ...loading, signIn: true });
      signInWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          dispatch({
            type: "SET_USER",
            user: userInfo.user,
          });
          setLoading({ ...loading, signIn: false });
          navigate("/");
        })
        .catch((err) => {
          setError(err.message);
          setLoading({ ...loading, signIn: false });
        });
    } else {
      setLoading({ ...loading, signUp: true });
      createUserWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          dispatch({
            type: "SET_USER",
            user: userInfo.user,
          });
          setLoading({ ...loading, signUp: false });
          navigate("/");
        })
        .catch((err) => {
          // console.log(err.message);
          setError(err.message);
          setLoading({ ...loading, signUp: false });
        });
    }
  };

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
            {loading.signIn ? <ClipLoader color="#000" size={15} /> : "Sign In"}
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
          {loading.signUp ? (
            <ClipLoader color="#000" size={15} />
          ) : (
            "Create your Amazon Account"
          )}
        </button>

        {error && (
          <small
            style={{ paddingTop: "5px", color: "red" }}
            className="auth-error"
          >
            {error}
          </small>
        )}
      </div>
    </section>
  );
}

export default Auth;
