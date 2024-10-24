import React from "react";

const NewPatternClothingTypeTab = ({
  activeTabName,
  activeImageButtons,
  toggleImageButton,
}) => {
  return (
    <div
      id="clothing-type"
      className="tabcontent"
      style={{
        display: activeTabName === "clothing-type" ? "block" : "none",
      }}
    >
      <h2>Clothing Type</h2>
      <div className="image-button-wrapper-2x1">
        <button
          type="button"
          data-type="clothingType"
          className="image-button"
          value="Sweater"
          style={{
            color:
              activeImageButtons.clothingType === "Sweater" ? "#009c7a" : "",
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
          value="Dress"
          style={{
            color: activeImageButtons.clothingType === "Dress" ? "#009c7a" : "",
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
