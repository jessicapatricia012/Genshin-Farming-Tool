import genshindb from 'genshin-db';

const elementUrls = {
    "Pyro" : "https://static.wikia.nocookie.net/gensin-impact/images/e/e8/Element_Pyro.png",
    "Hydro" : "https://static.wikia.nocookie.net/gensin-impact/images/3/35/Element_Hydro.png",
    "Cryo" : "https://static.wikia.nocookie.net/gensin-impact/images/8/88/Element_Cryo.png",
    "Electro" : "https://static.wikia.nocookie.net/gensin-impact/images/7/73/Element_Electro.png",
    "Geo" : "https://static.wikia.nocookie.net/gensin-impact/images/4/4a/Element_Geo.png",
    "Anemo" : "https://static.wikia.nocookie.net/gensin-impact/images/a/a4/Element_Anemo.png",
    "Dendro" : "https://static.wikia.nocookie.net/gensin-impact/images/f/f4/Element_Dendro.png",
};

const weaponTypeDefault = {
    "WEAPON_BOW" : "https://static.wikia.nocookie.net/gensin-impact/images/8/81/Icon_Bow.png",
    "WEAPON_SWORD_ONE_HAND" : "https://static.wikia.nocookie.net/gensin-impact/images/8/81/Icon_Sword.png",
    "WEAPON_POLE" : "https://static.wikia.nocookie.net/gensin-impact/images/6/6a/Icon_Polearm.png",
    "WEAPON_CATALYST" : "https://static.wikia.nocookie.net/gensin-impact/images/2/27/Icon_Catalyst.png",
    "WEAPON_CLAYMORE" : "https://static.wikia.nocookie.net/gensin-impact/images/6/66/Icon_Claymore.png",
};


export function getCharURL(characterName) {
    const fileNameIcon = genshindb.characters(characterName)?.images.filename_icon;
    return `https://gi.yatta.moe/assets/UI/${fileNameIcon}.png`;

};

export function getElementURL(characterName) {
    const element = genshindb.character(characterName)?.elementText;
    return elementUrls[element];
};

export const getBackground = (name, type) => {
    let rarity;
    if (type === "character"){
        rarity = genshindb.character(name)?.rarity;
    }
    else if (type === "weapon"){
        rarity= genshindb.weapons(name)?.rarity;
    } else {
        console.log(type);
        const list = genshindb.artifacts(name)?.rarityList;
        rarity = list[list.length-1]  
    }
    if (rarity === 5) {
        return "linear-gradient(150deg, #885734, #b77831 50%)"; 
    } else if (rarity === 4) {
        return "linear-gradient(150deg, #59598d, #a47bc6 80%)";
    } else if (rarity === 3) {
        return "linear-gradient(150deg, #585e83, rgb(106,152,188) 80%)";
    } else if (rarity === 2) {
        return "linear-gradient(150deg, #56666f, #638f83 80%)";
    } else if (rarity === 1) {
        return "linear-gradient(150deg, #665d74, #847d8b 80%)";
    }
    return "";
};

export const getHolderURL = (type) => {
    if (weaponTypeDefault[type]) // weapon
        return weaponTypeDefault[type];
    // artifact
    return 'https://static.wikia.nocookie.net/gensin-impact/images/6/6a/Icon_Inventory_Artifacts.png';
};

export function getWeaponURL(weaponName) {
    const fileNameIcon = genshindb.weapons(weaponName)?.images.filename_icon;
    return `https://gi.yatta.moe/assets/UI/${fileNameIcon}.png`;
};

export function getArtifactURL(name) {
    return genshindb.artifacts(name)?.images.flower;
};