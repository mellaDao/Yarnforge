import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const savedUsername = sessionStorage.getItem("usernameAutosave");
    const savedPassword = sessionStorage.getItem("passwordAutosave");
    const savedConfirmPassword = sessionStorage.getItem(
      "confirmPasswordAutosave"
    );
    const savedEmail = sessionStorage.getItem("emailAutosave");

    if (savedUsername) {
      setFormData((prevData) => ({
        ...prevData,
        username: savedUsername,
      }));
    }

    if (savedPassword) {
      setFormData((prevData) => ({
        ...prevData,
        password: savedPassword,
      }));
    }

    if (savedConfirmPassword) {
      setFormData((prevData) => ({
        ...prevData,
        confirmPassword: savedConfirmPassword,
      }));
    }

    if (savedEmail) {
      setFormData((prevData) => ({
        ...prevData,
        email: savedEmail,
      }));
    }
  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
    sessionStorage.setItem(e.target.name + "Autosave", e.target.value);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:3001/validateRegistration",
        formData
      );
      if (response.status === 200) {
        /* If successful response, redirect user to login page*/

        navigate(`/login`);
      }
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data && error.response.data.errors) {
        setErrors(error.response.data.errors);
      } else {
        setErrors(["Failed to register. Try again later."]);
      }
    } finally {
      setLoading(false);
    }
  }

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
          <form
            className="register-form"
            onSubmit={handleSubmit}
            action="/Register"
            method="POST"
          >
            <h2>Register</h2>
            <div className="input-box">
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                required
                onChange={handleChange}
              />
            </div>
            <div className="input-box">
              <input
                name="password"
                id="password-field"
                type={showPassword ? "text" : "password"}
                className="form-control"
                placeholder="Password"
                value={formData.password}
                required
                onChange={handleChange}
              />
              <span
                className={`field-icon bx ${
                  showPassword ? "bx-show" : "bx-hide"
                }`}
                onClick={togglePasswordVisibility}
              ></span>
            </div>
            <div className="input-box">
              <input
                id="confirm-password-field"
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                className="form-control"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                required
                onChange={handleChange}
              />
            </div>
            <div className="input-box">
              <input
                type="text"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                required
                onChange={handleChange}
              />
            </div>
            <button
              type="submit"
              id="register-submit-button"
              disabled={loading}
            >
              {loading ? "Creating..." : "Create"}
            </button>
            <p className="message">
              Already registered? <Link to="/login">Sign In</Link>
            </p>
          </form>
          {errors.length > 0 && (
            <div className="error-message">
              {errors.map((error, index) => (
                <p key={index}>{error}</p>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Register;
