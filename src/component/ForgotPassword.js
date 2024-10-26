import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import ErrorMessages from "./ErrorMessages";

function ForgotPassword() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState([]);

  // after form submission, wait for response from POST
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/forgotPassword",
        { email }
      );
      if (response.status === 200) {
        // if response == 200, user will redirected for token verification
        navigate(`/TokenVerification?email=${encodeURIComponent(email)}`);
      } else {
        // otherwise, an error occurred (no match for email in database)
        setErrors([
          response.data.error || "Failed to send password recovery email.",
        ]);
      }
    } catch (error) {
      // catch other errors during form submission
      if (error.response && error.response.data && error.response.data.errors) {
        setErrors(error.response.data.errors);
      } else {
        setErrors(["Failed to send password recovery email."]);
      }
    }
  }

  // as user types, update email value
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  return (
    <section id="body-style-light">
      {/* brand heading redirects to home */}
      <section id="brand-heading">
        <h1>
          <Link to="/" id="return-home-btn">
            YarnForge
          </Link>
        </h1>
      </section>
      <div className="auth-page">
        {/* form that allows user to enter their account's email to reset password */}
        <div className="form">
          <h2>Forgot Password</h2>
          <form className="forgot-password-form" onSubmit={handleSubmit}>
            {/* input box for email */}
            <div className="input-box">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                // sets email as user types
                onChange={handleEmailChange}
                required
              />
            </div>
            <div>
              {/* submit form button */}
              <button type="submit" name="reset-request-submit">
                Send Email
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

export default ForgotPassword;
