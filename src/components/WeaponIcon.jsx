import React, { useState, useEffect } from "react";
import "./style/WeaponIcon.css";
import { getDefaultWeapon } from '../fuctions/util.js';
import genshindb from 'genshin-db';

function WeaponIcon({ weaponType }) {

    const [weaponUrl, setWeaponUrl] = useState("");
    // console.log(weaponType);

    useEffect(() => {
        if (weaponType) {
            setWeaponUrl(getDefaultWeapon(weaponType));  // Set URL based on weaponType
        }
    }, [weaponType]);

    if (!weaponType) {
        return <div>Loading weapon...</div>;  // Show loading message if weaponType is not available
    }

    return (
        <div id="WeaponIcon">
            <div id="weaponImageBox">
                <img src={weaponUrl} alt={weaponType} />
            </div>
            {/* <div id="weaponNameBox">
                <p>{weaponType}</p>
            </div> */}
        </div>
    );
}

export default WeaponIcon;
