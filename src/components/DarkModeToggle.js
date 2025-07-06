import React from "react";
import "../styles/DarkModeToggle.css";

export default function DarkModeToggle({ darkMode, setDarkMode }) {
  return (
    <div className="darkmode-toggle">
      <button
        className={`toggle-btn ${darkMode ? "active" : ""}`}
        onClick={() => setDarkMode(!darkMode)}
        aria-label="Toggle Dark Mode"
      >
        <span className="icon">
          {darkMode ? "🌙" : "☀️"}
        </span>
      </button>
    </div>
  );
}
