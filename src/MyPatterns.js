import React, { useState, useEffect } from "react";
import axios from "axios";
import PatternsTable from "./PatternsTable";
import ErrorMessages from "./ErrorMessages";
import { useNavigate } from "react-router-dom";
import MyPatternsDropdown from "./MyPatternsDropdown";

function MyPatterns() {
  const [patterns, setPatterns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState([]);
  const [sortedBy, setSortedBy] = useState({
    type: "Date Created",
    direction: "north",
  });
  const [isVisible, setVisible] = useState(false);
  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  useEffect(() => {
    // if there is no username, redirect to login page
    if (!username) {
      navigate(`/login`);
    }

    // fetch patterns when the component mounts
    async function fetchPatterns() {
      try {
        const response = await axios.post(
          "http://localhost:3001/fetchPatterns",
          {
            username,
          }
        ); // endpoint to get user patterns
        if (response.status === 200) {
          setPatterns(response.data.patterns);
        }
      } catch (error) {
        const errorMessages = error.response?.data?.errors || [error.message];
        setErrors(
          errorMessages.map((err) =>
            typeof err === "string" ? err : JSON.stringify(err)
          )
        );
      } finally {
        setLoading(false); // set loading to false regardless of success or failure
      }
    }

    fetchPatterns();
  }, [navigate, username]);

  // function to confirm deletion of a pattern
  const confirmDelete = async (patternID, event) => {
    var deleteButton = event.target;

    // change the text to confirmation message
    deleteButton.textContent = "Are you sure? ";
    deleteButton.style.color = "white";

    // disable the "Are you sure?"" button and remove the underline/cursor styles"
    deleteButton.disabled = true;
    deleteButton.style.textDecoration = "none";
    deleteButton.style.cursor = "default";

    // create yes and no buttons
    var yesConfirm = document.createElement("button");
    yesConfirm.textContent = "Yes";
    yesConfirm.style.color = "lightgray";
    yesConfirm.style.paddingLeft = "20px";

    var noConfirm = document.createElement("button");
    noConfirm.textContent = "No";
    noConfirm.style.color = "white";
    noConfirm.style.paddingLeft = "20px";

    // add new buttons to parent node
    deleteButton.parentNode.appendChild(yesConfirm);
    deleteButton.parentNode.appendChild(noConfirm);

    // if user confirms the deletion, send patternID to helper function to handle deletion
    yesConfirm.onclick = async function () {
      await handleDelete(patternID);
    };

    noConfirm.onclick = function () {
      // restore original text and reenable button
      deleteButton.textContent = "Delete Pattern";
      deleteButton.style.color = "red";
      deleteButton.disabled = false;
      // add back the underline/cursor styles"
      deleteButton.style.textDecoration = "underline";
      deleteButton.style.cursor = "cursor";
      deleteButton.parentNode.removeChild(yesConfirm);
      deleteButton.parentNode.removeChild(noConfirm);
      return false; // prevent default link behavior
    };
  };

  const handleDelete = async (patternID, event) => {
    try {
      await axios.post("http://localhost:3001/deletePattern", { patternID }); // endpoint to delete a pattern
      // pefresh the patterns list
      setPatterns(
        patterns.filter((pattern) => pattern.pattern_id !== patternID)
      );
    } catch (err) {
      console.error(err);
      setErrors(["Failed to delete pattern"]);
    }
  };

  const handleViewPattern = async (patternID) => {
    try {
      const response = await axios.post("http://localhost:3001/viewPattern", {
        patternID,
      }); // endpoint to view a pattern
      if (response.status === 200) {
        const { patternContent, patternParameters } = response.data;
        navigate("/viewPattern", {
          state: { patternContent, patternParameters },
        });
      }
    } catch (err) {
      console.error(err);
      setErrors(["Failed to view pattern"]);
    }
  };

  const toggleDropdown = () => {
    setVisible(!isVisible);
  };

  const handleSort = async (type, direction, typeSQL, directionSQL) => {
    setSortedBy({ type, direction });
    setVisible(!isVisible);

    try {
      const response = await axios.post("http://localhost:3001/sortPatterns", {
        username,
        type: typeSQL,
        direction: directionSQL,
      }); // endpoint to view a pattern
      if (response.status === 200) {
        setPatterns(response.data.patterns);
      }
    } catch (err) {
      console.error(err);
      setErrors(["Failed to sort patterns"]);
    }
  };

  return (
    <section className="general-main-content">
      {/* my patterns title*/}
      <h2>Saved Patterns</h2>
      {/* display loading status*/}
      {loading && <p>Loading...</p>}
      <MyPatternsDropdown
        toggleDropdown={toggleDropdown}
        sortedBy={sortedBy}
        handleSort={handleSort}
        isVisible={isVisible}
      />
      <ErrorMessages errors={errors} />
      <PatternsTable
        patterns={patterns}
        handleViewPattern={handleViewPattern}
        confirmDelete={confirmDelete}
      />
    </section>
  );
}

export default MyPatterns;
