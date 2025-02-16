import React, { useState } from 'react'
import './style/CharContainer.css';
import CharBox from './CharBox.jsx';


function CharContainer({ onImageClick }) {
  const [charComponents, setCharComponents] = useState([]);

  const addChar = () => {
    setCharComponents([...charComponents, <CharBox key={charComponents.length} onImageClick={onImageClick}/>]);
  };

  return (
    <div id="CharContainer">
      <div id="header">
        <h2>CHARACTERS</h2>
        <button id="addBtn" onClick={addChar}>+</button>
        
      </div>
      <hr />

      <div id="charsDiv">
        <br />
        {charComponents}
      </div>
    </div>
    
  )
}


export default CharContainer
