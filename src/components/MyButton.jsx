import React from "react";
import "./styling/MyButton.css";

const MyButton = ({value}) => {
  return (
    <div class="box-1 ">
      <div class="btn btn-one col-2">
        <span>{value}</span>
      </div>
    </div>
  );
};

export default MyButton;
