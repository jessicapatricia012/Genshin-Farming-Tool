import BuildCharsContainer from "./components/BuildCharsContainer";
import ToFarmComponent from "./components/ToFarmComponent";
import PickChar from "./components/PickChar"; 
import "./App.css";
import React, { useState } from "react";
import { closestCorners, DndContext } from '@dnd-kit/core';



function App() {
  
  const [isSlideIn, setIsSlideIn] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [currentCharBoxId, setCurrentCharBoxId] = useState(null);

  // const handleImageClick = (charBoxId) => {
  //   setIsSlideIn(true);
  //   setCurrentCharBoxId(charBoxId); // Remember which CharBox was clicked
  //   console.log(currentCharBoxId);
  // };

  const handleClosePanel = () => {
    setIsSlideIn(false);  // Close the sliding panel
  };

  const handleCharacterSelect = (characterName) => {
    setSelectedCharacter(characterName);
    setIsSlideIn(false); // Close the panel after selecting
    console.log(characterName);
  };

  const handleAddCharClick = () => {
    setSelectedCharacter(null);
    setIsSlideIn(true); // Show the sliding panel when "+" button is clicked
  };

  const openSlide = () => {
    setIsSlideIn(true); // Show the sliding panel when "+" button is clicked
  };


  return (
    <div id="App">
      <div id="slidingPanel" className={isSlideIn ? "shifted" : ""}>
        <PickChar onClose={handleClosePanel} onSelectCharacter={handleCharacterSelect}></PickChar>
      </div>
      
      <div id="contentWrapper" className={isSlideIn ? "shifted" : ""}>
        <div id="CharContainer">
          <div id="header">
            <h2>CHARACTERS</h2>
            <button id="addBtn" onClick={openSlide}>+</button>
          </div>
          <hr />
            <BuildCharsContainer 
            selectedCharacter={selectedCharacter}
            currentCharBoxId={currentCharBoxId}/>
          
        </div>
        <ToFarmComponent />
      </div>


      

    </div>

  );
}

export default App;
