import React, { useEffect } from "react";
import {  Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AddARecipe from "./pages/AddARecipe";
import GetStarted from "./pages/GetStarted";
import Asian from "./pages/Asian";
import Continental from "./pages/Continental";
import Desserts from "./pages/Desserts";
import NoMatchPage from "./pages/NoMatchPage";
import { useContext,useState } from 'react'
import { useFirebase } from './context/firebase'
// import { BrowserRouter } from "react-router-dom";
import "./App.css";
 import { HashRouter as BrowserRouter } from "react-router-dom";


import Loader from "./components/Loader";
import RecipeDetail from "./pages/RecipeDetail";
import AllRecipe from "./pages/AllRecipe";
import LoginAsOwner from "./pages/LoginAsOwner";
import OwnerPage from "./pages/OwnerPage";
import CreateAccount from "./pages/CreateAccount";
import LoginPage from "./pages/LoginPage";
import UserProfile from "./pages/UserProfile";
import PendingApprovals from "./pages/PendingApprovals";
import DeleteRecipe from "./pages/DeleteRecipe";
import './pages/PageStyles/PageAnimations.css'
import ReviewPage from "./pages/Reviews";

export const RecipeContext=React.createContext();
function App() {
  const firebase = useFirebase();
  const [Recipes, setRecipes] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const recipesData = await firebase.getAllRecipes();
      setRecipes(recipesData.docs);
    };
  
    fetchData();
  }, []);
  
  return (
    <div className=" mx-2 mx-lg-5 mx-md-3">
      <RecipeContext.Provider value={Recipes}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<GetStarted/>} />
          <Route path="/home" element={Recipes.length > 0 ? <Home recipes={Recipes} /> : <Loader text={"Stirring up something delicious..."}/>} />
          <Route path="/addARecipe" element={firebase.User?<AddARecipe/>:<LoginPage/>} />
          <Route path="/categories/asian" element={<Asian/>} />
          <Route path="/categories/continental" element={<Continental/>}/>
          <Route path="/categories/desserts" element={<Desserts/>} />
          <Route path="/loginAsOwner" element={<LoginAsOwner/>} />
          <Route path="/OwnerPage" element={firebase.OwnerState?<OwnerPage/>:<NoMatchPage/>} />
          <Route path="/CreateAccount" element={<CreateAccount/>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/users/view/:profileId" element={<UserProfile/>} />
          <Route path="/users/view/profile/:profileId" element={<UserProfile/>} />
          <Route path="/Recipe" element={<AllRecipe/>} />
          <Route path="/recipes/reviews/:recipeId" element={<ReviewPage/>} />
          <Route path="/recipe/view/:recipeId" element={<RecipeDetail/>} />
          <Route path="/pendingApprovals" element={firebase.OwnerState?<PendingApprovals/>:<NoMatchPage/>} />
          <Route path="/deleteRecipe" element={firebase.OwnerState?<DeleteRecipe/>:<NoMatchPage/>} />
          <Route path="*" element={<NoMatchPage></NoMatchPage>}></Route>
        </Routes>
      </BrowserRouter>
      </RecipeContext.Provider>
    </div>
  );
}

export default App;
