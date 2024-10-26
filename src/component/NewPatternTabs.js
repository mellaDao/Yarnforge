import React from "react";

const NewPatternTabs = ({ activeTabIndex, openPatternTab }) => {
  return (
    <div className="tabs-wrapper">
      <button
        className="pattern-tab-links default-tab active"
        value="0"
        data-tab="clothing-type"
        onClick={() => openPatternTab(0)}
        style={{
          backgroundColor: activeTabIndex === 0 ? "#009c7a" : "#6E48D5",
        }}
      >
        Clothing Type
      </button>
      <button
        className="pattern-tab-links"
        value="1"
        data-tab="neckline"
        onClick={() => openPatternTab(1)}
        style={{
          backgroundColor: activeTabIndex === 1 ? "#009c7a" : "#6E48D5",
        }}
      >
        Neckline
      </button>
      <button
        className="pattern-tab-links"
        value="2"
        data-tab="sleeves"
        onClick={() => openPatternTab(2)}
        style={{
          backgroundColor: activeTabIndex === 2 ? "#009c7a" : "#6E48D5",
        }}
      >
        Sleeves
      </button>
      <button
        className="pattern-tab-links"
        value="3"
        data-tab="size"
        onClick={() => openPatternTab(3)}
        style={{
          backgroundColor: activeTabIndex === 3 ? "#009c7a" : "#6E48D5",
        }}
      >
        Size
      </button>
      <button
        className="pattern-tab-links"
        value="4"
        data-tab="stitch"
        onClick={() => openPatternTab(4)}
        style={{
          backgroundColor: activeTabIndex === 4 ? "#009c7a" : "#6E48D5",
        }}
      >
        Stitch
      </button>
      <button
        className="pattern-tab-links"
        value="5"
        data-tab="description"
        onClick={() => openPatternTab(5)}
        style={{
          backgroundColor: activeTabIndex === 5 ? "#009c7a" : "#6E48D5",
        }}
      >
        Description
      </button>
    </div>
  );
};

export default NewPatternTabs;
