import React, { useEffect } from 'react'
import './style/BuildCharsContainer.css';
import './style/CharBox.css';
import Icon from './Icon';
import WeaponArtifactHolder from './WeaponArtifactHolder';
import { closestCorners, DndContext, useSensor, useSensors, PointerSensor } from '@dnd-kit/core';
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import genshindb from 'genshin-db';
import { getWeaponURL, getBackground, getArtifactURL } from '../fuctions/util';

function BuildCharsContainer({  charComponents, setCharComponents, onWeaponClick, onArtifactClick, toAddCharacterName }) {

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { delay: 150},
    })
  );
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
  const handleDragMove = (event) => {
    if (!event || !event.active || !event.over) return;
  };



  useEffect(() => {
    if (toAddCharacterName) {
      const character = genshindb.characters(toAddCharacterName);
      saveCharacter(character); // Add the character when a new one is selected
    }
  }, [toAddCharacterName]);
  

  const handleRemoveCharBox = (id) => {
    setCharComponents(prevComponents => prevComponents.filter(char => char.id !== id));
    removeCharacter(id);

  };

  const saveCharacter = async (character) => {
    try {
      const response = await fetch('http://localhost:5000/api/characters', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({id: character.id, name: toAddCharacterName, weapon: null, artifacts: []}),
      });
  
      if (!response.ok) {
        throw new Error('Failed to save character');
      }
  
      const newCharacter = await response.json();
      setCharComponents((prevChars) => [...prevChars, newCharacter]);  // Update state
    } catch (err) {
      console.error('Error saving character:', err);
    }
  }; 
  
  const removeCharacter = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/characters/${id}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete character');
      }
  
      setCharComponents(prevComponents => prevComponents.filter(char => char.id !== id));

    } catch (err) {
      console.error('Error deleting character:', err);
    }
  };

  

  return (
      <div id="charsDiv">
        <DndContext sensors={sensors} onDragEnd={handleDragEnd} onDragMove={handleDragMove} collisionDetection={closestCorners}>
        
          <SortableContext items={charComponents} strategy={verticalListSortingStrategy}>
            {charComponents.map((char) => (
              <CharBox
                key = {char.id}
                id = {char.id}
                charName={char.name}
                onRemove={handleRemoveCharBox}
                onWeaponClick={onWeaponClick}
                onArtifactClick={onArtifactClick}
                weaponName={char.weapon} 
                artifacts={char.artifacts}
              />
          ))}
          </SortableContext>
        </DndContext>

      </div>
  )
}


function CharBox({ id, weaponName, charName, artifacts, onRemove,  onWeaponClick, onArtifactClick }) {
  const {attributes, listeners, setNodeRef, transform, transition} = useSortable({id})
  const talentName = genshindb.talents(charName).costs.lvl2[1].name;
  const ascMaterial = genshindb.characters(charName).costs.ascend2[1].name;
  const weaponType = genshindb.characters(charName)?.weaponType;
  const weaponMaterial = genshindb.weapons(weaponName)?.costs.ascend2[1].name;

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  }
  console.log(artifacts);

  return (
    <div className="charBox" ref ={setNodeRef} style={style} {...attributes} {...listeners}>
      <i 
        className="fa-solid fa-xmark" 
        onClick={(e) => {
          e.stopPropagation();  // Prevents event bubbling
          onRemove(id);  // Remove the character
        }}
      ></i>

      <div id="charIcon">
        <Icon name={charName} type="character"></Icon>
      </div>

      <div className="otherIcon" id="weaponIcon" onClick={() => { 
          // setCurrentCharBoxId(id); // Remember which character was clicked
          onWeaponClick(weaponType, id);
          }}>
          {weaponName ? (
            <img 
              id="selectedWeaponImg"
              src={getWeaponURL(weaponName)} 
              alt={weaponName} 
              style={ {background : getBackground(weaponName,"weapon") }} />  // If selectedWeapon, display Icon for weapon
          ) : (
            <WeaponArtifactHolder key={weaponType} type={weaponType} />  // Otherwise, display WeaponIcon for character's weapon
          )}
      </div>

      <div className="otherIcon" id="artifactIcon" onClick={() => { 
          // setCurrentCharBoxId(id); // Remember which character was clicked
          onArtifactClick(id);
          }}>
          {artifacts.length > 0 ? (
        <>
            {artifacts[0] && (
                <img id="artifactImg1"
                    key={artifacts[0]} // Add key for proper reconciliation
                    src={getArtifactURL(artifacts[0])} 
                    alt={artifacts[0]} 
                    style={{ background: getBackground(artifacts[0], "artifact") }} 
                />
            )}
            {artifacts[1] && (
                <img id="artifactImg2"
                    key={artifacts[1]} // Add key for proper reconciliation
                    src={getArtifactURL(artifacts[1])} 
                    alt={artifacts[1]} 
                    style={{ background: getBackground(artifacts[1], "artifact") }} 
                />
            )}
        </>
          ) : (
            <WeaponArtifactHolder key={artifacts[0]} type={"artifact"} />          
          )}
      </div>

      <div id="checkBoxes">
        <label>
          <input type="checkbox" className="custom-checkbox" />
          {ascMaterial}
        </label>
        <label>
          <input type="checkbox" className="custom-checkbox" />
          {weaponName ? weaponMaterial : "[weapon material]"}
        </label>
        <label>
          <input type="checkbox" className="custom-checkbox" />
          {artifacts ? artifacts[0] : "[artifact]"}
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
