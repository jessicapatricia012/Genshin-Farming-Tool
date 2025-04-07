import { Element, WeaponType } from './enums';
import genshindb from 'genshin-db';

export class Character{
    name="";
    element="";
    weaponType="";
    rarity=0;
    ascensionMaterial="";
    talenMaterial="";
    imageUrl="";

    weapon=null;
    artifacts=[];

    constructor(name) {
        this.name = name;
        this.element = genshindb.characters(name)?.elementText;
        this.weaponType = genshindb.characters(name)?.weaponText;
        this.rarity = genshindb.characters(name)?.rarity;
        this.ascensionMaterial = genshindb.characters(name)?.costs.ascend2[1].name;
        this.talenMaterial = genshindb.talents(name).costs.lvl2[1].name;
        const fileNameIcon = genshindb.characters(name)?.images.filename_icon;
        this.imageUrl = `https://gi.yatta.moe/assets/UI/${fileNameIcon}.png`;
    }
}

export class weapon{
    name="";
    weaponType="";
    rarity=0;
    ascensionMaterial="";   
    
    constructor(name) {
        this.name = name;
        this.weaponType = genshindb.weapons(name)?.weaponTypeText;
        this.rarity = genshindb.weapons(name)?.rarity;
        this.ascensionMaterial = genshindb.weapons(name)?.costs.ascend2[1].name;
        
    }

}

class artifact{
    name="";
    rarity=0;
    set="";
    ascensionMaterial="";
}