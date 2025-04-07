import React, { useEffect } from 'react'
import './style/BuildCharsContainer.css';
import './style/CharBox.css';
import Icon from './Icon';
import WeaponArtifactHolder from './WeaponArtifactHolder';
import { closestCorners, DndContext, useSensor, useSensors, PointerSensor } from '@dnd-kit/core';
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { getWeaponURL, getBackground, getArtifactURL } from '../../fuctions/util';
import genshindb from 'genshin-db';

function BuildCharsContainer({  charComponents, setCharComponents, onWeaponClick, onArtifactClick, selectedCharacter }) {
  const character = genshindb.characters(selectedCharacter);

  // DND KIT STUFF
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { delay: 150 } })
  );
  const handleDragMove = (event) => {
    if (!event || !event.active || !event.over) return;
  };
  const getBoxPos = (id) => charComponents.findIndex(box =>
    box.id === id )
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!active || !over || active.id === over.id) return;
    setCharComponents((boxes) => {
      const originalPos = getBoxPos(active.id);
      const newPos = getBoxPos(over.id);
      return arrayMove(boxes, originalPos, newPos);
    });
  }
  
  const addCharBox = () => {
    const existingChar = charComponents.find(char => char.id === character.id); // Check if the character already exists
  
    if (!existingChar) {
      setCharComponents([
        ...charComponents,
        { id: character.id, name: selectedCharacter, char: character, weapon: null, artifacts: []}, // Add the new character with its ID and name
      ]);
    }
  };

  const handleRemoveCharBox = (id) => {
    setCharComponents(prevComponents => prevComponents.filter(char => char.id !== id));
  };

  useEffect(() => {
    if (selectedCharacter) {
      addCharBox(); // Add the character when a new one is selected
    }
  }, [selectedCharacter]);
  
  return (
      <div id="charsDiv">
        <DndContext sensors={sensors} onDragEnd={handleDragEnd} onDragMove={handleDragMove} collisionDetection={closestCorners}>
          <SortableContext items={charComponents} strategy={verticalListSortingStrategy}>
            {charComponents.map((charBox) => (
              <CharBox
                key = {charBox.id}
                id = {charBox.id}
                charName={charBox.name}
                onRemove={handleRemoveCharBox}
                onWeaponClick={onWeaponClick}
                onArtifactClick={onArtifactClick}
                weaponName={charBox.weapon} 
                artifacts={charBox.artifacts}
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
    </div>
  );
}



export default BuildCharsContainer
