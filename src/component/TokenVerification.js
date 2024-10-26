import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import ErrorMessages from "./ErrorMessages";

function TokenVerification() {
  const navigate = useNavigate();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get("email");

  const [errors, setErrors] = useState([]);
  const [token, setToken] = useState("");

  /* after form submission, wait for a response for POST request*/

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/verifyToken", {
        token,
        email,
      });
      if (response.status === 200) {
        /* if response is successful, continue to /resetPassword */

        navigate(`/ResetPassword?email=${encodeURIComponent(email)}`);
      } else {
        /* if there is no match with database, invalid token */

        setErrors([response.data.error || "Invalid token."]);
      }
    } catch (error) {
      /* catch any other errors */

      console.error(error);
      if (error.response && error.response.data && error.response.data.errors) {
        setErrors(error.response.data.errors);
      } else {
        setErrors(["Failed to verify token. Try again later."]);
      }
    }
  }

  /* continuously update token as user types */
  const handleTokenChange = (event) => {
    setToken(event.target.value);
  };

  return (
    <section id="body-style2">
      <section id="brand-heading">
        <h1>
          <Link to="/" id="return-home-btn">
            YarnForge
          </Link>
        </h1>
      </section>
      <div className="login-page">
        {/* form to verify token that was sent to user's email */}
        <div class="form">
          <h2>Password Reset Verification</h2>
          <p>A verification token has been sent to: {email}</p>
          <form class="register-form" onSubmit={handleSubmit}>
            <div class="input-box">
              {/* input box for token */}
              <input
                type="text"
                name="token"
                placeholder="Token"
                value={token}
                onChange={handleTokenChange}
                required
              />
            </div>
            {/* resend email link */}
            <div class="forgot-password">
              <a href="token_verification.php?resend=true&email=<?php echo $email; ?>">
                Resend email
              </a>
            </div>
            <div>
              {/* submit button */}
              <button type="submit" name="verify-submit">
                Verify
              </button>
            </div>
          </form>
          {/* error messages*/}
          <ErrorMessages errors={errors} />
        </div>
      </div>
    </section>
  );
}

export default TokenVerification;
