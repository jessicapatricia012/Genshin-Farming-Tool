import React, { useState, useEffect } from "react";
import "./style/WeaponArtifactHolder.css";
import { getHolderURL } from '../../fuctions/util.js';

function WeaponArtifactHolder({ type }) {
    const [weaponArtifactUrl, setWeaponArtifactUrl] = useState("");

    useEffect(() => {
        if (type) {
            setWeaponArtifactUrl(getHolderURL(type));  // Set URL based on type
        }
    }, [type]);

    return (
        <div id="WeaponArtifactHolder">
            <div id="imageHolderBox">
                <img src={weaponArtifactUrl} alt={type} className={type === "artifact" ? "artifactImgHolder" : ""}/>
            </div>
        </div>
    );
}

export default WeaponArtifactHolder;
