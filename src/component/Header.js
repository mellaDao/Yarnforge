import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState("");
  // Check if user is logged in when component mounts
  useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(token);
    setIsLoggedIn(!!token);
  }, []);

  return (
    <header className="header">
      {/* brand-logo navigates to home.php */}
      <section id="brand-heading">
        <h1>
          <Link to="/" id="return-home-btn">
            YarnForge
          </Link>
        </h1>
      </section>
      {/* navigation links */}
      <nav>
        <ul>
          <li>
            <Link to="/myPatterns">My Patterns</Link>
          </li>
          <li>
            <Link to="/newPattern">New Pattern</Link>
          </li>
          <li>
            <Link to="/knitting101">Knitting 101</Link>
          </li>
          <li>
            <Link to="/glossary">Glossary</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </nav>
      {/* registration buttons: Login and Signup buttons OR if logged in: 'My Account' button */}
      <section id="registration">
        {isLoggedIn ? (
          <Link to="/account" id="account-button">
            My Account<i className="bx bxs-user"></i>
          </Link>
        ) : (
          <>
            <Link to="/login">
              <button id="login-button">Login</button>
            </Link>
            <Link to="/register">
              <button id="signup-button">Sign Up</button>
            </Link>
          </>
        )}
      </section>
    </header>
  );
}

export default Header;
