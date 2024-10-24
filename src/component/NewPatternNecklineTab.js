import React from "react";

const NewPatternNecklineTab = ({
  activeTabName,
  activeImageButtons,
  toggleImageButton,
}) => {
  return (
    <div
      id="neckline"
      className="tabcontent"
      style={{
        display: activeTabName === "neckline" ? "block" : "none",
      }}
    >
      <h2>Neckline</h2>

      <div className="image-button-wrapper-2x3">
        <button
          type="button"
          data-type="necklineType"
          className="image-button"
          value="Round-neck"
          style={{
            color:
              activeImageButtons.necklineType === "Round-neck" ? "#009c7a" : "",
          }}
          onClick={toggleImageButton}
        >
          <img src="/icons/round-neck.png" alt="Round-Neck" />
          <br></br>
          Round-neck
        </button>
        <button
          type="button"
          data-type="necklineType"
          className="image-button"
          value="Deep round-neck"
          style={{
            color:
              activeImageButtons.necklineType === "Deep round-neck"
                ? "#009c7a"
                : "",
          }}
          onClick={toggleImageButton}
        >
          <img src="/icons/round-neck-deep.png" alt="Deep round-neck" />
          <br></br>
          Deep round-neck
        </button>
        <button
          type="button"
          data-type="necklineType"
          className="image-button"
          value="V-neck"
          style={{
            color:
              activeImageButtons.necklineType === "V-neck" ? "#009c7a" : "",
          }}
          onClick={toggleImageButton}
        >
          <img src="/icons/v-neck.png" alt="V-neck" />
          <br></br>
          V-neck
        </button>
        <button
          type="button"
          data-type="necklineType"
          className="image-button"
          value="Deep V-neck"
          style={{
            color:
              activeImageButtons.necklineType === "Deep V-neck"
                ? "#009c7a"
                : "",
          }}
          onClick={toggleImageButton}
        >
          <img src="/icons/v-neck-deep.png" alt="Deep V-neck" />
          <br></br>
          Deep V-neck
        </button>
        <button
          type="button"
          data-type="necklineType"
          className="image-button"
          value="Square-neck"
          style={{
            color:
              activeImageButtons.necklineType === "Square-neck"
                ? "#009c7a"
                : "",
          }}
          onClick={toggleImageButton}
        >
          <img src="/icons/square-neck.png" alt="Square-Neck" />
          <br></br>
          Square-neck
        </button>
        <button
          type="button"
          data-type="necklineType"
          className="image-button"
          value="Straight-neck"
          style={{
            color:
              activeImageButtons.necklineType === "Straight-neck"
                ? "#009c7a"
                : "",
          }}
          onClick={toggleImageButton}
        >
          <img src="/icons/straight-neck.png" alt="Straight-Neck" />
          <br></br>
          Straight-neck
        </button>
      </div>
    </div>
  );
};

export default NewPatternNecklineTab;
