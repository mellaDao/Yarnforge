import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import DOMPurify from "dompurify";
import parse from "html-react-parser";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ErrorMessages from "./ErrorMessages";

const ViewPattern = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { patternParameters, patternContent } = location.state || {};
  const [activeTabIndex, setActiveTabIndex] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);

  // sanitize the HTML content
  const sanitizedPatternContentHtml = DOMPurify.sanitize(patternContent);
  const sanitizedPatternParametersHtml = DOMPurify.sanitize(patternParameters);

  // parse the sanitized HTML into React elements
  const parsedPatternContent = parse(sanitizedPatternContentHtml);
  const parsedPatternParameters = parse(sanitizedPatternParametersHtml);

  function openGeneratedPatternTab(tabIndex) {
    setActiveTabIndex(tabIndex);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const username = localStorage.getItem("username");
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
                  style={{
                    backgroundColor:
                      activeTabIndex === 0 ? "#009c7a" : "#6E48D5",
                  }}
                  onClick={() => openGeneratedPatternTab(0)}
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
                  style={{
                    backgroundColor:
                      activeTabIndex === 1 ? "#009c7a" : "#6E48D5",
                  }}
                  onClick={() => openGeneratedPatternTab(1)}
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
      {/* error messages*/}
      <ErrorMessages errors={errors} />
    </div>
  );
};

export default ViewPattern;
