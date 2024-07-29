import React, { useEffect, useState } from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const NavBar = () => {
  const isAuthenticated = !!localStorage.getItem("token");
  const userType = localStorage.getItem("type");
  const navigate = useNavigate();
  const [type, setType] = useState("");

  console.log(type);
  useEffect(() => {
    setType(localStorage.getItem("type"));
  }, []);

  const handleLogout = React.useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("type");
    if (type === "User") {
      navigate("/login");
    } else {
      navigate("/hauler-login");
    }
  }, [navigate]);

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

          {isAuthenticated && userType === "User" ? (
            <Nav className="mx-auto">
              <Nav.Link className=" text-uppercase" as={Link} to="/haul/posts">
                Posts
              </Nav.Link>
              <Nav.Link className=" text-uppercase" as={Link} to="/haul/create">
                Create Post
              </Nav.Link>

              <Nav.Link
                className=" text-uppercase"
                as={Link}
                to="/requests/find"
              >
                Find Haulers
              </Nav.Link>

              <Nav.Link className=" text-uppercase" as={Link} to="/requests">
                Requests
              </Nav.Link>

              <Nav.Link
                className=" text-uppercase"
                as={Link}
                to="/haul/profile"
              >
                Profile
              </Nav.Link>
            </Nav>
          ) : null}

          {isAuthenticated && userType === "Hauler" ? (
            <Nav className="mx-auto">
              <Nav.Link
                className=" text-uppercase"
                as={Link}
                to="/hauler/create"
              >
                Create Post
              </Nav.Link>
              <Nav.Link
                className=" text-uppercase"
                as={Link}
                to="/hauler/users/find"
              >
                Find Users
              </Nav.Link>

              <Nav.Link className=" text-uppercase" as={Link} to="/hauler">
                Haulers Posts
              </Nav.Link>

              <Nav.Link
                className=" text-uppercase"
                as={Link}
                to="/hauler/requests"
              >
                Requests
              </Nav.Link>
              <Nav.Link
                className=" text-uppercase"
                as={Link}
                to="/hauler/profile"
              >
                Profile
              </Nav.Link>
            </Nav>
          ) : null}
          {!isAuthenticated ? (
            <Nav className="mx-auto">
              <NavDropdown title="Login" className="text-uppercase">
                <NavDropdown.Item
                  className="text-uppercase"
                  as={Link}
                  to="/login"
                >
                  User
                </NavDropdown.Item>
                <NavDropdown.Item
                  className="text-uppercase"
                  as={Link}
                  to="/hauler-login"
                >
                  Hauler
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          ) : (
            <Nav>
              <Nav.Link className=" text-uppercase" onClick={handleLogout}>
                Logout
              </Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
