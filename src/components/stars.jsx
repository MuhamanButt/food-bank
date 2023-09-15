import React, { useEffect } from "react";
import StarTrue from "./images/starTrue.png";
import StarFalse from "./images/starFalse.png";
import { useState } from "react";

const Stars = ({ count }) => {
  const [Stars, setStars] = useState([false, false, false, false, false]);
  useEffect(() => {
    let array = Stars;
    for (let i = 0; i < count; i++) {
      array[i] = true;
    }
    setStars(array);
  }, []);
  return (
    <div className="my-1">
      {Stars.map((star) =>
        star ? (
          <img src={StarTrue} style={{ height: "20px" }} className="ms-2"/>
        ) : (
          <img src={StarFalse} style={{ height: "20px" }} className="ms-2"/>
        )
      )}
    </div>
  );
};

export default Stars;
