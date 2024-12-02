import React from 'react'
import './CharComponent.css';


function NewCharComponent() {
  return (
    <div>
      <h3>New Character Added!</h3>
      <p>This is a new character component.</p>
    </div>
  );
}



function CharComponent() {
  const addChar = () => {
    NewCharComponent()
  };

  return (
      <div id="charComponent">
      <h2>CHARACTERS</h2>
      <button id="addBtn" onClick={addChar}>+</button>
      {<NewCharComponent />}

      <hr />
    </div>
    
  )
}


export default CharComponent
