import React, { useEffect } from "react";
import ListCard from "./ListCard";
import { useNavigate } from "react-router-dom";
import { useFirebase } from "../context/firebase";
const List = ({ RecipeList }) => {
  const firebase=useFirebase();
  const navigate = useNavigate();
  const ViewHandler = (str) => {
    navigate(str);
  };
  
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
        ></ListCard>
      ))}
    </div>
  );
};

export default List;
