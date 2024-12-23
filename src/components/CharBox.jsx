import React, { useState } from "react";
import "./style/CharBox.css";
import genshin from "genshin-db";

function CharBox() {
  return (
    <div className="charBox">
      <div id="charImage">foto</div>

      <div id="checkBoxes">
        <label>
          <input type="checkbox" className="custom-checkbox" />
          ascension material
        </label>
        <label>
          <input type="checkbox" className="custom-checkbox" />
          weapon material
        </label>
        <label>
          <input type="checkbox" className="custom-checkbox" />
          artifact
        </label>
        <label>
          <input type="checkbox" className="custom-checkbox" />
          talent
        </label>
      </div>

      <i className="fa-solid fa-grip-lines"></i>
    </div>
  );
}

export default CharBox;
