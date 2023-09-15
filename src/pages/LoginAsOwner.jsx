import React, { useEffect } from "react";
import { useFirebase } from "../context/firebase";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MyNavbar from "../components/Navbar";
import "./PageStyles/AddARecipe.css";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import "./PageStyles/LoginAsOwner.css";
import { Alert } from "react-bootstrap";
import Loader from "../components/Loader";
import Title from "../components/Title";

const LoginAsOwner = () => {
  const navigate = useNavigate();
  const firebase = useFirebase();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [Flag, setFlag] = useState(false);
  const signInOwner = async () => {
    
    email ? setemail(email) : setemail(" ");
     password ? setpassword(password) : setpassword(" ");
     setFlag(true)
    if(await firebase.signInOwnerWithEmailandPassword(email, password))
    navigate("/OwnerPage");
    setFlag(false)
  };
  useEffect(()=>{
    if (firebase.OwnerState) {
        navigate("/OwnerPage");
      }
  })
  return (
    <div className="signInpage row">
      <MyNavbar></MyNavbar>
      <Title name={"Login As Owner"}></Title>
      <div id="alert-owner-danger" className="d-none"data-aos="fade-right"
         data-aos-offset="300"
         data-aos-easing="ease-in-sine">
        <Alert variant="danger">
          <Alert.Heading>Wrong Email or Password!!</Alert.Heading>
        </Alert>
      </div>
      {Flag?(<Loader text={"Authenticating..."}></Loader>):(<div className="row justify-content-center ">
        <div className="col col-md-6 p-0"> 
        <Form className="form signIn-form ">
        <Form.Group className="mb-3">
          <Form.Label className="form-label">Email</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your email"
            className="form-text-area"
            onChange={(e) => setemail(e.target.value)}
            value={email}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label className="form-label">Password</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your password"
            className="form-text-area"
            onChange={(e) => setpassword(e.target.value)}
            value={password}
            required
          />
        </Form.Group>
      <div className="col text-center">
      <Button
        variant="danger"
        className="w-50"
        onClick={signInOwner}
        type="submit"
      >
        Sign me in
      </Button>
      </div>
      </Form>
        </div>
      </div>)}
      
      </div>
  );
};

export default LoginAsOwner;
