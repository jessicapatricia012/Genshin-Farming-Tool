import React, { useState, useEffect } from "react";
import "./style/PickPanel.css";
import genshindb from 'genshin-db';
import WeaponIcon from "./WeaponIcon";
import Icon from "./Icon";

function PickWeapon({ weaponType, onSelectWeapon }) {

    const [weapons, setWeapons] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);  
        try {
            const weapons = genshindb.weapons(weaponType, { matchCategories: true });
            if (Array.isArray(weapons)) 
                setWeapons(weapons);
        } catch (error) {
            console.error("Error loading characters:", error);
        } finally {
            setLoading(false);  
        }
      }, [weaponType]); 

    const handleClick = (weapon) => {
        onSelectWeapon(weapon); 
    };

    console.log(genshindb.weapons("Cashflow").images);

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
            <div className="icon" key={index} onClick={() => handleClick(weapon)}>
              <Icon name={weapon} type="weapon" />
            </div>          
          ))
        )}
      </div>
    </div>
  );
}

export default PickWeapon;
