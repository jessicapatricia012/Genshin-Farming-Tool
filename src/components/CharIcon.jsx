import React from "react";
import "./style/CharIcon.css";
import genshindb from 'genshin-db';

function CharIcon({ character }) {
    console.log(character);
    const rarity = genshindb.characters(character).rarity

    // Set the background color based on rarity
    let backgroundColor = '';
    if (rarity === 5) {
        backgroundColor = 'yellow';
    } else if (rarity === 4) {
        backgroundColor = 'purple';
    }
    // console.log(name);
    // Image URL
    let imageUrl = `https://static-genshin.aza.gg/UI/UI_AvatarIcon_Kaeya.webp`;
    try{
        imageUrl = `https://static-genshin.aza.gg/UI/UI_AvatarIcon_${character}.webp`;
    } catch{

    }

    return (
        <div id="CharIcon" style={{ backgroundColor }}>
        <div id="imageBox">
            <img src={imageUrl} alt={character} />
        </div>
        <div id="nameBox">
            <h4>{character}</h4>
        </div>
        </div>
    );
}

export default CharIcon;
