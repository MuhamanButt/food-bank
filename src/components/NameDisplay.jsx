import React, { useEffect } from "react";
import "./styling/NameDisplay.css";

const NameDisplay = ({ heading, description }) => {
  return (
    <div>
      <h1 className="heading">{heading}</h1>
      <p className="description">{description}</p>
    </div>
  );
};

export default NameDisplay;
