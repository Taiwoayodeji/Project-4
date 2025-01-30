import React, { useState } from 'react';
import { Button, Col, Form, Row, Container } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function Login({ setUser }) {
  const [formData, setFormData] = useState({
    user_name: '',
    user_password: '',
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Use useNavigate hook for navigation

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    try {
      const response = await axios.get('http://localhost:3001/api/users', {
        params: {
          user_name: formData.user_name,
          user_password: formData.user_password,
        },
      });

      if (response.data) {
        setUser({
          user_id: response.data.user_id,
          user_name: response.data.user_name,
        });
        console.log('Login successful', response.data);
        navigate("/questions"); // Redirect to questions page after successful login
      } else {
        setError("Invalid username or password");
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Login failed. Please try again.');
    }
  };

  return (
    <Container className="mt-5">
      <Form noValidate onSubmit={handleSubmit} className="p-4 custom-form">
        <h2 className="text-center mb-4">Welcome Back</h2>

        {/* Display error message if there's an error */}
        {error && <div className="alert alert-danger">{error}</div>}

        <Row className="mb-3">
          <Form.Group as={Col} md="12">
            <Form.Label>Username</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Enter your username"
              name="user_name"
              value={formData.user_name}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group as={Col} md="12">
            <Form.Label>Password</Form.Label>
            <Form.Control
              required
              type="password"
              placeholder="Enter your password"
              name="user_password"
              value={formData.user_password}
              onChange={handleChange}
            />
          </Form.Group>
        </Row>

        <Button type="submit" className="w-100">
          Login
        </Button>
      </Form>
    </Container>
  );
}