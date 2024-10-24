import React from "react";

const NewPatternDescriptionTab = ({ activeTabName, handleChange }) => {
  return (
    <div
      id="description"
      className="tabcontent"
      style={{
        display: activeTabName === "description" ? "block" : "none",
      }}
    >
      <h2>Description</h2>
      <p>Add a description for your pattern</p>
      <div className="description-wrapper">
        <div className="form-row">
          <label>Name of your garment</label>
          <input
            type="text"
            name="garmentName"
            defaultValue="N/A"
            onChange={handleChange}
          />
        </div>
        <div className="form-row">
          <label>Created for</label>
          <input
            type="text"
            name="createdFor"
            defaultValue="N/A"
            onChange={handleChange}
          />
        </div>
        <div className="form-textarea">
          <label>Notes</label>
          <textarea
            name="notes"
            rows="10"
            cols="65"
            placeholder="Type a description for your garment here"
            onChange={handleChange}
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default NewPatternDescriptionTab;
