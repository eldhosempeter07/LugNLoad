import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav>
            <li className="nav-item primary-color">
              <a className="navbar-brand secondary-color fw-bold" href="/">
                <span className="primary-color">L</span>UG
                <span className="primary-color">NL</span>
                OAD
              </a>
            </li>
          </Nav>

          <Nav className="mx-auto">
            <Nav.Item>
              <Link to="/haul/create" className="nav-link primary-color">
                Create Post
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link to="/requests/find" className="nav-link primary-color">
                Find Hauls
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link to="/requests" className="nav-link primary-color">
                Requests
              </Link>
            </Nav.Item>
          </Nav>

          <Nav>
            <li className="nav-item dropdown">
              <a className="nav-link " href="#">
                Profile
              </a>
            </li>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
