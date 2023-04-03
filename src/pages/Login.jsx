import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap'

export const Login = () => {
  const [login, setLogin] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      if (!login.email && !login.password) { 
        setError('')
      }
    } catch (error) {
      console.log('error', error)
      setError(error.message);
    }
  };

  const handleChange = (event) => {
    const value = event.target.value
    const name = event.target.name

    setLogin({
      ...login,
      [name]: value
    })
  }

  return (
    <Container>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            required={true}
            name='email'
            type="email"
            placeholder="Enter email"
            onChange={handleChange}
            value={login.email}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            required={true}
            name='password'
            type="password"
            placeholder="Password"
            onChange={handleChange}
            value={login.password}
          />
        </Form.Group>

        <Button
          variant="primary"
          type="button"
          onClick={handleLogin}
        >
          Login
        </Button>
      </Form>
    </Container>
  );
};
