import React from "react";
import MyNavbar from "../components/Navbar";
import Title from "../components/Title";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { useFirebase } from "../context/firebase";
import { Alert } from "react-bootstrap";
const CreateAccount = () => {
  const firebase = useFirebase();
  const [userName, setuserName] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [limit, setlimit] = useState(0);
  const [name, setname] = useState("");
  const [Error, setError] = useState("");
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const createAccountHandler = () => {
    if (isValidEmail(Email)) {
      firebase
        .createUser(Email, Password, userName)
        .then(() => {
          document
            .getElementById("alert-createPage-success")
            .classList.remove("d-none");
          setTimeout(() => {
            if (document.getElementById("alert-createPage-success"))
              document
                .getElementById("alert-createPage-success")
                .classList.add("d-none");
          }, 2000);
        }).catch((error) => {
          setError(error)
          document
            .getElementById("alert-createPage-alreadyexists")
            .classList.remove("d-none");
          setTimeout(() => {
            if (document.getElementById("alert-createPage-alreadyexists"))
              document
                .getElementById("alert-createPage-alreadyexists")
                .classList.add("d-none");
          }, 2000);
        });
    } else {
      document
        .getElementById("alert-createPage-wrongEmail")
        .classList.remove("d-none");
      setTimeout(() => {
        if (document.getElementById("alert-createPage-wrongEmail"))
          document
            .getElementById("alert-createPage-wrongEmail")
            .classList.add("d-none");
      }, 2000);
    }
  };
  const userNameHandler = (e) => {
    e.target.value.length > 20
      ? invokeDangerAlert("Username", 20)
      : setuserName(e.target.value);
  };
  const passwordHandler = (e) => {
    e.target.value.length > 15
      ? invokeDangerAlert("Password", 15)
      : setPassword(e.target.value);
  };
  const emailHandler = (e) => {
    e.target.value.length > 35
      ? invokeDangerAlert("Email", 35)
      : setEmail(e.target.value);
  };
  const invokeDangerAlert = (text, num) => {
    setname(text);
    setlimit(num);
    document
      .getElementById("alert-createPage-danger")
      .classList.remove("d-none");
    setTimeout(() => {
      if (document.getElementById("alert-createPage-danger"))
        document
          .getElementById("alert-createPage-danger")
          .classList.add("d-none");
    }, 2000);
  };
  const isValidEmail = (email) => {
    return emailPattern.test(email);
  };
  return (
    <div>
      <MyNavbar></MyNavbar>
      <Title name={"Create Account"}></Title>
      <div id="formRow" className="mx-5">
        <div id="alert-createPage-success" className="d-none">
          <Alert variant="success">
            <Alert.Heading>Account Created Successfully!!</Alert.Heading>
          </Alert>
        </div>
        <div id="alert-createPage-danger" className="d-none">
          <Alert variant="danger">
            <Alert.Heading>
              {name} must be less than {limit} characters
            </Alert.Heading>
          </Alert>
        </div>
        <div id="alert-createPage-wrongEmail" className="d-none">
          <Alert variant="danger">
            <Alert.Heading>Invalid Email</Alert.Heading>
          </Alert>
        </div>
        <div id="alert-createPage-alreadyexists" className="d-none">
          <Alert variant="danger">
            <Alert.Heading>{Error.message}</Alert.Heading>
          </Alert>
        </div>
        <div
          data-aos="fade-right"
          data-aos-offset="300"
          data-aos-easing="ease-in-sine"
        >
          <div className="row justify-content-center">
            <div className="col col-md-6 p-0">
              <Form className="form" onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label className="form-label">UserName</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter UserName"
                    className="form-text-area"
                    value={userName}
                    onChange={(e) => userNameHandler(e)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label className="form-label">Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    className="form-text-area"
                    value={Email}
                    onChange={(e) => emailHandler(e)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label className="form-label">Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter Password"
                    className="form-text-area"
                    value={Password}
                    onChange={(e) => passwordHandler(e)}
                    required
                  />
                </Form.Group>
                <div className="row m-0 justify-content-center mb-5 mt-3">
                  <div className="col p-0 text-center">
                    <Button
                      variant="danger"
                      className="w-50"
                      type="submit"
                      onClick={createAccountHandler}
                    >
                      Create Account
                    </Button>
                  </div>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
