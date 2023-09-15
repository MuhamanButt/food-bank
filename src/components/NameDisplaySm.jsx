import React from 'react'
import "./styling/NameDisplaySm.css";


const NameDisplaySm = ({ heading, description }) => {
    return (
      <div>
        <h6 className="headingSm">{heading}</h6>
        <p className="descriptionSm">{description}</p>
      </div>
    );
  };
  
  export default NameDisplaySm;