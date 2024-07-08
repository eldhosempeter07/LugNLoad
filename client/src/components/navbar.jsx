import React from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
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
            <NavDropdown
              title="Hauler"
              id="navbarScrollingDropdown"
              className=" primary-color"
            >
              <NavDropdown.Item
                as={Link}
                to="/hauler"
                className="text-center text-uppercase fw-bold primary-color"
              >
                Haulers Posts
              </NavDropdown.Item>

              <NavDropdown.Item
                as={Link}
                to="/hauler/create"
                className="text-center text-uppercase fw-bold primary-color"
              >
                Create Post
              </NavDropdown.Item>

              <NavDropdown.Item
                as={Link}
                to="/hauler/users/find"
                className="text-center text-uppercase fw-bold primary-color"
              >
                Find Users
              </NavDropdown.Item>

              <NavDropdown.Item
                as={Link}
                to="/hauler/requests"
                className="text-center text-uppercase fw-bold primary-color"
              >
                Requests
              </NavDropdown.Item>
            </NavDropdown>
            {/* Hauler  */}
            <NavDropdown title="User" id="navbarScrollingDropdown">
              <NavDropdown.Item
                as={Link}
                to="/haul/create"
                className="text-center  text-uppercase fw-bold primary-color"
              >
                Create Post
              </NavDropdown.Item>

              <NavDropdown.Item
                as={Link}
                to="/requests/find"
                className="text-center  text-uppercase fw-bold primary-color"
              >
                Find Haulers
              </NavDropdown.Item>

              <NavDropdown.Item
                as={Link}
                to="/requests"
                className="text-center  text-uppercase fw-bold primary-color"
              >
                Requests
              </NavDropdown.Item>
            </NavDropdown>
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
