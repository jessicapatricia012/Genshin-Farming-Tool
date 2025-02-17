import BuildCharsContainer from "./components/BuildCharsContainer";
import ToFarmComponent from "./components/ToFarmComponent";
import PickChar from "./components/PickChar"; 
import PickWeapon from "./components/PickWeapon";
import "./App.css";
import React, { useState, useEffect, useRef } from "react";



function App() {
  const [isCharacterPanelOpen, setIsCharacterPanelOpen] = useState(false);
  const [isWeaponPanelOpen, setIsWeaponPanelOpen] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [weaponType, setWeaponType] = useState(null);
  const [currentCharBoxId, setCurrentCharBoxId] = useState(null);

  const characterPanelRef = useRef(null); // Reference to the sliding panel
  const weaponPanelRef = useRef(null);


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (characterPanelRef.current && !characterPanelRef.current.contains(event.target)) {
        setIsCharacterPanelOpen(false);
      }
      if (weaponPanelRef.current && !weaponPanelRef.current.contains(event.target)) {
        setIsWeaponPanelOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  const handleCharacterSelect = (characterName) => {
    setSelectedCharacter(characterName);
    setIsCharacterPanelOpen(false); 
  };

  const openCharacterPanel = () => {
    setIsCharacterPanelOpen(true); 
  };

  const handleWeaponSelect = (weaponType) => {
    setWeaponType(weaponType);
    setIsWeaponPanelOpen(true);
  };

  const openWeaponPanel = (weaponType) => {
    console.log(weaponType);
    setWeaponType(weaponType);
    setIsWeaponPanelOpen(true);
  };

  return (
    <div id="App">
      <div className={`slidePanel ${isCharacterPanelOpen ? "shifted" : ""}`} ref={characterPanelRef}>
        <PickChar onSelectCharacter={handleCharacterSelect}></PickChar>
      </div>

      <div className={`slidePanel ${isWeaponPanelOpen ? "shifted" : ""}`} ref={weaponPanelRef}>
        <PickWeapon onSelectWeapon={handleWeaponSelect} weaponType={weaponType}/>
      </div>
      
      <div id="contentWrapper" className={isCharacterPanelOpen || isWeaponPanelOpen ? "shifted" : ""}>
        <div id="CharContainer">
          <div id="header">
            <h2>CHARACTERS</h2>
            <button id="addBtn" onClick={openCharacterPanel}>+</button>
          </div>
          <hr />
            <BuildCharsContainer 
            selectedCharacter={selectedCharacter}
            selectedWeapon={weaponType}
            onWeaponClick={openWeaponPanel}
            currentCharBoxId={currentCharBoxId}/>
        </div>
        <ToFarmComponent />
      </div>


      

    </div>

  );
}

export default App;
