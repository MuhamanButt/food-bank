import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import logo from './images/mainLogo.png';
import { NavLink } from "react-router-dom";
import './styling/navbar.css';
import { Offcanvas } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { useFirebase } from "../context/firebase";
import { useNavigate } from "react-router-dom";


const MyNavbar = () => {
  const firebase=useFirebase();
  const [showOffcanvas, setShowOffcanvas] = useState(false);
const [UserName, setUserName] = useState("");
  const handleShowOffcanvas = () => {
    setShowOffcanvas(true);
  };

  const handleCloseOffcanvas = () => {
    setShowOffcanvas(false);
  };

  const navigate=useNavigate();
  const deleteRecipe = async () => {
      navigate("/deleteRecipe");
  };
  const signOutHandler = async () => {
    navigate("/loginAsOwner");
    firebase.setOwnerState(false);
    await firebase.signOutOwner();
  };
  const approvalHandler = () => {
    navigate("/pendingApprovals");
  };
  useEffect(()=>{
    const invoke=async()=>{
      
      firebase.User&&setUserName(await firebase.getUserName(firebase.User.uid))
      
    }
    const url=window.location.href
    console.log(url)
    invoke();
  })
  return (
    <div>
      {firebase.OwnerState?(<>
      <Navbar expand="lg" className="navbar" data-bs-theme="dark">
        <Container>
          <Navbar.Brand as={NavLink} to={"/home"}><img src={logo} alt="" className="navbar-logo" /></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={NavLink} to={"/home"} className="Link btn-one">Home</Nav.Link>
              <Nav.Link as={NavLink} to={"/Recipe"} className="Link btn-one">Recipes</Nav.Link>
              <NavDropdown title="Categories" id="basic-nav-dropdown" className="Link dropDown dropdown-button">
                <NavDropdown.Item as={NavLink} to={"/categories/asian"} className="Link dropdown-item">Asian</NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to={"/categories/continental"} className="Link dropdown-item">Continental</NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to={"/categories/desserts"} className="Link dropdown-item">Desserts</NavDropdown.Item>
              </NavDropdown>
              {firebase.OwnerState ? (""):(<Nav.Link as={NavLink} to={"/addARecipe"} className="Link btn-one">Add A Recipe</Nav.Link>)}
              <NavDropdown title="Admin Options" id="basic-nav-dropdown" className="Link dropDown dropdown-button">
                  <Nav.Link onClick={approvalHandler} className="Link">Pending Approvals</Nav.Link>
                  <Nav.Link onClick={deleteRecipe} className="Link">Delete Recipe</Nav.Link>
                  <Nav.Link onClick={signOutHandler} className="Link">Logout</Nav.Link>
                </NavDropdown>
            </Nav>
            <Nav>
              <Button variant="outline-light" onClick={handleShowOffcanvas} className="text-start text-lg-end px-0 settings-btn">
                <FontAwesomeIcon icon={faCog} className="d-none d-lg-inline"/>{" "}
                <span className="d-lg-none">Settings</span>
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Offcanvas show={showOffcanvas} onHide={handleCloseOffcanvas} placement="end" className="offcanvas">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Settings</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav.Link as={NavLink} to={"/CreateAccount"} className="Link offcanvas-item">Create Account</Nav.Link>
          <Nav.Link as={NavLink} to={"/login"} className="Link offcanvas-item">Login as User</Nav.Link>
          <Nav.Link as={NavLink} to={"/loginAsOwner"} className="Link offcanvas-item">Login as Owner</Nav.Link>
        </Offcanvas.Body>
      </Offcanvas>
    </>):(<Navbar expand="lg" className="navbar" data-bs-theme="dark">
        <Container>
          <Navbar.Brand as={NavLink} to={"/home"}><img src={logo} alt="" className="navbar-logo" /></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" className="navbar-toggler"/>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={NavLink} to={"/home"} className="Link btn-one">Home</Nav.Link>
              <Nav.Link as={NavLink} to={"/Recipe"} className="Link btn-one">Recipes</Nav.Link>
              <NavDropdown title="Categories" id="basic-nav-dropdown" className="Link dropDown dropdown-button">
                <NavDropdown.Item as={NavLink} to={"/categories/asian"} className="Link dropdown-item">Asian</NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to={"/categories/continental"} className="Link dropdown-item">Continental</NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to={"/categories/desserts"} className="Link dropdown-item">Desserts</NavDropdown.Item>
              </NavDropdown>
              {firebase.OwnerState ? (""):(<Nav.Link as={NavLink} to={"/addARecipe"} className="Link btn-one">Add A Recipe</Nav.Link>)}
            </Nav>
            <Nav>
              <Button variant="outline-light" onClick={handleShowOffcanvas} className="text-start text-lg-end px-0 settings-btn">
                <FontAwesomeIcon icon={faCog} className="d-none d-lg-inline"/>{" "}
                <span className="d-lg-none">Settings</span>
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>)}

      <div
        className={`offcanvas offcanvas-end ${showOffcanvas ? 'show' : ''}`}
        tabIndex="-1"
        id="offcanvasRight"
        aria-labelledby="offcanvasRightLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasRightLabel">
            Settings
          </h5>
          <button type="button" className="btn-close btn-close-white" onClick={handleCloseOffcanvas} aria-label="Close"></button>
        </div>
        <div className="offcanvas-body">
          {firebase.User && <Nav.Link as={NavLink} to={`/users/view/profile/${firebase.User.uid}`} className="Link offcanvas-item">
           {UserName}
          </Nav.Link>}
          <Nav.Link as={NavLink} to={"/CreateAccount"} className="Link offcanvas-item">
            Create Account
          </Nav.Link>
          <Nav.Link as={NavLink} to={"/login"} className="Link offcanvas-item">
            Login as User
          </Nav.Link>
          <Nav.Link as={NavLink} to={"/loginAsOwner"} className="Link offcanvas-item">
            Login as Owner
          </Nav.Link>
        </div>
      </div>
      </div>
  );
};

export default MyNavbar;
{/* <button class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">Toggle right offcanvas</button>

<div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
  <div class="offcanvas-header">
    <h5 class="offcanvas-title" id="offcanvasRightLabel">Offcanvas right</h5>
    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div class="offcanvas-body">
    ...
  </div>
</div> */}

