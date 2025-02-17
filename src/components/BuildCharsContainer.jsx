import React, { useState, useEffect } from 'react'
import './style/BuildCharsContainer.css';
import './style/CharBox.css';
import Icon from './Icon';
import WeaponIcon from './WeaponIcon';
import { closestCorners, DndContext, useSensor, useSensors, PointerSensor } from '@dnd-kit/core';
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
// import CharBox from './CharBox.jsx';
import genshindb, { characters } from 'genshin-db';



function BuildCharsContainer({ onWeaponClick, onImageClick, selectedCharacter, selectedWeapon, currentCharBoxId}) {
  const [charComponents, setCharComponents] = useState([]);
  const character = genshindb.characters(selectedCharacter);
  // console.log(character.id);
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { delay: 150},
    })
  );
  
  const addCharBox = () => {
    const existingChar = charComponents.find(char => char.id === character.id); // Check if the character already exists
  
    if (!existingChar) {
      // If the character doesn't exist, add it to the list
      setCharComponents([
        ...charComponents,
        { id: character.id, name: selectedCharacter, char: character}, // Add the new character with its ID and name
      ]);
    }
  };

  const handleRemoveCharBox = (id) => {
    console.log("Removing ID:", id);  // Debug log
    setCharComponents((prevComponents) => {
      const updatedComponents = prevComponents.filter((char) => char.id !== id);
      // console.log("Updated Components:", updatedComponents);  // Debug log
      return updatedComponents;
    });
  };
  const handleDragMove = (event) => {
    if (!event || !event.active || !event.over) {
      return; // Exit early if the event is malformed
    }
  };

  useEffect(() => {
    if (selectedCharacter) {
      addCharBox(); // Add the character when a new one is selected
    }
  }, [selectedCharacter]);



  const getBoxPos = (id) => charComponents.findIndex(box =>
    box.id === id )

  const handleDragEnd = (event) => {
    const {active, over} = event;
    if(!active || !over || active.id == over.id) return;
    setCharComponents(boxes => {
      const originalPos = getBoxPos(active.id);
      const newPos = getBoxPos(over.id);
      return arrayMove(boxes, originalPos, newPos);
    })
  }

  return (
      <div id="charsDiv">
        <DndContext sensors={sensors} onDragEnd={handleDragEnd} onDragMove={handleDragMove} collisionDetection={closestCorners}>
        
          <SortableContext items={charComponents} strategy={verticalListSortingStrategy}>
            {charComponents.map((charBox) => (
              <CharBox
                key = {charBox.id}
                id = {charBox.id}
                selectedCharacter={charBox.name}
                isSelected={currentCharBoxId === charBox.id}
                charName={charBox.name}
                char={charBox.char}
                onRemove={handleRemoveCharBox}
                onWeaponClick={onWeaponClick}
              />
          ))}
          </SortableContext>
        </DndContext>

      </div>
  )
}


function CharBox({ id, selectedCharacter, isSelected, char, charName, onRemove,  onWeaponClick }) {
  const {attributes, listeners, setNodeRef, transform, transition} = useSortable({id})
  const talentName = genshindb.talents(charName).costs.lvl2[1].name;
  const ascMaterial = genshindb.characters(charName).costs.ascend2[1].name;
  const weaponType = genshindb.characters(charName)?.weaponType;
  // console.log(weaponType);

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  }

  useEffect(() => {
    if (charName) {
      // console.log(charName); 
      // console.log("a");
    }
  }, [charName]);

  const handleWeaponClick = () => {

  }

  return (
    <div className="charBox" ref ={setNodeRef} style={style} {...attributes} {...listeners}>
      <i 
        className="fa-solid fa-xmark" 
        onClick={(e) => {
          e.stopPropagation();  // Prevents event bubbling
          onRemove(id);  // Remove the character
        }}
      ></i>

      <div id="charImage">
        <Icon name={charName} type="character"></Icon>
      </div>

      <div id="weaponIcon" onClick={() => { onWeaponClick(weaponType)}}>
        <WeaponIcon key={weaponType} weaponType={weaponType} ></WeaponIcon>
      </div>

    
      <div id="checkBoxes">
        <label>
          <input type="checkbox" className="custom-checkbox" />
          {ascMaterial}
        </label>
        <label>
          <input type="checkbox" className="custom-checkbox" />
          weapon material
        </label>
        <label>
          <input type="checkbox" className="custom-checkbox" />
          artifact
        </label>
        <label>
          <input type="checkbox" className="custom-checkbox" />
          {talentName}
        </label>
      </div>

      {/* <i className="fa-solid fa-grip-lines"></i> */}
    </div>
  );
}



export default BuildCharsContainer
