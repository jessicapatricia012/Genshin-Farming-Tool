import React, { useState, useEffect } from "react";
import "./style/PickPanel.css";
import Icon from "./Icon";
import genshindb from 'genshin-db';

function PickChar({ onSelectCharacter, charComponents }) {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);  
    try {
      let characterNames = genshindb.characters('names', { matchCategories: true });
      const excludedCharacters = ["Lumine"];
      characterNames = characterNames.filter(character => !excludedCharacters.includes(character));
      characterNames.sort((a, b) => {
                          return genshindb.characters(b).rarity - genshindb.characters(a).rarity; // Sort in descending order
                      });
      setCharacters(characterNames);
    } catch (error) {
      console.error("Error loading characters:", error);
    } finally {
      setLoading(false);  
    }
  }, []); 

  const handleClick = (characterName) => {
    onSelectCharacter(characterName); 
  };

  return (
    <div className="pickPanel">
      <div className="slideHeader" id="charSlideHeader">
        <input className="searchField" id="charSearchField" type="text" placeholder="Search" />
      </div>
      <div className="icons">
        {loading ? (
          <p>Loading characters...</p>
        ) : (
          characters.map((character, index) => (
            <div 
              className={`icon ${charComponents.some((component) => component.name === character) ? 'disabled' : ''}`}             
              key={index} 
              onClick={() => handleClick(character)}>
                <Icon name={character} type="character" />
            </div>          
          ))
        )}
      </div>
    </div>
  );
}

export default PickChar;
