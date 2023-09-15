import React, { useContext } from "react";
import "./styling/ListCard.css";
import { useState, useEffect } from "react";
import { useFirebase } from "../context/firebase";
import HrTag from "./HrTag";
import { Button } from "react-bootstrap";
import { PendingApprovalContext } from "../pages/PendingApprovals";
const PendingApprovalListCard = ({
    identity,
  heading,
  description,
  author,
  imageURL,
  category,
  authorHandler,
  ingredients,
  recipe,
  userID,
  userEmail,
}) => {
  const [URL, setURL] = useState(null);
  const firebase = useFirebase();
  const approvalContext = useContext(PendingApprovalContext);

  const approveRecipe = async () => {
    await firebase.approveRecipe(identity);
    // Call the context function to update the data
    approvalContext(false);
  }
  useEffect(() => {
    const fetchData = async () => {
      await firebase.getImageURL(imageURL).then((URL) => setURL(URL));
    };
    fetchData();
  }, [imageURL]);
  return (
    <div className="col-11 col-lg-5 listCard-row">
      <div className="row">
        <div className="col-5 col-lg-6 m-0 p-0 align-self-center">
          <img src={URL} alt="" className="listCard-image" />
        </div>
        <div className="col-7 col-lg-6 align-self-center listcard-text">
          <h6>{heading}</h6>
          <p>{description}</p>
          <p onClick={authorHandler}><strong>By :</strong> {author}</p>
          <p><strong>Category :</strong> {category}</p>
            <p><strong>Description :</strong> {description}</p>
            <p><strong>Ingredients :</strong> {ingredients}</p>
            <p><strong>Recipe :</strong> {recipe}</p>
            <p><strong>UserID :</strong> {userID}</p>
            <p><strong>UserEmail :</strong> {userEmail}</p>
            <Button
                variant="danger"
                className="w-100 align-self-center ownerPageBtn"
                onClick={approveRecipe}
             >
              Approve Recipe
            </Button>
        </div>
        <div className="col d-lg-none">
          <HrTag></HrTag>
        </div>
      </div>
    </div>
    
  );
};

export default PendingApprovalListCard;
