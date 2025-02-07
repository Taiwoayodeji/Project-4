import React, { useState } from 'react';
import { Button, Col, Form, Row, Container } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
  const [formData, setFormData] = useState({
    user_name: '',   
    user_password: '',
    user_email: '',
    confirm_password: '',
  });

  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage(''); // Clear any previous error message
  
    // Check if passwords match
    if (formData.user_password !== formData.confirm_password) {
      setErrorMessage('Passwords do not match.');
      return;
    }
  
    try {
      // Send sign-up request to the server
      const response = await axios.post('http://localhost:3001/api/users', {
        user_name: formData.user_name,
        user_password: formData.user_password,
        user_email: formData.user_email,
      });
  
      console.log("Backend response:", response.data); // Log the response
  
      // Handle successful sign-up
      if (response.data.success) {
        console.log('Sign-up successful:', response.data);
  
        // Clear the form
        setFormData({
          user_name: '',
          user_password: '',
          user_email: '',
          confirm_password: '',
        });
  
        // Clear error message after success
        setErrorMessage('');
  
        // Redirect to the login page
        navigate('/login');
      } else {
        // Handle backend errors (e.g., duplicate email)
        setErrorMessage(response.data.error || 'Sign-up failed. Please try again.');
      }
    } catch (error) {
      console.error('Sign-up error:', error);
      console.error('Error response:', error.response); // Log the error response
      // Display a fallback error message if the backend did not provide one
      setErrorMessage(error.response?.data?.error || 'An error occurred during sign-up. Please try again.');
    }
  };  

  return (
    <Container className="mt-5">
      <Form noValidate onSubmit={handleSubmit} className="p-4 custom-form">
        <h2 className="text-center mb-4">Create an Account</h2>

        {/* Display error message if there's an error */}
        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

        <Row className="">
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
        </Row>

        <Row className="">
          <Form.Group as={Col} md="12">
            <Form.Label>Email</Form.Label>
            <Form.Control
              required
              type="email"
              placeholder="Enter your email"
              name="user_email"
              value={formData.user_email}
              onChange={handleChange}
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
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

        <Row className="mb-3">
          <Form.Group as={Col} md="12">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              required
              type="password"
              placeholder="Confirm your password"
              name="confirm_password"
              value={formData.confirm_password}
              onChange={handleChange}
            />
          </Form.Group>
        </Row>

        <Button type="submit" className="w-100">
          Sign Up
        </Button>
      </Form>
    </Container>
  );
}
