import React from "react";
import { useNavigate } from "react-router-dom";

function Account() {
  const username = localStorage.getItem("username");
  const email = localStorage.getItem("email");
  const navigate = useNavigate();

  const handleResetPassword = () => {
    // clicking get started button will navigate user to new pattern page
    navigate("/ResetPassword");
  };

  const handleLogout = () => {
    // clear the local storage
    localStorage.clear();
    // redirect to the home page after logout
    navigate("/");
  };

  return (
    <section id="body-style-dark">
      <section className="general-main-content">
        {/* display user's info (username and email only) */}
        <section id="account-info">
          <h2>Account Information</h2>
          <p>
            <strong>Username:</strong> {username}
          </p>
          <p>
            <strong>Email:</strong> {email}
          </p>
        </section>

        <section id="divider"></section>

        <section id="account-actions">
          {/* account actions section */}
          <h2>Account Actions</h2>
          <p>
            {/* logout button */}
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          </p>
          <p>
            {/* reset password button */}
            <button onClick={handleResetPassword} className="logout-button">
              Reset Password
            </button>
          </p>
        </section>
      </section>
    </section>
  );
}

export default Account;
