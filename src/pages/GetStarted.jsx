import React from "react";
import "./PageStyles/getStarted.css";
import Button from "react-bootstrap/Button";
import logo from "./images/logo.png";
import { useNavigate } from "react-router-dom";
import './PageStyles/PageAnimations.css'
const GetStarted = () => {
    const navigate=useNavigate();
    const getStartedHandler=()=>{
        navigate("/home");
    }
  return (
    <div className="getStarted-page row justify-content-center m-0 overflow-hidden">
      <div className="col align-self-center text-center p-0 flip-scale-up-hor">
        <div>
          <img src={logo} alt="" className="getStartedLogo" />
        </div>
        <div>
          <Button className="getStartedBtn bounce-top" onClick={getStartedHandler}>Get Started</Button>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;
