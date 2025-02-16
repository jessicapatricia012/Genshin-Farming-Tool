import genshindb from 'genshin-db';

const nameMapping = {
    "Jean" : "Qin",
    "Aether" : "PlayerBoy",
    "Amber" : "Ambor",
    "Alhaitham" : "Alhatham",
    "Baizhu" : "Baizhuer",
    "Hu Tao" : "Hutao",
    "Kirara" : "Momoka",
    "Lan Yan" : "Lanyan",
    "Lumine" : "PlayerGirl",
    "Lynette" : "Linette",
    "Lyney" : "Liney",
    "Noelle" : "Noel",
    "Ororon" : "Olorun",
    "Raiden Shogun" : "Shougun",
    "Shikanoin Heizou" : "Heizo",
    "Thoma" : "Tohma",
    "Xianyun" : "Liuyun",
    "Yae Miko" : "Yae",
    "Yanfei" : "Feiyan",
    "Yun Jin" : "Yunjin",
};

const elementUrls = {
    "Pyro" : "https://static.wikia.nocookie.net/gensin-impact/images/e/e8/Element_Pyro.png",
    "Hydro" : "https://static.wikia.nocookie.net/gensin-impact/images/3/35/Element_Hydro.png",
    "Cryo" : "https://static.wikia.nocookie.net/gensin-impact/images/8/88/Element_Cryo.png",
    "Electro" : "https://static.wikia.nocookie.net/gensin-impact/images/7/73/Element_Electro.png",
    "Geo" : "https://static.wikia.nocookie.net/gensin-impact/images/4/4a/Element_Geo.png",
    "Anemo" : "https://static.wikia.nocookie.net/gensin-impact/images/a/a4/Element_Anemo.png",
    "Dendro" : "https://static.wikia.nocookie.net/gensin-impact/images/f/f4/Element_Dendro.png",
};

export function getCharURL(characterName) {
    const mappedName = nameMapping[characterName];
    if (mappedName) {
        return `https://static-genshin.aza.gg/UI/UI_AvatarIcon_${mappedName}.webp`;
    } else {
        return `https://static-genshin.aza.gg/UI/UI_AvatarIcon_${characterName.split(" ").pop()}.webp`;
    }
};

export function getElementURL(characterName) {
    const element = genshindb.character(characterName)?.elementText;
    return elementUrls[element];
};

export const getBackground = (characterName) => {
    const rarity = genshindb.character(characterName)?.rarity;

    if (rarity === 5) {
        return "linear-gradient(150deg, #885734, #b77831 50%)"; 
    } else if (rarity === 4) {
        return "linear-gradient(150deg, #59598d, #a47bc6 80%)";
    }

    return "";
};