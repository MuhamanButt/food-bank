import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MyNavbar from "../components/Navbar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Title from "../components/Title";
import { useFirebase } from "../context/firebase";
import { Alert } from "react-bootstrap";

const LoginPage = () => {
  const navigate = useNavigate();
  const firebase = useFirebase();
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [logOut, setlogOut] = useState(firebase.getUserisLoggedIn());
  const [login, setlogin] = useState(!firebase.getUserisLoggedIn());

  const [userIsLoggedIn, setuserIsLoggedIn] = useState(
    firebase.getUserisLoggedIn()
  );

  const logOutHandler = async () => {
    await firebase.signOutUser();
    setuserIsLoggedIn(firebase.getUserisLoggedIn());
    setlogin(firebase.getUserisLoggedIn())
    setlogOut(firebase.getUserisLoggedIn())
  };
  const signInuserHandler = async () => {
    Email ? setEmail(Email) : setEmail(" ");
    Password ? setPassword(Password) : setPassword(" ");
    if (! await firebase.isOwnerEmail(Email)) {
      if (firebase.OwnerState) {
        firebase.setOwnerState(false);
        await firebase.signOutOwner();
      }
      if (await firebase.signInuserWithEmailandPassword(Email, Password)) {
        setuserIsLoggedIn(true);
        document
          .getElementById("alert-loginpage-success")
          .classList.remove("d-none");
          setTimeout(() => {
            if(document.getElementById("alert-loginpage-success"))
            document
              .getElementById("alert-loginpage-success")
              .classList.add("d-none");
          }, 2000);
          setlogOut(true);
          setlogin(false)
          if(firebase.lastViewedPage!="/")
          {
            navigate(firebase.lastViewedPage)
            firebase.setLastViewedPage("/")
          }
      }

    }
    else
    {
      document.getElementById("alert-ownerSignIn-danger").classList.remove("d-none")
      setTimeout(() => {
        if(document.getElementById("alert-ownerSignIn-danger"))
        document
          .getElementById("alert-ownerSignIn-danger")
          .classList.add("d-none");
      }, 2000);
    }
  };
  useEffect(() => {
    
  }, [userIsLoggedIn]);
  const createAccountHandler = () => {
    navigate("/CreateAccount");
  };
  return (
    <div>
      <div id="userLoginPage">
        <MyNavbar></MyNavbar>
        <Title name={"Login"}></Title>
        <div id="alert-loginpage-success" className="d-none">
          <Alert variant="success">
            <Alert.Heading>Logged In Successfully!!</Alert.Heading>
          </Alert>
        </div>
        <div id="alert-ownerSignIn-danger" className="d-none">
          <Alert variant="danger">
            <Alert.Heading>Admin must login as Admin or by test account</Alert.Heading>
          </Alert>
        </div>
        <div id="alert-loginpage-error" className="d-none">
          <Alert variant="danger">
            <Alert.Heading>Invalid Email or Password</Alert.Heading>
          </Alert>
        </div>
        <div id="formRow" className="mx-5">
          <div
            data-aos="fade-right"
            data-aos-offset="300"
            data-aos-easing="ease-in-sine"
          >
            <div className="row justify-content-center">
              <div className="col col-md-6 p-0">
              <Form className="form">
              <Form.Group className="mb-3">
                <Form.Label className="form-label">Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  className="form-text-area"
                  value={Email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="form-label">Password</Form.Label>
                <Form.Control
                  type="password" id="Password" name="Password"
                  placeholder="Enter Password"
                  className="form-text-area"
                  value={Password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>
              <div className="row m-0 justify-content-center mt-3">
                <div className="col p-0 text-center">
                  {
                  login && 
                    <>
                    <Button
                      variant="danger"
                      className="w-75"
                      onClick={signInuserHandler}
                      id="loginBtn"
                    > Login
                    </Button>
                  <h6 className="text-white">OR</h6></>
                  }

                  <Button
                    variant="danger"
                    className="w-75"
                    onClick={createAccountHandler}
                  >Create New Account
                  </Button>
                </div>
              </div>
            </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
