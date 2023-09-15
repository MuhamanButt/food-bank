import React, { createContext } from "react";
import { useFirebase } from "../context/firebase";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import MyNavbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import Loader from "../components/Loader";
import Title from "../components/Title";
import List from "../components/List";

export const userProfileContext = createContext();
const UserProfile = () => {
  const [Recipes, setRecipes] = useState([]);
  const [GlobalRecipe, setGlobalRecipe] = useState([]);
  const [DataIsLoaded, setDataIsLoaded] = useState(false);
  const [Flag, setFlag] = useState(false);
  const firebase = useFirebase();
  const params = useParams();

  const changeRecipe = (str) => {
    if (str == "") {
      setRecipes(GlobalRecipe);
    } else {
      const filterRecipes = async () => {
        const category = GlobalRecipe.filter((recipe) =>
          recipe.data().recipeName.includes(str)
        );
        category && setRecipes(category);
      };
      filterRecipes();
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await firebase
        .getRecipesByUserID(params.profileId)
        .then((recipes) => {
          setRecipes(recipes.docs);
          setGlobalRecipe(recipes.docs);
          setDataIsLoaded(true);

          if (document.location.href.includes("profile")) {
            
            if(firebase.User&&Recipes.length>0&&firebase.User.uid&&(firebase.User.uid==Recipes[0].data().userID))
            setFlag(true);
          } else {
            setFlag(false);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    };
    fetchData();
  }, [DataIsLoaded, Flag, document.location.href]);
  return (
    <div>
      <MyNavbar></MyNavbar>
      <SearchBar searchHandler={changeRecipe}></SearchBar>
      {DataIsLoaded ? (
        <>
          {Recipes.length != 0 ? (
            <userProfileContext.Provider value={Flag}>
              <Title
                name={`Recipes by : ${Recipes[0].data().userName}`}
              ></Title>
              <List RecipeList={Recipes} />
            </userProfileContext.Provider>
          ) : (
            <h1 className="text-danger text-center">No Recipes To Show</h1>
          )}
        </>
      ) : (
        <Loader text={"Stirring up something delicious..."}></Loader>
      )}
    </div>
  );
};

export default UserProfile;
