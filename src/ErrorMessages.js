import React from "react";

const ErrorMessages = ({ errors }) => {
  if (!errors || errors.length === 0) return null;
  return (
    <div className="error-message">
      {errors.map((error, index) => (
        <p key={index}>{error}</p>
      ))}
    </div>
  );
};

export default ErrorMessages;
