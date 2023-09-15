import React, { useEffect } from "react";
import "./styling/Alert.css";
import Alert from "react-bootstrap/Alert";
import { useState } from "react";

const MyAlert = ({ variant, text, status, id }) => {
  const [Status, setStatus] = useState(status);
  useEffect(() => {
    setStatus(status)
    console.log(status,Status)
    if (status) {
        console.log("andr agya h")
      document.getElementById(id).classList.remove("d-none");
      setTimeout(() => {
        document.getElementById(id).classList.add("d-none");
      }, 2000);
    }
  }, [Status]);
  return (
    <div id={id} >
      <Alert variant={variant} className="alert"> 
        <Alert.Heading>{text}</Alert.Heading>
      </Alert>
    </div>
  );
};

export default MyAlert;
