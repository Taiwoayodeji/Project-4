import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';

export default function NavbarMenu({ user }) {
  return (
    <Navbar expand="lg" className="bg-white text-dark" variant="light" sticky="top">
      <Container>
        <Navbar.Brand href="/login">Q/A</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="d-flex justify-content-between">
          <Nav>
            <Nav.Link href="/questions">Questions</Nav.Link>
          </Nav>
          <Nav className="d-flex align-items-center">
            <span className="me-3">GOOD MORNING {user?.user_name}</span>
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="/signup">Sign Up</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
