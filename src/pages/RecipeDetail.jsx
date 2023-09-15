import React, { useEffect } from "react";
import "./PageStyles/RecipeDetail.css";
import { useParams } from "react-router-dom";
import { useFirebase } from "../context/firebase";
import { useState } from "react";
import MyNavbar from "../components/Navbar";
import Title from "../components/Title";
import Loader from "../components/Loader";
import HrTag from "../components/HrTag";
import NameDisplay from "../components/NameDisplay";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

const RecipeDetail = () => {
  const navigate=useNavigate()
  const [URL, setURL] = useState(null);
  const [Recipe, setRecipe] = useState(null);
  const [LoaderState, setLoaderState] = useState(true);
  const [RecipeIsLoaded, setRecipeIsLoaded] = useState(false);
  const params = useParams();
  const firebase = useFirebase();
  const getIngredients = () => {
    if (Recipe) {
      const ingredients = Recipe.ingredients.split("\n");
      return ingredients.map((word, index) => (
        <div key={index}><strong>{index+1}.</strong> {word}</div>
      ));
    }
    return "";
  };
  useEffect(() => {
    const fetchData = async () => {
      const recipesData = await firebase.getRecipeByIdentity(params.recipeId);
      setRecipe(recipesData.docs[0].data());
      setRecipeIsLoaded(true);
      if (RecipeIsLoaded)
        await firebase
          .getImageURL(Recipe.pictureURL)
          .then((URL) => setURL(URL));
    };
    fetchData();
    if (RecipeIsLoaded) {
      setLoaderState(false);
    }
  }, [RecipeIsLoaded]);
  return (
    <div>
      <MyNavbar></MyNavbar>
      {LoaderState ? (
        <Loader text={"Loading the Recipe..."}></Loader>
      ) : (
        <div>
          <Title name={Recipe.recipeName}></Title>
          <div className="row mx-1 justify-content-center justify-content-lg-start">
            <div className="col-12 col-md-8 col-lg-5 ">
              <img src={URL} alt="" className="RecipeDetail-image" />
            </div>
            <div className="col-12 col-lg-7 recipeDetail-text align-self-center mt-5 mt-lg-0 mb-lg-5">
              <NameDisplay
                heading={"Recipe Name : "}
                description={Recipe.recipeName}
              ></NameDisplay>
             <div onClick={()=>navigate(`/users/view/${Recipe.userID}`)}style={{cursor:"pointer"}}>
              <NameDisplay
                heading={"Recipe By : "}
                description={Recipe.userName}
                
              ></NameDisplay></div>
              <NameDisplay
                heading={"Description : "}
                description={Recipe.description}
              ></NameDisplay>
              <NameDisplay
                heading={"Category : "}
                description={Recipe.category}
              ></NameDisplay>
<Button
                  variant="danger"
                  className="w-100"
                  onClick={()=>navigate(`/users/view/${Recipe.userID}`)}
                  type="submit"
                ><strong>View All Recipes By :</strong> {Recipe.userName}</Button>
              <div className="col d-none d-lg-inline ">
                <HrTag></HrTag>
              </div>
            </div>
            <div className="col">
            <NameDisplay
                heading={"Ingredients : "}
                description={getIngredients()}
              ></NameDisplay>
              <NameDisplay
                heading={"Recipe : "}
                description={Recipe.recipe}
              ></NameDisplay>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeDetail;
