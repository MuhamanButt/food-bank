import React from "react";
import "./styling/Loader.css";

const Loader = ({text}) => {
  return (
    <div>
      <div className="row justify-content-center loaderRow m-0">
        <div className="col align-self-center text-center p-0">
          <div className="loader"></div>
          <p className="text-white mt-1">{text}</p>
        </div>
      </div>
    </div>
  );
};

export default Loader;
