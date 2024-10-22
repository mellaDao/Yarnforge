import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function MyPatterns() {
  const [patterns, setPatterns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // when component mounts, get username from local storage
    const username = localStorage.getItem("username");

    // if there is no username, redirect to login page
    if (!username) {
      navigate(`/login`);
    }

    // fetch patterns when the component mounts
    async function fetchPatterns() {
      try {
        const response = await axios.post(
          "http://localhost:3001/fetchPatterns",
          { username }
        ); // endpoint to get user patterns
        if (response.status === 200) {
          setPatterns(response.data.patterns);
        }
      } catch (error) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.errors
        ) {
          // set errors
          setErrors(error.response.data.errors);
        } else {
          console.error("An error occurred:", error.message);
          setErrors(["An unexpected error occurred. Please try again."]);
        }
      } finally {
        setLoading(false); // set loading to false regardless of success or failure
      }
    }

    fetchPatterns();
  }, [navigate]);

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

  return (
    <section className="general-main-content">
      {/* my patterns title*/}
      <h2>Saved Patterns</h2>
      {/* display loading status*/}
      {loading && <p>Loading...</p>}

      {/* display all errors that occurred*/}
      <div className="error-message">
        {errors.map((error, index) => (
          <p key={index}>{error}</p>
        ))}
      </div>

      {/* display user's saved patterns in a table*/}
      <div className="patterns-table">
        <table>
          <thead>
            <tr>
              {/* table columns*/}
              <th>Date Created</th>
              <th>Pattern Name</th>
              <th>Created For</th>
              <th>View</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {/* loop through and display patterns if there are patterns*/}
            {patterns && patterns.length > 0 ? (
              patterns.map((pattern) => (
                <tr key={pattern.pattern_id}>
                  <td>{pattern.created_at}</td>
                  <td>{pattern.pattern_name || "N/A"}</td>
                  <td>{pattern.created_for || "N/A"}</td>
                  <td>
                    {/* on view pattern button click, pass pattern id to handleViewPattern function*/}
                    <button
                      onClick={() => handleViewPattern(pattern.pattern_id)}
                    >
                      View Pattern
                    </button>
                  </td>
                  <td>
                    {/* on delete pattern button click, pass pattern id and event to confirmDelete function*/}
                    <button
                      onClick={(event) =>
                        confirmDelete(pattern.pattern_id, event)
                      }
                    >
                      Delete Pattern
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                {/* display a simple message if no patterns are found*/}
                <td colSpan="5">No patterns found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default MyPatterns;
