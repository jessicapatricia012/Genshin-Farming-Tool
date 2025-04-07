import React, { useState, useEffect } from "react";
import "./style/Icon.css";
import { getCharURL,getElementURL, getBackground, getWeaponURL, getArtifactURL } from '../../fuctions/util.js';

function Icon({ name, type }) {
    const [imageUrl, setImageUrl] = useState("");
    const [elementUrl, setElementUrl] = useState(type === 'character' ? getElementURL(name) : null); // Only for characters
    const [background, setBackground] = useState("");
    useEffect(() => {
        if (type === 'character')
            setImageUrl(getCharURL(name));
        else if (type === 'weapon')
            setImageUrl(getWeaponURL(name));
        else if (type === 'artifact')
            setImageUrl(getArtifactURL(name));
    }, [name, type]);

    useEffect(() => {
        setBackground(getBackground(name, type));
    }, [name, type]);

    return (
        <div id="Icon">
            <div id="imageBox" style={{ background }}>
                {type === 'character' && <img id="element" src={elementUrl} alt="element" />} {/* Show element image for characters */}
                <img src={imageUrl} alt={name}/>
            </div>
            <div id="nameBox">
                <p>{name}</p>
            </div>
        </div>
    );
}

export default Icon;
