import React from "react";

const NewPatternTabs = ({ activeTabName, openPatternTab }) => {
  return (
    <div className="tabs-wrapper">
      <button
        className="pattern-tab-links default-tab active"
        value="0"
        data-tab="clothing-type"
        onClick={() => openPatternTab("clothing-type", 0)}
        style={{
          backgroundColor:
            activeTabName === "clothing-type" ? "#009c7a" : "#6E48D5",
        }}
      >
        Clothing Type
      </button>
      <button
        className="pattern-tab-links"
        value="1"
        data-tab="neckline"
        onClick={() => openPatternTab("neckline", 1)}
        style={{
          backgroundColor: activeTabName === "neckline" ? "#009c7a" : "#6E48D5",
        }}
      >
        Neckline
      </button>
      <button
        className="pattern-tab-links"
        value="2"
        data-tab="sleeves"
        onClick={() => openPatternTab("sleeves", 2)}
        style={{
          backgroundColor: activeTabName === "sleeves" ? "#009c7a" : "#6E48D5",
        }}
      >
        Sleeves
      </button>
      <button
        className="pattern-tab-links"
        value="3"
        data-tab="size"
        onClick={() => openPatternTab("size", 3)}
        style={{
          backgroundColor: activeTabName === "size" ? "#009c7a" : "#6E48D5",
        }}
      >
        Size
      </button>
      <button
        className="pattern-tab-links"
        value="4"
        data-tab="stitch"
        onClick={() => openPatternTab("stitch", 4)}
        style={{
          backgroundColor: activeTabName === "stitch" ? "#009c7a" : "#6E48D5",
        }}
      >
        Stitch
      </button>
      <button
        className="pattern-tab-links"
        value="5"
        data-tab="description"
        onClick={() => openPatternTab("description", 5)}
        style={{
          backgroundColor:
            activeTabName === "description" ? "#009c7a" : "#6E48D5",
        }}
      >
        Description
      </button>
    </div>
  );
};

export default NewPatternTabs;
