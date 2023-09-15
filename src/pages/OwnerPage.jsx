import React, { useEffect } from "react";
import MyNavbar from "../components/Navbar";
import { useState } from "react";
import { Form, Navbar } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useFirebase } from "../context/firebase";
import { Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Title from "../components/Title";

const OwnerPage = ({ flag }) => {
  const navigate = useNavigate();
  const [Name, setName] = useState();
  const firebase = useFirebase();
  
  return (
    <div className="row justify-content-center m-0" id="ownerPage">
      
        <div className="row w-100 justify-content-center ">
          <div className="col">
            <MyNavbar ></MyNavbar>
            <Title name={"Hello Admin!"}></Title>
            <h1 className="text-success bounce-top">Success!! Admin Options Enabled!!</h1>
          </div>
        </div>
      
    </div>
  );
};

export default OwnerPage;
