import React, { useState, useEffect } from "react";
import "./style/WeaponIcon.css";
import { getDefaultWeapon } from '../fuctions/util.js';
import genshindb from 'genshin-db';

function WeaponIcon({ type }) {
    const [weaponUrl, setWeaponUrl] = useState("");

    useEffect(() => {
        if (type) {
            setWeaponUrl(getDefaultWeapon(type));  // Set URL based on type
        }
    }, [type]);

    if (!type) {
        return <div>Loading weapon...</div>;  // Show loading message if type is not available
    }

    return (
        <div id="WeaponIcon">
            <div id="weaponImageBox">
                <img src={weaponUrl} alt={type} className={type === "artifact" ? "artifactImgHolder" : ""}/>
            </div>
            {/* <div id="weaponNameBox">
                <p>{type}</p>
            </div> */}
        </div>
    );
}

export default WeaponIcon;
