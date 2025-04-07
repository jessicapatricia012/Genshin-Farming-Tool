import React, { useState, useEffect } from "react";
import "./style/PickPanel.css";
import genshindb from 'genshin-db';
import Icon from "./Icon";

function PickWeapon({ weaponType, onSelectWeapon, selectedWeapon }) {

    const [weapons, setWeapons] = useState([]);
    const [loading, setLoading] = useState(true);
    // const [selectedWeapon, setSelectedWeapon] = useState(null); // State to store the selected weapon

    // console.log("Selected weapon:", selectedWeapon); // Log the selected weapon
    // console.log("Weapon type:", weaponType); // Log the weapon type


    useEffect(() => {
      setLoading(true);  
      try {
          const weapons = genshindb.weapons(weaponType, { matchCategories: true });
          if (Array.isArray(weapons)) {
              weapons.sort((a, b) => {
                  return genshindb.weapons(b).rarity - genshindb.weapons(a).rarity; // Sort in descending order
              });
              setWeapons(weapons);
          }
      } catch (error) {
          console.error("Error loading characters:", error);
      } finally {
          setLoading(false);  
      }
    }, [weaponType]); 

    const handleClick = (weapon) => {
        // If the same weapon is clicked again, unselect it, otherwise select the new weapon
        if (selectedWeapon === weapon) {
            // setSelectedWeapon(null);
            onSelectWeapon(null); // Unselect weapon
        } else {
            // setSelectedWeapon(weapon);
            onSelectWeapon(weapon); // Select the new weapon
        }
    };


  return (
    <div className="pickPanel">
      <div className="slideHeader" id="weaponSlideHeader">
        <input className="searchField" id="weaponSearchField" type="text" placeholder="Search" />
      </div>
      <div className="icons">
        {loading ? (
          <p>Loading weapons...</p>
        ) : (
            weapons.map((weapon, index) => (
            <div className={`icon ${selectedWeapon === weapon ? 'selected' : ''}`} 
            key={index} onClick={() => handleClick(weapon)}>              
              <Icon name={weapon} type="weapon" />
            </div>          
          ))
        )}
      </div>
    </div>
  );
}

export default PickWeapon;
