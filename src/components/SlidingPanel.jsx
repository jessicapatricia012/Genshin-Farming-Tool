import React from "react";
import "./style/SlidingPanel.css"; // CSS for sliding effect

function SlidingPanel({ onImageClick, isSlideIn }) {
  return (
    <div className={`slidingPanel ${isSlideIn ? "active" : ""}`}>
      <button onClick={onClose}>Close</button>
      <p>Content for the sliding panel goes here.</p>
    </div>
  );
}

export default SlidingPanel;
