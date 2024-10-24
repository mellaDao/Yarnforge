import React from "react";

const NewPatternSleevesTab = ({
  activeTabName,
  activeImageButtons,
  handleChange,
  toggleImageButton,
}) => {
  return (
    <div
      id="sleeves"
      className="tabcontent"
      style={{
        display: activeTabName === "sleeves" ? "block" : "none",
      }}
    >
      <h2>Sleeves</h2>
      <p>Choose your sleeve style</p>
      <div className="options-wrapper">
        <div className="image-button-wrapper-3x1">
          <button
            type="button"
            data-type="sleeveType"
            className="image-button"
            value="Drop Sleeves"
            style={{
              color:
                activeImageButtons.sleeveType === "Drop Sleeves"
                  ? "#009c7a"
                  : "",
            }}
            onClick={toggleImageButton}
          >
            <img src="/icons/drop-sleeve.png" alt="Drop Sleeves" />
            <br></br>
            Drop Sleeves
          </button>
          <button
            type="button"
            data-type="sleeveType"
            className="image-button"
            value="Puff Sleeves"
            style={{
              color:
                activeImageButtons.sleeveType === "Puff Sleeves"
                  ? "#009c7a"
                  : "",
            }}
            onClick={toggleImageButton}
          >
            <img src="/icons/puff-sleeve.png" alt="Puff Sleeves" />
            <br></br>
            Puff Sleeves
          </button>
          <button
            type="button"
            data-type="sleeveType"
            className="image-button"
            value="Bishop Sleeves"
            style={{
              color:
                activeImageButtons.sleeveType === "Bishop Sleeves"
                  ? "#009c7a"
                  : "",
            }}
            onClick={toggleImageButton}
          >
            <img src="/icons/bishop-sleeve.png" alt="Bishop Sleeves" />
            <br></br>
            Bishop Sleeves
          </button>
        </div>

        <p>Choose your sleeve length</p>
        <input
          type="radio"
          id="sleeve-length-button1"
          name="sleeveLength"
          value="long"
          defaultChecked
          onChange={handleChange}
        />
        <label>Long</label>

        <input
          type="radio"
          id="sleeve-length-button3"
          name="sleeveLength"
          value="half"
          onChange={handleChange}
        />
        <label>Half</label>

        <input
          type="radio"
          id="sleeve-length-button4"
          name="sleeveLength"
          value="short"
          onChange={handleChange}
        />
        <label>Short</label>
      </div>
    </div>
  );
};

export default NewPatternSleevesTab;
