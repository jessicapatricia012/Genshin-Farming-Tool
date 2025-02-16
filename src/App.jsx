import CharContainer from "./components/CharContainer";
import ToFarmComponent from "./components/ToFarmComponent";
import PickChar from "./components/PickChar"; 
import SlidingPanel from "./components/SlidingPanel";
import "./App.css";
import React, { useState } from "react";


function App() {
  const [isSlideIn, setIsSlideIn] = useState(false);

  const handleImageClick = () => {
    setIsSlideIn(true);  // Trigger the slide-in effect for PickChar
  };

  const handleClosePanel = () => {
    setIsSlideIn(false);  // Close the sliding panel
  };


  return (
    <div id="App">
      <div id="slidingPanel" className={isSlideIn ? "shifted" : ""}>
        <PickChar onClose={handleClosePanel}></PickChar>
      </div>
      

      <div id="contentWrapper" className={isSlideIn ? "shifted" : ""}>
        <CharContainer onImageClick={handleImageClick} />
        <ToFarmComponent />
      </div>

      

    </div>

  );
}

export default App;
