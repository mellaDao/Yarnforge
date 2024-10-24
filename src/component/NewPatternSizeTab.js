import React from "react";

const NewPatternSizeTab = ({ activeTabName, handleChange }) => {
  return (
    <div
      id="size"
      className="tabcontent"
      style={{
        display: activeTabName === "size" ? "block" : "none",
      }}
    >
      <h2>Size</h2>
      <div className="options-wrapper">
        <p>Choose a baseline size</p>
        <select id="size-dropdown" name="size-dropdown" onChange={handleChange}>
          <option value="xs" name="size" data-bust="32" data-waist="24">
            XS
          </option>
          <option value="s" name="size" data-bust="36" data-waist="28">
            S
          </option>
          <option value="m" name="size" data-bust="40" data-waist="32">
            M
          </option>
          <option value="l" name="size" data-bust="44" data-waist="36">
            L
          </option>
          <option value="xl" name="size" data-bust="48" data-waist="40">
            XL
          </option>
          <option value="2xl" name="size" data-bust="52" data-waist="44">
            2XL
          </option>
          <option value="3xl" name="size" data-bust="56" data-waist="48">
            3XL
          </option>
        </select>
        <hr />

        <p>Select a fitting</p>
        <input type="radio" name="fit" value="Petite" onChange={handleChange} />
        <label>Petite</label>
        <input
          type="radio"
          name="fit"
          value="Regular"
          defaultChecked
          onChange={handleChange}
        />
        <label>Regular</label>
        <input type="radio" name="fit" value="Tall" onChange={handleChange} />
        <label>Tall</label>
      </div>
    </div>
  );
};

export default NewPatternSizeTab;
