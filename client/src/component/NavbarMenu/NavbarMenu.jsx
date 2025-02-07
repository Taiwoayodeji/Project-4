import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function NavbarMenu({ user, handleSignOut }) {
  return (
    <Navbar expand="lg" className="bg-white text-dark" variant="light" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/questions">Q/A</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
  
          {/* Right-aligned navigation */}
          <Nav>
            {user?.user_id ? (
              <Nav.Link as={Link} to="/questions">Questions</Nav.Link>
            ) : (
              <Nav.Link as={Link} to="/signup">Sign Up</Nav.Link>
            )}
          </Nav>

          <Nav className="ms-auto">
            {user?.user_id ? (
              <>
                <span className="me-3">Good Morning, {user?.user_name}</span>
                <button
                  onClick={handleSignOut}
                  className="btn btn-danger"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link to="/login">
                <button className="btn btn-primary">
                  Login
                </button>
              </Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
