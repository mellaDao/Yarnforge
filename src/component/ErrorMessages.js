import React from "react";

const ErrorMessages = ({ errors }) => {
  return (
    <div className="error-message">
      {errors.map((error, index) => (
        <p key={index}>{error}</p>
      ))}
    </div>
  );
};

export default ErrorMessages;
