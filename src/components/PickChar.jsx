import React, { useState, useEffect } from "react";
import "./style/PickChar.css";
import CharIcon from "./CharIcon";
import genshindb from 'genshin-db';

function PickChar({ onClose, onSelectCharacter }) {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      // Fetching character names and rarity from genshin-db
      const charactersName = genshindb.characters('names', { matchCategories: true });
      setCharacters(charactersName);
      setLoading(false);
    } catch (error) {
      console.error("Error loading characters:", error);
      setLoading(false);
    }
  }, []);

  const handleClick = (characterName) => {
    onSelectCharacter(characterName); 
    // console.log(characterName);
  };

  return (
    <div className="pickChar">
      <button onClick={onClose}>X</button>
      <div id="icons">
        {loading ? (
          <p>Loading characters...</p>
        ) : (
          characters.map((character, index) => (
            <div id="icon" key={index} onClick={() => handleClick(character)}>
              <CharIcon characterName={character} />
            </div>          
          ))
        )}
      </div>
    </div>
  );
}

export default PickChar;
