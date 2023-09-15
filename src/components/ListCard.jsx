import React, { useContext } from "react";
import "./styling/ListCard.css";
import { useState, useEffect } from "react";
import { useFirebase } from "../context/firebase";
import NameDisplaySm from "./NameDisplaySm";
import HrTag from "./HrTag";
import { Button } from "react-bootstrap";
import ReviewBar from "./ReviewBar";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { userProfileContext } from "../pages/UserProfile";
import ConfirmationComponent from "./ConfirmationComponent";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import SplitButton from "react-bootstrap/SplitButton";
import ButtonGroup from "react-bootstrap/ButtonGroup";
const ListCard = ({
  heading,
  description,
  author,
  imageURL,
  viewHandler,
  identity,
  category,
  authorHandler,
  seeReviewsHandler,
}) => {
  const [URL, setURL] = useState(null);
  const [lgShow, setLgShow] = useState(false);
  const firebase = useFirebase();
  const [ReviewPoints, setReviewPoints] = useState(0);
  const [Review, setReview] = useState("");
  const userIsSame = useContext(userProfileContext);
  const [ReviewCount, setReviewCount] = useState(0);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [userIsLoggedIn, setuserIsLoggedIn] = useState(
    firebase.getUserisLoggedIn()
  );
  const navigate = useNavigate();
  const reviewHandler = (num) => {
    setReviewPoints(num);
    if (!firebase.User) {
      firebase.setLastViewedPage(document.location.hash.substring(1))
      navigate("/login");
    } else {
      setLgShow(true);
    }
  };
  const changeHandler = (e) => {
    setReview(e.target.value);
  };
  const confirmReviewHandler = async () => {
    setLgShow(false);
    const userDetails = await firebase.getUserDetails();
    firebase.addReviewToRecipe(identity, userDetails, Review, ReviewPoints);
  };
  const deleteHandler = async () => {
    handleShow();
  };
  const deleteRecipe = async () => {
    await firebase.deleteRecipeByName(heading);
    handleClose();
  };
  useEffect(() => {
    const fetchData = async () => {
      await firebase.getImageURL(imageURL).then((URL) => setURL(URL));
      const reviews = await firebase.getReviewsOfRecipe(identity);
      if (reviews != []) {
        setReviewCount(reviews.docs.length);
      }
    };
    fetchData();
  }, [imageURL]);
  return (
    <div className="col-11 col-lg-5 listCard-row">
      {show ? (
        <ConfirmationComponent
          heading={"Confirm Delete"}
          body={"Are you sure you want to delete?"}
          onConfirmText={"Delete"}
          onConfirmHandler={deleteRecipe}
          handleClose={handleClose}
          handleShow={handleShow}
        ></ConfirmationComponent>
      ) : (
        ""
      )}

      <div className="row list-card">
        <div className="col-12">
        {userIsSame ? (
            <i
              className="fa-solid fa-xmark list-card-option-icon"
              onClick={deleteHandler}
            ></i>
          ) : (
            ""
          )}
        </div>
        <div className="col-5 col-lg-6 m-0 p-0 align-self-center">
          <img src={URL} alt="" className="listCard-image" />
        </div>
        <div className="col-7 col-lg-6 align-self-center listcard-text">
          
          {/* //!-----------------------------------------ReviewBar */}
          <div className="row">
            <div className="col review-Bar" id={identity}>
              <ReviewBar handler={reviewHandler}></ReviewBar>
            </div>
          </div>
          {/* //!-----------------------------------------Modal */}
          <>
            <Modal
              size="lg"
              show={lgShow}
              onHide={() => setLgShow(false)}
              aria-labelledby="example-modal-sizes-title-lg"
            >
              <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-lg">
                  Add A Review
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form.Group className="mb-3">
                  <Form.Control
                    as="textarea"
                    rows={5}
                    type="text"
                    placeholder="Give A Review"
                    className="form-text-area"
                    onChange={changeHandler}
                    required
                  />
                </Form.Group>
                <div className="row m-0 justify-content-center mb-5 mt-3">
                  <div className="col p-0 text-center">
                    <Button
                      variant="danger"
                      className="w-50"
                      type="submit"
                      onClick={confirmReviewHandler}
                    >
                      Confirm Review
                    </Button>
                  </div>
                </div>
              </Modal.Body>
            </Modal>
          </>
          {/* //!-----------------------------------------Data */}
          <h6 className="list-card-heading">{heading}</h6>
          <p>{description}</p>
          <p onClick={authorHandler} style={{ cursor: "pointer" }}>
            <strong>By :</strong> {author}
          </p>
          <p>
            <strong>Category :</strong> {category}
          </p>
          <div className="row">
            <div className="col">
              <Button
                className="imageCard-button listCard-Button"
                onClick={viewHandler}
              >
                View
              </Button>
            </div>
            <div
              className="col text-secondary text-end reviewText cursor align-self-center"
              onClick={seeReviewsHandler}
            >
              ({ReviewCount}) Reviews
            </div>
          </div>
        </div>
        <div className="col d-lg-none">
          <HrTag></HrTag>
        </div>
      </div>
    </div>
  );
};

export default ListCard;
