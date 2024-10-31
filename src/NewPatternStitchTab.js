import React from "react";

const NewPatternStitchTab = ({ formData, activeTabIndex, handleChange }) => {
  return (
    <div
      id="stitch"
      className="tabcontent"
      style={{
        display: activeTabIndex === 4 ? "block" : "none",
      }}
    >
      <h2>Stitch</h2>

      <p>Stockinette gauge</p>
      <div className="gauge-wrapper">
        <div className="form-row">
          <label>Yarn Weight:</label>
          <select
            name="yarnWeight"
            value={formData.yarnWeight}
            onChange={handleChange}
          >
            <option value="lace">Lace</option>
            <option value="fingering">Light Fingering</option>
            <option value="sport">Sport</option>
            <option value="dk">DK</option>
            <option value="worsted">Worsted</option>
            <option value="aran">Aran</option>
            <option value="bulky">Bulky</option>
            <option value="super Bulky">Super Bulky</option>
          </select>
        </div>
        <div className="form-row">
          <label>Number of Stitches</label>
          <input
            type="number"
            name="ststStitches"
            onChange={handleChange}
            defaultValue={formData.ststStitches}
          />
        </div>
        <div className="form-row">
          <label>Width (cm)</label>
          <input
            type="number"
            name="ststWidth"
            defaultValue={formData.ststWidth}
            onChange={handleChange}
          />
        </div>
        <div className="form-row">
          <label>Number of Rows</label>
          <input
            type="number"
            name="ststRows"
            defaultValue={formData.ststRows}
            onChange={handleChange}
          />
        </div>
        <div className="form-row">
          <label>Length (cm)</label>
          <input
            type="number"
            name="ststLength"
            defaultValue={formData.ststLength}
            onChange={handleChange}
          />
        </div>
        <div className="form-row">
          <label>Needle Size:</label>
          <select
            name="ststNeedleSize"
            value={formData.stStNeedleSize}
            onChange={handleChange}
          >
            <option value="US 0 / 2mm / UK 14">US 0 / 2mm / UK 14</option>
            <option value="2.25">US 1 / 2.25mm / UK 13</option>
            <option value="2.5">US 1.5 / 2.5mm / UK 12</option>
            <option value="2.75">US 2 / 2.75mm / UK 12</option>
            <option value="3">US 2.5 / 3mm / UK 11</option>
            <option value="3.25">US 3 / 3.25mm / UK 10</option>
            <option value="3.5">US 4 / 3.5mm / UK 9</option>
            <option value="3.75">US 5 / 3.75mm / UK 9</option>
            <option value="4">US 6 / 4mm / UK 8</option>
            <option value="4.5">US 7 / 4.5mm / UK 7</option>
            <option value="5">US 8 / 5mm / UK 6</option>
            <option value="5.5">US 9 / 5.5mm / UK 5</option>
            <option value="6">US 10 / 6mm / UK 4</option>
            <option value="6.5">US 10.5 / 6.5mm / UK 3</option>
            <option value="7">US 10.75 / 7mm / UK 2</option>
            <option value="8">US 11 / 8mm / UK 0</option>
            <option value="9">US 13 / 9mm / UK 00</option>
            <option value="10">US 15 / 10mm / UK 000</option>
          </select>
        </div>
      </div>
      <hr />
      <p>Rib gauge</p>
      <div className="gauge-wrapper">
        <div className="form-row">
          <label>Number of Stitches</label>
          <input
            type="number"
            name="ribStitches"
            defaultValue={formData.ribStitches}
            onChange={handleChange}
          />
        </div>
        <div className="form-row">
          <label>Width (cm)</label>
          <input
            type="number"
            name="ribWidth"
            defaultValue={formData.ribWidth}
            onChange={handleChange}
          />
        </div>
        <div className="form-row">
          <label>Number of Rows</label>
          <input
            type="number"
            name="ribRows"
            defaultValue={formData.ribRows}
            onChange={handleChange}
          />
        </div>
        <div className="form-row">
          <label>Length (cm)</label>
          <input
            type="number"
            name="ribLength"
            defaultValue={formData.ribLength}
            onChange={handleChange}
          />
        </div>
        <div className="form-row">
          <label>Needle Size:</label>
          <select
            name="ribNeedleSize"
            value={formData.ribNeedleSize}
            onChange={handleChange}
          >
            <option value="2">US 0 / 2mm / UK 14</option>
            <option value="2.25">US 1 / 2.25mm / UK 13</option>
            <option value="2.5">US 1.5 / 2.5mm / UK 12</option>
            <option value="2.75">US 2 / 2.75mm / UK 12</option>
            <option value="3">US 2.5 / 3mm / UK 11</option>
            <option value="3.25">US 3 / 3.25mm / UK 10</option>
            <option value="3.5">US 4 / 3.5mm / UK 9</option>
            <option value="3.75">US 5 / 3.75mm / UK 9</option>
            <option value="4">US 6 / 4mm / UK 8</option>
            <option value="4.5">US 7 / 4.5mm / UK 7</option>
            <option value="5">US 8 / 5mm / UK 6</option>
            <option value="5.5">US 9 / 5.5mm / UK 5</option>
            <option value="6">US 10 / 6mm / UK 4</option>
            <option value="6.5">US 10.5 / 6.5mm / UK 3</option>
            <option value="7">US 10.75 / 7mm / UK 2</option>
            <option value="8">US 11 / 8mm / UK 0</option>
            <option value="9">US 13 / 9mm / UK 00</option>
            <option value="10">US 15 / 10mm / UK 000</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default NewPatternStitchTab;
