import React, { useState, useEffect } from "react";
import "./style/PickChar.css";
import CharIcon from "./CharIcon";
import genshindb from 'genshin-db';

function PickChar({ onClose }) {
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


  return (
    <div className="pickChar">
      <button onClick={onClose}>Close</button>
      <div id="icons">
        {loading ? (
          <p>Loading characters...</p>
        ) : (
          characters.map((character, index) => (
            <CharIcon key={index} character={character} />
          ))
        )}
      </div>
    </div>
  );
}

export default PickChar;
