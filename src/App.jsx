import BuildCharsContainer from "./components/BuildCharsContainer";
import ToFarmComponent from "./components/ToFarmComponent";
import PickChar from "./components/PickChar"; 
import PickWeapon from "./components/PickWeapon";
import PickArtifact from "./components/PickArtifact";
import "./App.css";
import React, { useState, useEffect, useRef } from "react";


function App() {
  const [isCharacterPanelOpen, setIsCharacterPanelOpen] = useState(false);
  const [isWeaponPanelOpen, setIsWeaponPanelOpen] = useState(false);
  const [isArtifactPanelOpen, setIsArtifactPanelOpen] = useState(false);
  
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [weaponType, setWeaponType] = useState(null);
  const [currentCharBoxId, setCurrentCharBoxId] = useState(null);

  const [charComponents, setCharComponents] = useState([]);

  const characterPanelRef = useRef(null); // Reference to the sliding panel
  const weaponPanelRef = useRef(null);
  const artifactPanelRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (characterPanelRef.current && !characterPanelRef.current.contains(event.target)) {
        setIsCharacterPanelOpen(false);
      }
      if (weaponPanelRef.current && !weaponPanelRef.current.contains(event.target)) {
        setIsWeaponPanelOpen(false);
      }
      if (artifactPanelRef.current && !artifactPanelRef.current.contains(event.target)) {
        setIsArtifactPanelOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  // CHARACTER HANDLER
  const handleCharacterSelect = (characterName) => {
    setSelectedCharacter(characterName);
    setIsCharacterPanelOpen(false); 
  };
  const openCharacterPanel = () => {
    setIsCharacterPanelOpen(true); 
  };

  //WEAPON HANDLER
  const handleWeaponSelect = (weaponName) => {
    setCharComponents(prevChars =>
      prevChars.map(char =>
        char.id === currentCharBoxId ? { ...char, weapon: weaponName } : char
      )
    );
  };
  const openWeaponPanel = (weaponType, charId) => {
    setCurrentCharBoxId(charId);
    setWeaponType(weaponType);
    setIsWeaponPanelOpen(true);
  };

  // ARTIFACTS HANDLER
  const handleArtifactSelect = (selectedArtifacts) => {
    setCharComponents(prevChars =>
      prevChars.map(char =>
        char.id === currentCharBoxId ? { ...char, artifacts: selectedArtifacts } : char
      )
    );
  };
  const openArtifactPanel = (charId) => {
    setCurrentCharBoxId(charId);
    setIsArtifactPanelOpen(true);
  };


  return (
    <div id="App">
      <div className={`slidePanel ${isCharacterPanelOpen ? "shifted" : ""}`} ref={characterPanelRef}>
        <PickChar onSelectCharacter={handleCharacterSelect} charComponents={charComponents}></PickChar>
      </div>

      <div className={`slidePanel ${isWeaponPanelOpen ? "shifted" : ""}`} ref={weaponPanelRef}>
        <PickWeapon onSelectWeapon={handleWeaponSelect} weaponType={weaponType}
        selectedWeapon={charComponents.find((char) => char.id === currentCharBoxId)?.weapon || null}/>
      </div>

      <div className={`slidePanel ${isArtifactPanelOpen ? "shifted" : ""}`} ref={artifactPanelRef}>
        <PickArtifact onSelectArtifact={handleArtifactSelect}
        selectedArtifacts={charComponents.find((char) => char.id === currentCharBoxId)?.artifacts || []}/>
      </div>
      
      <div id="contentWrapper" className={isCharacterPanelOpen || isWeaponPanelOpen || isArtifactPanelOpen ? "shifted" : ""}>
        <div id="CharContainer">
          <div id="header">
            <h2>CHARACTERS</h2>
            <button id="addBtn" onClick={openCharacterPanel}>+</button>
          </div>
          <hr />
            <BuildCharsContainer 
            charComponents={charComponents} 
            setCharComponents={setCharComponents}
            selectedCharacter={selectedCharacter}
            onWeaponClick={openWeaponPanel}
            onArtifactClick={openArtifactPanel}/>
        </div>
        <ToFarmComponent />
      </div>
    </div>
  );
}

export default App;
