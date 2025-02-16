import React, { useState } from "react";
import "./style/CharIcon.css";
import { getCharURL,getElementURL, getBackground } from '../fuctions/util.js';
import genshindb from 'genshin-db';

function CharIcon({ characterName }) {
    const [imageUrl, setImageUrl] = useState(getCharURL(characterName));
    const [elementUrl, setElementUrl] = useState(getElementURL(characterName));
    const background = getBackground(characterName);

    return (
        <div id="CharIcon">
            <div id="imageBox" style={{ background }}>
                <img id="element" src={elementUrl} alt="element"></img>
                <img src={imageUrl} alt={characterName} />
            </div>
            <div id="nameBox">
                <p>{characterName}</p>
            </div>
        </div>
    );
}

export default CharIcon;
