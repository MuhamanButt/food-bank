import React, { useContext } from "react";
import Title from "../components/Title";
import MyNavbar from "../components/Navbar";
import ImageCard from "../components/ImageCard";
import "./PageStyles/Home.css";
import fullTableImage from "./images/full table.jpg";
import asianImg from "./images/asian.png";
import continentalImg from "./images/continental.png";
import dessertsImg from "./images/dessert.png";
import { useNavigate } from "react-router-dom";
import { useFirebase } from "../context/firebase";
import { useState } from "react";
import { RecipeContext } from "../App";
import { useEffect } from "react";
import './PageStyles/PageAnimations.css'

const Home = () => {
  const firebase = useFirebase();
  const [GlobalRecipe, setGlobalRecipe] = useState([]);
  const [Recipes, setRecipes] = useState([]);
  const navigate = useNavigate();
  const ViewHandler = (str) => {
    navigate(str);
  };

  useEffect(() => {
    const fetchData = async () => {
      const recipesData = await firebase.getAllRecipes();
      setRecipes(recipesData.docs);
      setGlobalRecipe(recipesData.docs)
    };
    fetchData();
  }, []);
  return (
    <div className="overflow-x-hidden">
      
      <MyNavbar></MyNavbar>
      <div className="row m-0 fade-in-left">
        <div className="col p-0">
          <img src={fullTableImage} alt="" className="backgroundImg" />
        </div>
      </div>
      <br />
      <Title name={"Categories"}></Title>
      <div data-aos="fade-left"
    data-aos-offset="300"
    data-aos-easing="ease-in-sine">
      <div className="row ">
        <div className="col">
          <div className="row justify-content-center">
            <ImageCard
              heading={"Asian"}
              description={
                "Asian food is a vibrant and diverse culinary world known for its rich flavors and diverse ingredients, offering a delightful fusion of tastes and textures."
              }
              imageSRC={asianImg}
              viewHandler={() => ViewHandler("/categories/asian")}
            ></ImageCard>
            <ImageCard
              heading={"Continental"}
              description={
                "Continental cuisine is a sophisticated and diverse culinary style rooted in European traditions, known for its elegant presentation and emphasis on high-quality ingredients"
              }
              imageSRC={continentalImg}
              viewHandler={() => ViewHandler("/categories/continental")}
            ></ImageCard>
            <ImageCard
              heading={"Desserts"}
              description={
                "Desserts are indulgent culinary creations designed to satisfy sweet cravings, ranging from creamy chocolates and fruity tarts to decadent cakes and delicate pastries, offering a delightful and sweet conclusion to a meal."
              }
              imageSRC={dessertsImg}
              viewHandler={() => ViewHandler("/categories/desserts")}
            ></ImageCard>
          </div>
        </div>
      </div>
      </div>
      <Title name={"Recipes"}></Title>
      
      <div data-aos="fade-left"
    data-aos-offset="300"
    data-aos-easing="ease-in-sine">
      <div className="row">
        <div className="col">
          <div className="row justify-content-center">
            
            {Recipes.slice(0, 3).map((recipe, index) => (
              <ImageCard
                key={index}
                heading={recipe.data().recipeName}
                description={recipe.data().description}
                imageURL={recipe.data().pictureURL}
                viewHandler={() => ViewHandler(`/recipe/view/${recipe.data().identity}`)}
                identity={recipe.data().identity}
              ></ImageCard>
            ))}
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Home;
