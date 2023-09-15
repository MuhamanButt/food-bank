import React, { useEffect } from "react";
import { useState } from "react";
import { Form, Navbar } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useFirebase } from "../context/firebase";
import { Alert } from "react-bootstrap";
import Title from "../components/Title";
import MyNavbar from "../components/Navbar";
import ConfirmationComponent from "../components/ConfirmationComponent";
const DeleteRecipe = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const firebase = useFirebase();
  const [Name, setName] = useState();

  const deleteHandler = async () => {
    handleShow();
  };
  const deleteRecipe = async () => {
    await firebase.deleteRecipeByName(Name);
    handleClose();
  };
  return (
    <div>
      
        <div className="row w-100 justify-content-center " id="deleterecipePage">
          <div className="col">
            <MyNavbar></MyNavbar>
            <Title name={"Hello Admin!"}></Title>
            <div id="alert-delete-success" className="d-none">
              <Alert variant="success">
                <Alert.Heading>Recipe Deleted Successfully!!</Alert.Heading>
              </Alert>
            </div>
            <div id="alert-delete-danger" className="d-none">
              <Alert variant="danger">
                <Alert.Heading>Recipe cannot be Deleted!!</Alert.Heading>
              </Alert>
            </div>
            {show ? (
              <ConfirmationComponent
                heading={"Confirm Delete"}
                body={"Are you sure you want to delete?"}
                onConfirmText={"Delete"}
                onConfirmHandler={deleteRecipe}
                handleClose={handleClose}
                handleShow={handleShow}
              ></ConfirmationComponent>
            ) : (
              ""
            )}
            <div id="deleteRecipeInputBar">
              
          <div className="row justify-content-center">
              <div className="col col-md-6 p-0">
              <Form className="form signIn-form ">
                <Form.Group className="mb-3">
                  <Form.Label className="form-label">Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter name of recipe to delete"
                    className="form-text-area"
                    onChange={(e) => setName(e.target.value)}
                    value={Name}
                    required
                  />
                </Form.Group>
                <div className="col text-center">
                <Button variant="danger" className="w-50" onClick={deleteHandler}>
                Delete Recipe
              </Button>
                </div>
              
              </Form>
              </div>
              </div>
            </div>
          </div>
        </div>
      
    </div>
  );
};

export default DeleteRecipe;
