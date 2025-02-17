import React, { useState, useEffect } from "react";
import "./style/PickPanel.css";
import genshindb from 'genshin-db';
import Icon from "./Icon";

function PickArtifact({ onSelectArtifact, selectedArtifacts }) {

    const [artifacts, setArtifacts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);  
        try {
            const artifacts = genshindb.artifacts("name", { matchCategories: true });
            if (Array.isArray(artifacts)) 
                artifacts.sort((a, b) => {
                    const maxRarityA = Math.max(...genshindb.artifacts(a).rarityList); // Get the highest rarity in the list for artifact A
                    const maxRarityB = Math.max(...genshindb.artifacts(b).rarityList); // Get the highest rarity in the list for artifact B
                    return maxRarityB - maxRarityA; // Sort in descending order
                });
                setArtifacts(artifacts);
        } catch (error) {
            console.error("Error loading characters:", error);
        } finally {
            setLoading(false);  
        }
      }, []); 


    const handleClick = (artifact) => {
        let updatedArtifacts = [...selectedArtifacts];;
        if (selectedArtifacts.includes(artifact)) { // If it's already selected, deselect it
            updatedArtifacts = selectedArtifacts.filter(item => item !== artifact);
        } else if (selectedArtifacts.length < 2) { // If there are fewer than 2 selected, add this artifact
            updatedArtifacts = [...selectedArtifacts, artifact];
        }
        onSelectArtifact(updatedArtifacts);
    };


  return (
    <div className="pickPanel">
      <div className="slideHeader" id="weaponSlideHeader">
        <input className="searchField" id="weaponSearchField" type="text" placeholder="Search" />
      </div>
      <div className="icons">
        {loading ? (
          <p>Loading artifacts...</p>
        ) : (
            artifacts.map((artifact, index) => (
            <div 
              className={`icon ${selectedArtifacts.includes(artifact) ? 'selected' : ''}`} 
              key={index} 
              onClick={() => handleClick(artifact)}>              
            <Icon name={artifact} type="artifact" />
            </div>          
          ))
        )}
      </div>
    </div>
  );
}

export default PickArtifact;
