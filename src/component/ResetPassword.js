import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

function ResetPassword() {
  const navigate = useNavigate();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get("email");

  const [errors, setErrors] = useState([]);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  /* After form submission, wait for a response for POST request*/

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/resetPassword", {
        email,
        password,
        confirmPassword,
      });
      if (response.status === 200) {
        /* If successful response, redirect user to login page*/

        navigate(`/login`);
      } else {
        /* If there is a match with database*/

        setErrors([response.data.error || "Invalid token."]);
      }
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data && error.response.data.errors) {
        setErrors(error.response.data.errors);
      } else {
        setErrors(["Failed to reset password. Try again later."]);
      }
    }
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
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
        <div className="form">
          <h2>Reset Password</h2>
          <form className="register-form" onSubmit={handleSubmit}>
            <div className="input-box">
              <input
                type="text"
                name="password"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
                required
              />
            </div>
            <div className="input-box">
              <input
                type="text"
                name="confirm-password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                required
              />
            </div>
            <div>
              <button type="submit" name="reset-password-submit">
                Reset Password
              </button>
            </div>
          </form>
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

export default ResetPassword;
