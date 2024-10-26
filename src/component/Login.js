import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ErrorMessages from "./ErrorMessages";
import axios from "axios";

function Login() {
  /* store username and password into form data, initialize as empty*/
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  /* define states for errors, loading, and showPassword*/
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  /* retrieve autosaved username and password from session storage*/
  useEffect(() => {
    const savedUsername = sessionStorage.getItem("usernameAutosave");
    const savedPassword = sessionStorage.getItem("passwordAutosave");

    /* if there is a saved username, then set formdata's username to it*/
    if (savedUsername) {
      setFormData((prevData) => ({
        ...prevData,
        username: savedUsername,
      }));
    }

    /* if there is a saved password, then set formdata's password to it*/
    if (savedPassword) {
      setFormData((prevData) => ({
        ...prevData,
        password: savedPassword,
      }));
    }
  }, []);

  /* on change for input box, update username and password in session storage*/
  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
    sessionStorage.setItem(e.target.name + "Autosave", e.target.value);
  };

  /* on click, toggle password text visibility*/
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  /* on form submission*/
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
        // store username and email into session storage
        localStorage.setItem("token", token);
        localStorage.setItem("username", username);
        localStorage.setItem("email", email);

        // redirect to home after login
        window.location.href = "/";
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        // set errors
        setErrors(error.response.data.errors);
      } else {
        console.error("An error occurred:", error.message);
        setErrors(["An unexpected error occurred. Please try again."]);
      }
    } finally {
      setLoading(false); // set loading to false regardless of success or failure
    }
  }

  return (
    <section id="body-style-light">
      <section id="brand-heading">
        <h1>
          <Link to="/" id="return-home-btn">
            YarnForge
          </Link>
        </h1>
      </section>

      <div className="auth-page">
        <div className="form">
          {/* login form*/}
          <form className="login-form" method="post" onSubmit={handleSubmit}>
            <h2>Login</h2>
            {/* input box for username*/}
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

            {/* input box for password*/}
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

              {/* toggle icon for password visibility*/}
              <span
                className={`field-icon bx ${
                  showPassword ? "bx-show" : "bx-hide"
                }`}
                onClick={togglePasswordVisibility}
              ></span>
            </div>

            {/* forgot password link, redirects to forgotPassword page*/}
            <div className="forgot-password">
              <Link to="/forgotPassword">Forgot Password?</Link>
            </div>

            {/* submit form button, change button text depending on loading state*/}
            <button type="submit" id="login-submit-button" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>

            {/* register link, redirects to register page*/}
            <p className="message">
              Not registered? <Link to="/register">Create an account</Link>
            </p>
          </form>

          {/* error message container*/}
          <ErrorMessages errors={errors} />
        </div>
      </div>
    </section>
  );
}

export default Login;
