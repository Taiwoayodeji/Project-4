import React, { useState } from 'react';
import { Button, Col, Form, Row, Container } from 'react-bootstrap';
import axios from 'axios';

export default function Login({ setUser }) {
  const [formData, setFormData] = useState({
    user_name: '',
    user_password: '',
  });
  const [error, setError] = useState(null); 

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null); 

    try {
      const { data } = await axios.post('http://localhost:3001/login', formData);
      
      
      if (data.success) {
        setUser({ user_id: data.user.user_id, user_name: data.user.user_name });
        console.log('Login successful:', data.user);
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Invalid username or password');
    }
  };

  return (
    <Container className="mt-5">
      <Form noValidate onSubmit={handleSubmit} className="p-4 custom-form">
        <h2 className="text-center mb-4">Welcome Back</h2>

        {error && <div className="alert alert-danger">{error}</div>} {/* Display error */}

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

        <Button type="submit" className="w-100">Login</Button>
      </Form>
    </Container>
  );
}
