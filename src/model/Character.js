import { Element, WeaponType } from './enums';
import genshindb from 'genshin-db';

export class Character{
    id=0;
    name="";
    element="";
    weaponType="";
    rarity=0;
    ascensionMaterial="";
    talentMaterial="";
    imageUrl="";

    weapon=null;
    // artifactSet=[];

    constructor(name) {
        this.id=genshindb.characters(name)?.id;
        this.name = name;
        this.element = genshindb.characters(name)?.elementText;
        this.weaponType = genshindb.characters(name)?.weaponType;
        this.rarity = genshindb.characters(name)?.rarity;
        this.ascensionMaterial = genshindb.characters(name)?.costs.ascend2[1].name;
        this.talentMaterial = genshindb.talents(name).costs.lvl2[1].name;
        const fileNameIcon = genshindb.characters(name)?.images.filename_icon;
        this.imageUrl = `https://gi.yatta.moe/assets/UI/${fileNameIcon}.png`;
    }

    setWeapon(weaponName) {
        this.weapon = new Weapon(weaponName);
    }

    addArtifactSet(artifactSetNames) {
        // Assuming the method is supposed to add artifacts by their names.
        artifactSetNames.forEach(artifactSetName => {
          this.artifactSet.push(new ArtifactSet(artifactSetName));
        });
      }


    // getName() {
    //     return this.#name;
    // }

    // getId() {
    //     return this.#id;
    // }

    // getTalentMaterial() {
    //     return this.#talenMaterial;
    // }
}

export class Weapon{
    name="";
    weaponType="";
    rarity=0;
    ascensionMaterial="";  
    imageUrl=""; 
    
    constructor(name) {
        this.name = name;
        this.weaponType = genshindb.weapons(name)?.weaponTypeText;
        this.rarity = genshindb.weapons(name)?.rarity;
        this.ascensionMaterial = genshindb.weapons(name)?.costs.ascend2[1].name;
    }

}

class ArtifactSet{
    name="";
    rarity=0;
    set="";
    ascensionMaterial="";
    imageUrl=""; 

    constructor(name) {
        this.name = name;
        this.rarity = genshindb.artifacts(name)?.rarity;
        this.imageUrl = genshindb.artifacts(name)?.images.flower;
    }
}