import React from "react";

const NewPatternNavButtons = ({ activeTabIndex, prevTab, nextTab }) => {
  return (
    <div className="navigation-buttons">
      <section id="reset-button-container">
        <button id="reset-controls-btn">Reset Controls</button>
      </section>
      <section id="next-back-button-container">
        <button
          id="backButton"
          style={{
            display: activeTabIndex === 0 ? "none" : "flex",
            "margin-left": activeTabIndex === 5 ? "0" : "",
            "margin-right": activeTabIndex === 5 ? "calc(100% - 55px)" : "",
          }}
          onClick={prevTab}
        >
          Back
        </button>
        <button
          id="nextButton"
          style={{
            display: activeTabIndex === 5 ? "none" : "flex",
            " margin-left": activeTabIndex === 0 ? "calc(100% - 55px)" : "",
            "margin-right": activeTabIndex === 0 ? "0" : "",
          }}
          onClick={nextTab}
        >
          Next
        </button>
      </section>
    </div>
  );
};

export default NewPatternNavButtons;
