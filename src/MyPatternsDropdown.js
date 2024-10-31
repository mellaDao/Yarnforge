import React from "react";

const MyPatternsDropdown = ({
  toggleDropdown,
  sortedBy,
  handleSort,
  isVisible,
}) => {
  return (
    <div className="dropdown">
      <button onClick={toggleDropdown} className="dropbtn">
        <section id="dropbtn-left">
          Sorted by {sortedBy.type}
          <span className="material-symbols-outlined">
            {sortedBy.direction}
          </span>
        </section>
        <section id="dropbtn-right">
          <span className="material-symbols-outlined">keyboard_arrow_down</span>
        </section>
      </button>
      <div
        id="myDropdown"
        className="dropdown-content"
        style={{
          display: isVisible === true ? "flex" : "none",
        }}
      >
        <button
          className="date-created-ascending"
          onClick={() =>
            handleSort("Date created", "north", "created_at", "ASC")
          }
        >
          <section>
            Date Created
            <span className="material-symbols-outlined">north</span>
          </section>
        </button>

        <button
          className="date-created-descending"
          onClick={() =>
            handleSort("Date created", "south", "created_at", "DESC")
          }
        >
          <section>
            Date Created
            <span className="material-symbols-outlined">south</span>
          </section>
        </button>

        <button
          className="name-ascending"
          onClick={() => handleSort("Name (A-Z)", "", "pattern_name", "ASC")}
        >
          Name (A-Z)
        </button>

        <button
          className="name-descending"
          onClick={() => handleSort("Name (Z-A)", "", "pattern_name", "DESC")}
        >
          Name (Z-A)
        </button>

        <button
          className="created-for-ascending"
          onClick={() =>
            handleSort("Created For (A-Z)", "", "created_for", "ASC")
          }
        >
          Created For (A-Z)
        </button>

        <button
          className="created-for-descending"
          onClick={() =>
            handleSort("Created For (Z-A)", "", "created_for", "DESC")
          }
        >
          Created For (Z-A)
        </button>
      </div>
    </div>
  );
};

export default MyPatternsDropdown;
