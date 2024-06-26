import React from "react";
import { capitalizeFirstLetter } from "../utils";

const Sidebar = ({ isOpen, toggleSidebar, suggestions, onAccept}) => {
  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <button className="close-btn" onClick={toggleSidebar}>
        Close
      </button>
      {Object.keys(suggestions).map((sectionName) => (
        <div key={sectionName}>
          <h2>{capitalizeFirstLetter(sectionName)} Suggestions</h2>
          {suggestions[sectionName].length === 0 ? (
            <p>No suggestions</p>
          ) : (
            suggestions[sectionName].map((suggestion, index) => (
              <div key={index} className="suggestion">
                <p>{suggestion}</p>
                <button onClick={() => onAccept(sectionName, suggestion)}>
                  Accept
                </button>
              </div>
            ))
          )}
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
