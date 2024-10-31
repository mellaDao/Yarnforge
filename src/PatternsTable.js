import React from "react";

const PatternsTable = ({ patterns, handleViewPattern, confirmDelete }) => {
  return (
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
                  <button onClick={() => handleViewPattern(pattern.pattern_id)}>
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
  );
};

export default PatternsTable;
