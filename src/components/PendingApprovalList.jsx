
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PendingApprovalListCard from "./PendingApprovalListCard";
const PendingApprovalList = ({ RecipeList }) => {
  const navigate = useNavigate();
  const authorViewHandler = (str) => {
    navigate(str);
  };
  return (
    
    <div className="row justify-content-center m-0 overflow-x-hidden" data-aos="fade-right"
    data-aos-offset="300"
    data-aos-easing="ease-in-sine">
      =
      {RecipeList.map((recipe, index) => (
        <PendingApprovalListCard
          key={index}
          identity={recipe.data().identity}
          heading={recipe.data().recipeName}
          description={recipe.data().description}
          author={recipe.data().userName}
          imageURL={recipe.data().pictureURL}
          category={recipe.data().category}
          ingredients={recipe.data().ingredients}
          recipe={recipe.data().recipe}
          userEmail={recipe.data().userEmail}
          userID={recipe.data().userID}
          authorHandler={() => authorViewHandler(`/users/view/${recipe.data().userID}`)}
        ></PendingApprovalListCard>
      ))}
    </div>
  );
};

export default PendingApprovalList;
