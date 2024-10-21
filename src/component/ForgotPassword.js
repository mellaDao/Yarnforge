import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

function ForgotPassword() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState([]);

  /* After form submission, wait for response from POST*/
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/forgotPassword",
        { email }
      );
      if (response.status === 200) {
        /* If response == 200, user will redirected for token verification*/
        navigate(`/TokenVerification?email=${encodeURIComponent(email)}`);
      } else {
        /* Otherwise, an error occurred (no match for email in database)*/

        setErrors([
          response.data.error || "Failed to send password recovery email.",
        ]);
      }
    } catch (error) {
      /* Catch other errors during form submission*/

      console.error(error);
      if (error.response && error.response.data && error.response.data.errors) {
        setErrors(error.response.data.errors);
      } else {
        setErrors(["Failed to send password recovery email."]);
      }
    }
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  return (
    <section>
      <section id="brand-heading">
        <h1>
          <Link to="/" id="return-home-btn">
            YarnForge
          </Link>
        </h1>
      </section>
      <div className="login-page">
        {/* Form that allows user to enter their account's email to reset password */}
        <div className="form">
          <h2>Forgot Password</h2>
          <form className="register-form" onSubmit={handleSubmit}>
            {/* Input box for email */}
            <div className="input-box">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                // Sets email as user types
                onChange={handleEmailChange}
                required
              />
            </div>
            <div>
              {/* Submit form button */}
              <button type="submit" name="reset-request-submit">
                Send Email
              </button>
            </div>
          </form>
          {/* Display all errors that occurred during form submission*/}
          <div className="error-message">
            {errors.map((error, index) => (
              <p key={index}>{error}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ForgotPassword;
