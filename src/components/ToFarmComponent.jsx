import React from 'react'
import './style/ToFarmStyle.css';


function ToFarmComponent() {
  return (
    <div id="ToFarmBox">
        <h2>
          To-Farm
        </h2>
        <hr></hr>
        <div id="ToFarmAvailable">
            
        </div>

        <div id="ToFarmNotAvailable">
            <h4>not available today:</h4>
        </div>

    </div>
  )
}

export default ToFarmComponent
