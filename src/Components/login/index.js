import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";

export const Login = ({ setPassword, setUsername }) => {
  const [usernameValue, setUsernameValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  const handleInputUsername = (e) => {
    setUsernameValue(e.target.value);
  };

  const handleInputPassword = (e) => {
    setPasswordValue(e.target.value);
  };
  const handlerSubmit = (e) => {
  
    e.preventDefault();
    setUsername(usernameValue);
    setPassword(passwordValue);
  };
  return (
    <Container style={{background: '#FFF', padding: '2em', marginTop: '3em' } } fluid = "md" >
       <h2>Login</h2> 
      <Form onSubmit={handlerSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            onChange={handleInputUsername}
          />
          <Form.Text className="text-muted">username : admin</Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={handleInputPassword}
          />
          <Form.Text className="text-muted">password : 123</Form.Text>
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};
