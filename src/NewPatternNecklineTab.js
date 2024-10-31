import React from "react";

const NewPatternNecklineTab = ({
  activeTabIndex,
  activeImageButtons,
  toggleImageButton,
}) => {
  return (
    <div
      id="neckline"
      className="tabcontent"
      style={{
        display: activeTabIndex === 1 ? "block" : "none",
      }}
    >
      <h2>Neckline</h2>
      <p>Choose your neckline style</p>
      <div className="image-button-wrapper-2x3">
        <button
          type="button"
          data-type="necklineType"
          className="image-button"
          value="round-neck"
          style={{
            color:
              activeImageButtons.necklineType === "round-neck" ? "#009c7a" : "",
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
          value="deep-round-neck"
          style={{
            color:
              activeImageButtons.necklineType === "deep-round-neck"
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
          value="v-neck"
          style={{
            color:
              activeImageButtons.necklineType === "v-neck" ? "#009c7a" : "",
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
          value="deep-v-neck"
          style={{
            color:
              activeImageButtons.necklineType === "deep-v-neck"
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
          value="square-neck"
          style={{
            color:
              activeImageButtons.necklineType === "square-neck"
                ? "#009c7a"
                : "",
          }}
          onClick={toggleImageButton}
        >
          <img src="/icons/square-neck.png" alt="square-Neck" />
          <br></br>
          Square-neck
        </button>
        <button
          type="button"
          data-type="necklineType"
          className="image-button"
          value="straight-neck"
          style={{
            color:
              activeImageButtons.necklineType === "straight-neck"
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
