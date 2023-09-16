import React, { useEffect } from "react";
import MyNavbar from "../components/Navbar";
import Title from "../components/Title";
import { RecipeContext } from "../App";
import { useContext } from "react";
import { useState } from "react";
import List from "../components/List";
import SearchBar from "../components/SearchBar";
import { useFirebase } from "../context/firebase";
import Loader from "../components/Loader";
const Continental = () => {
  const firebase = useFirebase();
  const [GlobalRecipe, setGlobalRecipe] = useState([]);
  const [Recipes, setRecipes] = useState([]);
  const changeRecipe = (str) => {
    if (str == "") {
      setRecipes(GlobalRecipe);
    } else {
      const filterRecipes = async () => {
        const category = GlobalRecipe.filter((recipe) =>
        recipe.data().recipeName.toLowerCase().includes(str.toLowerCase())
        );
        category && setRecipes(category);
      };
      filterRecipes();
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const recipesData = await firebase.getAllRecipes();
      let array = recipesData.docs.filter(
        (recipe) => recipe.data().category == "Continental"
      );
      setRecipes(array);
      setGlobalRecipe(array);
    };
    fetchData();
  }, []);


  return (
    <div>
      <MyNavbar></MyNavbar>
      <SearchBar searchHandler={changeRecipe}></SearchBar>
      <Title name={"Continental"}></Title>
      {Recipes.length > 0 ? (
        <List RecipeList={Recipes} />
      ) : (
        <Loader text={"Stirring up something delicious..."}></Loader>
      )}
    </div>
  );
};

export default Continental;
