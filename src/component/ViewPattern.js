import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import DOMPurify from "dompurify";
import parse from "html-react-parser";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ViewPattern = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { patternContent, patternParameters } = location.state || {};
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  // sanitize the HTML content
  const sanitizedPatternContentHtml = DOMPurify.sanitize(patternContent);
  const sanitizedPatternParametersHtml = DOMPurify.sanitize(patternParameters);

  // parse the sanitized HTML into React elements
  const parsedPatternContent = parse(sanitizedPatternContentHtml);
  const parsedPatternParameters = parse(sanitizedPatternParametersHtml);

  function openGeneratedPatternTab(evt, tabName) {
    // get all tab contents and hide them
    var tabContents = document.querySelectorAll(".tabcontent");
    tabContents.forEach(function (content) {
      content.classList.remove("active");
    });

    // get all tab links and remove the 'active' class
    var tabLinks = document.querySelectorAll(
      ".generated-pattern-tab-links button"
    );
    tabLinks.forEach(function (link) {
      link.classList.remove("active");
      link.style.backgroundColor = "#6E48D5";
    });

    // show the clicked tab content
    var activeTabContent = document.getElementById(tabName);
    activeTabContent.classList.add("active");

    // add 'active' class to the clicked tab button
    evt.currentTarget.classList.add("active");
    evt.currentTarget.style.backgroundColor = "#009c7a";
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const username = localStorage.getItem("username");
    console.log({ message: "from viewPatterns.js" }, username);
    if (!username) {
      navigate(`/login`);
    }
    try {
      setLoading(true);
      const response = await axios.post("http://localhost:3001/savePattern", {
        patternContent,
        patternParameters,
        username,
      });
      if (response.status === 200) {
        /* if successful response, redirect user to my patterns page*/
        navigate(`/myPatterns`);
      }
    } catch (error) {
      console.error(error.response.data.errors);
      setErrors(error.response.data.errors);
    } finally {
      setLoading(false); // set loading to false regardless of success or failure
    }
  }

  return (
    <div className="generated-pattern-container">
      {/* tabs for the form */}
      <div className="tabs-wrapper">
        <ul className="generated-pattern-tab-links">
          <li>
            <span className="generated-pattern-tab">
              <h2>
                {/* pattern parameters tab, on click, open this tab*/}
                <button
                  onClick={(event) =>
                    openGeneratedPatternTab(event, "pattern-parameters")
                  }
                >
                  Pattern Parameters
                </button>
              </h2>
            </span>
          </li>
          <li>
            {/* pattern instructions tab, on click, open this tab*/}
            <span className="generated-pattern-tab active">
              <h2>
                <button
                  onClick={(event) => openGeneratedPatternTab(event, "pattern")}
                  style={{ backgroundColor: "var(--link-hover-color)" }}
                >
                  Pattern
                </button>
              </h2>
            </span>
          </li>
        </ul>
      </div>

      <section id="divider"></section>

      <div className="pattern-main-content">
        {/* pattern Parameters */}
        <div id="pattern-parameters" className="tabcontent">
          {parsedPatternParameters}
        </div>

        {/* pattern Content */}
        <div id="pattern" className="tabcontent active">
          {parsedPatternContent}
        </div>
      </div>

      <section id="divider"></section>

      <div className="save-pattern-container">
        {/* save pattern form, show loading based on state */}
        <form id="save-pattern-form" onSubmit={handleSubmit}>
          <p>(Must be logged in to save)</p>
          <button type="submit" id="sve-pattern-button" disabled={loading}>
            {loading ? "Saving Pattern..." : "Save Pattern"}
          </button>
        </form>
      </div>
      <section id="divider"></section>
      {/* error messages */}
      <div className="error-message">
        {errors.map((error, index) => (
          <p key={index}>{error}</p>
        ))}
      </div>
    </div>
  );
};

export default ViewPattern;
