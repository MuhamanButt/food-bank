import React from "react";
import { useFirebase } from "../context/firebase";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Title from "../components/Title";
import MyNavbar from "../components/Navbar";
import { Button } from "react-bootstrap";
import List from "../components/List";
import Loader from "../components/Loader";
import Review from "../components/Review";
const ReviewPage = () => {
  const [Reviews, setReviews] = useState([]);
  const [DataIsLoaded, setDataIsLoaded] = useState(false);
  const [ReviewsLength, setReviewsLength] = useState(0);
  const firebase = useFirebase();
  const params = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const reviews = await firebase.getReviewsOfRecipe(params.recipeId);
      setReviews(reviews);
      setDataIsLoaded(true);
      setReviewsLength(reviews.docs.length)
    };
    fetchData();
  }, [DataIsLoaded]);
  return (
    <div>
      <MyNavbar></MyNavbar>
      <Title name={"All Reviews"}></Title>
      {DataIsLoaded ? (
        ReviewsLength>0?(<>
            <div className="row justify-content-center px-3 px-md-0">
            {Reviews.docs.map((review,index) => (
              <Review
              key={index}
                userName={review.data().userName}
                reviewPoints={review.data().reviewPoints}
                Review={review.data().Review}
              ></Review>
            ))}
            </div>
          </>):(<h1 className="text-center text-danger" >No Reviews To Show...</h1>)
      ) : (
        <Loader text={"Stirring up something delicious..."}></Loader>
      )}
    </div>
  );
};

export default ReviewPage;
