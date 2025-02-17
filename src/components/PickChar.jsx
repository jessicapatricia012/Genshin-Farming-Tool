import React, { useState, useEffect } from "react";
import "./style/PickPanel.css";
import Icon from "./Icon";
import genshindb from 'genshin-db';

function PickChar({ onSelectCharacter }) {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);  
    try {
      const charactersName = genshindb.characters('names', { matchCategories: true });
      setCharacters(charactersName);
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
            <div className="icon" key={index} onClick={() => handleClick(character)}>
              <Icon name={character} type="character" />
            </div>          
          ))
        )}
      </div>
    </div>
  );
}

export default PickChar;
