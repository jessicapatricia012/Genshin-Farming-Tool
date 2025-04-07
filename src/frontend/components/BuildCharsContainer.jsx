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

function BuildCharsContainer({  charComponents, setCharComponents, onWeaponClick, onArtifactClick, selectedCharacterToAdd }) {

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

  useEffect(() => {
    if (selectedCharacterToAdd) {
      addCharBox(); // Add the character when a new one is selected
    }
  }, [selectedCharacterToAdd]);
  
  const addCharBox = () => {
    setCharComponents(prevChars => [...prevChars, selectedCharacterToAdd]);  
  };

  const handleRemoveCharBox = (id) => {
    setCharComponents(prevChars => prevChars.filter(char => char.getId() !== id));
  };

  return (
      <div id="charsDiv">
        <DndContext sensors={sensors} onDragEnd={handleDragEnd} onDragMove={handleDragMove} collisionDetection={closestCorners}>
          <SortableContext items={charComponents} strategy={verticalListSortingStrategy}>
            {charComponents.map((character) => (
              <CharBox
                key = {character.id}
                character = {character}
                id = {character.id}
                onRemove={handleRemoveCharBox}
                onWeaponClick={onWeaponClick}
                onArtifactClick={onArtifactClick}
              />
          ))}
          </SortableContext>
        </DndContext>
      </div>
  )
}


function CharBox({ character, id, onRemove,  onWeaponClick, onArtifactClick  }) {
  const {attributes, listeners, setNodeRef, transform, transition} = useSortable({id})
  const talentMaterial = character.talentMaterial;
  const ascensionMaterial = character.ascensionMaterial;
  const weaponType = character.weaponType;
  const weaponMaterial = character.weapon?.ascensionMaterial;
  const artifactSet = character.artifactSet;
  console.log(character.weapon);
  console.log(character.weapon.ascensionMaterial);

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  }

  // console.log("CHARACTER: ", artifactSet);
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
        <Icon name={character.name} type="character"></Icon>
      </div>

      <div className="otherIcon" id="weaponIcon" onClick={() => { onWeaponClick(weaponType, id); }}>
          {character.weapon ? (
            <img 
              id="selectedWeaponImg"
              src={getWeaponURL(character.weapon)} 
              alt={character.weapon} 
              style={ {background : getBackground(character.weapon,"weapon") }} />  // If selectedWeapon, display Icon for weapon
          ) : (
            <WeaponArtifactHolder key={weaponType} type={weaponType} />  // Otherwise, display WeaponIcon for character's weapon
          )}
      </div>

      <div className="otherIcon" id="artifactIcon" onClick={() => { 
          onArtifactClick(id);
          }}>
          {artifactSet?.length > 0 ? (
        <>
            {artifactSet[0] && (
                <img id="artifactImg1"
                    src={artifactSet[0].imageUrl} 
                    alt={artifactSet[0].name} 
                    style={{ background: getBackground(artifactSet[0].name, "artifact") }} 
                />
            )}
            {artifactSet[1] && (
                <img id="artifactImg2"
                    src={artifactSet[1].imageUrl} 
                    alt={artifactSet[1].name} 
                    style={{ background: getBackground(artifactSet[1].name, "artifact") }} 
                />
            )}
        </>
          ) : (
            <WeaponArtifactHolder  type={"artifact"} />          
          )}
      </div>

      <div id="checkBoxes">
        <label>
          <input type="checkbox" className="custom-checkbox" />
          {ascensionMaterial}
        </label>
        <label>
          <input type="checkbox" className="custom-checkbox" />
          {character.weapon ? character.weapon?.ascensionMaterial : "[weapon material]"}
        </label>
        <label>
          <input type="checkbox" className="custom-checkbox" />
          {artifactSet ? artifactSet[0]?.name : "[artifact]"}
        </label>
        <label>
          <input type="checkbox" className="custom-checkbox" />
          {talentMaterial}
        </label>
      </div>
    </div>
  );
}



export default BuildCharsContainer
