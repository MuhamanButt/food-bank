import React, { useEffect } from "react";
import ListCard from "./ListCard";
import { useNavigate } from "react-router-dom";
import { useFirebase } from "../context/firebase";
import { useState } from "react";
const List = ({ RecipeList }) => {
  const firebase=useFirebase();
  const [Flag, setFlag] = useState("");
  const navigate = useNavigate();
  const ViewHandler = (str) => {
    navigate(str);
  };
  const changeFlag = () => {
    if (Flag === true) {
      setFlag(false);
    } else {
      setFlag(true);
    }
  };
  
  useEffect(()=>{},[Flag])
  return (
    
    <div className="row justify-content-center m-0 overflow-x-hidden" data-aos="fade-right"
    data-aos-offset="300"
    data-aos-easing="ease-in-sine">
      {RecipeList.map((recipe, index) => (
        <ListCard
          key={index}
          heading={recipe.data().recipeName}
          description={recipe.data().description}
          author={recipe.data().userName}
          imageURL={recipe.data().pictureURL}
          viewHandler={() => ViewHandler(`/recipe/view/${recipe.data().identity}`)}
          identity={recipe.data().identity}
          category={recipe.data().category}
          authorHandler={() => ViewHandler(`/users/view/${recipe.data().userID}`)}
          seeReviewsHandler={() => ViewHandler(`/recipes/reviews/${recipe.data().identity}`)}
          changeFlag={changeFlag}
        ></ListCard>
      ))}
    </div>
  );
};

export default List;
