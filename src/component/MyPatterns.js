import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function MyPatterns() {
  const [patterns, setPatterns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const username = localStorage.getItem("username");

    console.log({ message: "from MyPatterns.js" }, username);
    if (!username) {
      navigate(`/login`);
    }
    // Fetch patterns when the component mounts
    async function fetchPatterns() {
      try {
        const response = await axios.post(
          "http://localhost:3001/fetchPatterns",
          { username }
        ); // Endpoint to get user patterns
        if (response.status === 200) {
          setPatterns(response.data.patterns);
        }
      } catch (error) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.errors
        ) {
          setErrors(error.response.data.errors);
        } else {
          console.error("An error occurred:", error.message);
          setErrors(["An unexpected error occurred. Please try again."]);
        }
      } finally {
        setLoading(false); // Set loading to false regardless of success or failure
      }
    }

    fetchPatterns();
  }, [navigate]);

  const confirmDelete = async (patternID, event) => {
    var deleteButton = event.target;

    // Change the text to confirmation message
    deleteButton.textContent = "Are you sure? ";
    deleteButton.style.color = "white";

    // Disable the "Are you sure?"" button and remove the underline/cursor styles"
    deleteButton.disabled = true;
    deleteButton.style.textDecoration = "none";
    deleteButton.style.cursor = "default";

    // Create yes and no buttons
    var yesConfirm = document.createElement("button");
    yesConfirm.textContent = "Yes";
    yesConfirm.style.color = "lightgray";
    yesConfirm.style.paddingLeft = "20px";

    var noConfirm = document.createElement("button");
    noConfirm.textContent = "No";
    noConfirm.style.color = "white";
    noConfirm.style.paddingLeft = "20px";

    // Add new buttons to parent node
    deleteButton.parentNode.appendChild(yesConfirm);
    deleteButton.parentNode.appendChild(noConfirm);

    // If user confirms the deletion, send patternID to helper function to handle deletion
    yesConfirm.onclick = async function () {
      await handleDelete(patternID);
    };

    noConfirm.onclick = function () {
      // Restore original text and reenable button
      deleteButton.textContent = "Delete Pattern";
      deleteButton.style.color = "red";
      deleteButton.disabled = false;
      // Add back the underline/cursor styles"
      deleteButton.style.textDecoration = "underline";
      deleteButton.style.cursor = "cursor";
      deleteButton.parentNode.removeChild(yesConfirm);
      deleteButton.parentNode.removeChild(noConfirm);
      return false; // Prevent default link behavior
    };
  };

  const handleDelete = async (patternID, event) => {
    try {
      await axios.post("http://localhost:3001/deletePattern", { patternID }); // Endpoint to delete a pattern
      // Refresh the patterns list
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
      }); // Endpoint to view a pattern
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
      <h2>Saved Patterns</h2>
      {loading && <p>Loading...</p>}
      <div className="error-message">
        {errors.map((error, index) => (
          <p key={index}>{error}</p>
        ))}
      </div>
      <div className="patterns-table">
        <table>
          <thead>
            <tr>
              <th>Date Created</th>
              <th>Pattern Name</th>
              <th>Created For</th>
              <th>View</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {patterns && patterns.length > 0 ? (
              patterns.map((pattern) => (
                <tr key={pattern.pattern_id}>
                  <td>{pattern.created_at}</td>
                  <td>{pattern.pattern_name || "N/A"}</td>
                  <td>{pattern.created_for || "N/A"}</td>
                  <td>
                    <button
                      onClick={() => handleViewPattern(pattern.pattern_id)}
                    >
                      View Pattern
                    </button>
                  </td>
                  <td>
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
