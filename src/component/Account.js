import React from "react";

function Account() {
  const username = localStorage.getItem("username");
  const email = localStorage.getItem("email");
  const handleLogout = () => {
    // Clear the local storage
    localStorage.clear();
    // Redirect to the home page after logout
    window.location.href = "/";
  };
  return (
    <section id="body-style1">
      <section className="general-main-content">
        {/* Display user's info (username and email only) */}
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
          <h2>Account Actions</h2>
          <p>
            {/* Logout button */}
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          </p>
          <p>
            {/* Reset password button */}
            <a
              href={`reset_password.php?email=${encodeURIComponent(
                email
              )}&logged_in=true`}
              className="reset-password-button"
            >
              Reset Password
            </a>
          </p>
        </section>
      </section>
    </section>
  );
}

export default Account;
