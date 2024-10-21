import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const savedUsername = sessionStorage.getItem("usernameAutosave");
    const savedPassword = sessionStorage.getItem("passwordAutosave");

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
  }, []);

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
    sessionStorage.setItem(e.target.name + "Autosave", e.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:3001/validateLogin",
        formData
      );
      if (response.status === 200) {
        const { token, username, email } = response.data;
        // Store username and email into session storage
        localStorage.setItem("token", token);
        localStorage.setItem("username", username);
        localStorage.setItem("email", email);

        // Redirect to home after login
        window.location.href = "/";
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        setErrors(error.response.data.errors);
      } else {
        console.error("An error occurred:", error.message);
        setErrors(["An unexpected error occurred. Please try again."]);
      }
    } finally {
      setLoading(false); // Set loading to false regardless of success or failure
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
          <form className="login-form" method="post" onSubmit={handleSubmit}>
            <h2>Login</h2>
            <div className="input-box">
              <input
                type="text"
                id="username-field"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                rules={[
                  {
                    required: true,
                    message: "Please input your username",
                  },
                ]}
              />
            </div>
            <div className="input-box">
              <input
                name="password"
                id="password-field"
                type={showPassword ? "text" : "password"}
                className="form-control"
                placeholder="password"
                value={formData.password}
                onChange={handleChange}
                rules={[
                  {
                    required: true,
                    message: "Please input your password",
                  },
                ]}
              />
              <span
                className={`field-icon bx ${
                  showPassword ? "bx-show" : "bx-hide"
                }`}
                onClick={togglePasswordVisibility}
              ></span>
            </div>
            <div className="forgot-password">
              <Link to="/forgotPassword">Forgot Password?</Link>
            </div>
            <button type="submit" id="login-submit-button" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
            <p className="message">
              Not registered? <Link to="/register">Create an account</Link>
            </p>
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

export default Login;
