import React from "react";
import "./styling/Review.css";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Stars from "./stars";
const Review = ({ userName, reviewPoints, Review }) => {
  return (
    <div className="col-12 col-md-5 col-xl-4">
      <Card className="review-card-body">
        <ListGroup className="list-group-flush">
          <ListGroup.Item className="review-list-group-item-heading"><h5>{userName}</h5></ListGroup.Item>
          <ListGroup.Item className="review-list-group-item">{Review == "" ? ".." : Review}</ListGroup.Item>
          <ListGroup.Item className="review-list-group-item"><Stars count={reviewPoints}></Stars></ListGroup.Item>
        </ListGroup>
      </Card>
    </div>
  );
};

export default Review;
