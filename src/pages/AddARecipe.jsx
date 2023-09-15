import React, { useEffect } from "react";
import MyNavbar from "../components/Navbar";
import Form from "react-bootstrap/Form";
import Title from "../components/Title";
import { useState } from "react";
import { useFirebase } from "../context/firebase";
import Button from "react-bootstrap/Button";
import "./PageStyles/AddARecipe.css";
import Loader from "../components/Loader";
import Alert from "react-bootstrap/Alert";
import { useNavigate } from "react-router-dom";

const AddARecipe = () => {
  const navigate = useNavigate();
  const firebase = useFirebase();
  const [RecipeName, setRecipeName] = useState("Enter Recipe Name");
  const [Description, setDescription] = useState("Enter Description");
  const [Ingredients, setIngredients] = useState("Enter Ingredients");
  const [Recipe, setRecipe] = useState("Enter Recipe");
  const [Picture, setPicture] = useState("");
  const [Category, setCategory] = useState("Select Category");
  const [limit, setlimit] = useState(0);
  const [name, setname] = useState("");
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  const invokeDangerAlert = (text, num) => {
    setname(text);
    setlimit(num);
    document
      .getElementById("alert-addarecipe-danger")
      .classList.remove("d-none");
    setTimeout(() => {
      if (document.getElementById("alert-addarecipe-danger"))
        document
          .getElementById("alert-addarecipe-danger")
          .classList.add("d-none");
    }, 2000);
  };
  const recipeNameHandler = (e) => {
    console.log(RecipeName)
    e.target.value.length > 20
      ? invokeDangerAlert("Recipe Name", 20)
      : setRecipeName(e.target.value);
  };
  const DescriptionHandler = (e) => {
    e.target.value.length > 60
      ? invokeDangerAlert("Description", 60)
      : setDescription(e.target.value);
  };
  const IngredientsHandler = (e) => {
    e.target.value.length > 400
      ? invokeDangerAlert("Ingredients", 400)
      : setIngredients(e.target.value);
  };
  const RecipeHandler = (e) => {
    e.target.value.length > 1500
      ? invokeDangerAlert("Recipe", 1500)
      : setRecipe(e.target.value);
  };
  const [userIsLoggedIn, setuserIsLoggedIn] = useState(
    firebase.getUserisLoggedIn()
  );
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };
  const addRecipeHandler = async (e) => {
    const user = await firebase.getUserDetails();
    const userID = user.uid;
    const userEmail = user.email;
    const userName = await firebase.getUserName(userID);
    if (
      RecipeName == "" ||
      Description == "" ||
      Ingredients == "" ||
      Recipe == "" ||
      Picture == "" ||
      Category == "Select Category"
    ) {
      if (document.getElementById("alert-error")) {
        document.getElementById("alert-error").classList.remove("d-none");
        setTimeout(() => {
          if (document.getElementById("alert-error"))
            document.getElementById("alert-error").classList.add("d-none");
        }, 2000);
      }
    } else {
      document.getElementById("formRow").classList.add("d-none");
      document.getElementById("loaderRow").classList.remove("d-none");
      await firebase
        .sendForApproval(
          RecipeName,
          Description,
          Ingredients,
          Recipe,
          Picture,
          Category,
          userID,
          userName,
          userEmail
        )
        .then(() => {
          if (document.getElementById("alert-success")) {
            document.getElementById("alert-success").classList.remove("d-none");
            setTimeout(() => {
              if (document.getElementById("alert-success"))
                document
                  .getElementById("alert-success")
                  .classList.add("d-none");
            }, 2000);
          }
        });

      document.getElementById("formRow").classList.remove("d-none");
      document.getElementById("loaderRow").classList.add("d-none");
    }
  };

  return (
    <div>
      <MyNavbar></MyNavbar>
      <div id="loaderRow" className="d-none">
        <Loader text={"Recipe secrets in the making... "}></Loader>
      </div>

      <div id="alert-success" className="d-none">
        <Alert variant="success">
          <Alert.Heading>Recipe Sent For Approval!!</Alert.Heading>
        </Alert>
      </div>
      <div id="alert-error" className="d-none">
        <Alert variant="danger">
          <Alert.Heading>Please fill all input fields</Alert.Heading>
        </Alert>
      </div>
      <div id="alert-addarecipe-danger" className="d-none">
          <Alert variant="danger">
            <Alert.Heading>
              {name} must be less than {limit} characters
            </Alert.Heading>
          </Alert>
        </div>
      <div id="formRow" className="mx-5">
        <div
          data-aos="fade-right"
          data-aos-offset="300"
          data-aos-easing="ease-in-sine"
          id="addARecipeForm"
        >
          <Title name={"Add A Recipe"}></Title>
          {userIsLoggedIn ? (
            <div className="row justify-content-center">
              <div className="col col-md-6 p-0">
                <Form className="form" onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label className="form-label">Recipe Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder={RecipeName}
                      className="form-text-area"
                      onChange={(e) => recipeNameHandler(e)}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label className="form-label">Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      type="text"
                      placeholder={Description}
                      className="form-text-area"
                      onChange={(e) => DescriptionHandler(e)}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label className="form-label">Ingredients</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={5}
                      type="text"
                      placeholder={Ingredients}
                      className="form-text-area"
                      onChange={(e) => IngredientsHandler(e)}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label className="form-label">Recipe</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={7}
                      type="text"
                      placeholder={Recipe}
                      className="form-text-area"
                      onChange={(e) => RecipeHandler(e)}
                      required
                    />
                  </Form.Group>
                  <div className="row">
                    <div className="col-6">
                      <Form.Group className="mb-3">
                        <Form.Label className="form-label">Image</Form.Label>
                        <Form.Control
                          type="file"
                          accept="image/*"
                          onChange={(e) => setPicture(e.target.files[0])}
                          required
                          className="form-image"
                        />
                      </Form.Group>
                    </div>
                    <div className="col-6">
                      <Form.Label className="form-label">Category</Form.Label>
                      <Form.Select
                        aria-label="Default select example"
                        className="formSelection"
                        value={Category}
                        onChange={handleCategoryChange}
                      >
                        <option value="">Select Category</option>
                        <option value="Asian">Asian</option>
                        <option value="Continental">Continental</option>
                        <option value="Desserts">Desserts</option>
                      </Form.Select>
                    </div>
                  </div>
                  <div className="row m-0 justify-content-center mb-5 mt-3">
                    <div className="col p-0 text-center">
                      <Button
                        variant="danger"
                        className="w-50"
                        onClick={addRecipeHandler}
                        type="submit"
                      >
                        Add Recipe
                      </Button>
                    </div>
                  </div>
                </Form>
              </div>
            </div>
          ) : (
            <h1>PLease Log in</h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddARecipe;
