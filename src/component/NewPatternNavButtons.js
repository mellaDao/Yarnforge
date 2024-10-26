import React from "react";

const NewPatternNavButtons = ({ activeTabIndex, prevTab, nextTab }) => {
  return (
    <div className="navigation-buttons">
      <button id="reset-controls-btn">Reset Controls</button>

      <button
        id="backButton"
        style={{
          display: activeTabIndex === 0 ? "none" : "block",
        }}
        onClick={prevTab}
      >
        Back
      </button>
      <button
        id="nextButton"
        style={{
          display: activeTabIndex === 5 ? "none" : "block",
        }}
        onClick={nextTab}
      >
        Next
      </button>
    </div>
  );
};

export default NewPatternNavButtons;
