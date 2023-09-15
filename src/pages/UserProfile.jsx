import React from "react";
import { useFirebase } from "../context/firebase";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import MyNavbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import Loader from "../components/Loader";
import Title from "../components/Title";
import List from "../components/List";
const UserProfile = () => {
  const [Recipes, setRecipes] = useState([]);
  const [GlobalRecipe, setGlobalRecipe] = useState([]);
  const [DataIsLoaded, setDataIsLoaded] = useState(false);
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
          setGlobalRecipe(recipes.docs)
          setDataIsLoaded(true);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    };
    fetchData();
  }, [DataIsLoaded]);
  return (
    <div>
      <MyNavbar></MyNavbar>
      <SearchBar searchHandler={changeRecipe}></SearchBar>
      {DataIsLoaded ? (
        <>
       { Recipes.length!=0?( <><Title name={`Recipes by : ${Recipes[0].data().userName}`}></Title>
          <List RecipeList={Recipes} /></>):(<h1 className='text-danger text-center'>No Recipes To Show</h1>)}
         
        </>
      ) : (
        <Loader text={"Stirring up something delicious..."}></Loader>
      )}
    </div>
  );
};

export default UserProfile;
