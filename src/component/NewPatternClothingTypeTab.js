import React from "react";

const NewPatternClothingTypeTab = ({
  activeTabIndex,
  activeImageButtons,
  toggleImageButton,
}) => {
  return (
    <div
      id="clothing-type"
      className="tabcontent"
      style={{
        display: activeTabIndex === 0 ? "block" : "none",
      }}
    >
      <h2>Clothing Type</h2>
      <div className="image-button-wrapper-2x1">
        <button
          type="button"
          data-type="clothingType"
          className="image-button"
          value="sweater"
          style={{
            color:
              activeImageButtons.clothingType === "sweater" ? "#009c7a" : "",
          }}
          onClick={toggleImageButton}
        >
          <img src="/icons/clothes-sweater.png" alt="Sweater" />
          <br></br>Sweater
        </button>
        <button
          type="button"
          data-type="clothingType"
          className="image-button"
          value="dress"
          style={{
            color: activeImageButtons.clothingType === "dress" ? "#009c7a" : "",
          }}
          onClick={toggleImageButton}
        >
          <img src="/icons/clothes-dress.png" alt="Dress" />
          <br></br>Dress
        </button>
      </div>
    </div>
  );
};

export default NewPatternClothingTypeTab;
