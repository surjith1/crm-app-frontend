import { useState } from "react";
import axios from "axios";
import { Form, Button, Container, Modal } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const API_URL = "http://localhost:3001/users";

export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const [warning, setWarning] = useState(false);
  const [message, setMessage] = useState(false);

  const userLogin = async (e) => {
    e.preventDefault();
    await axios
      .post(`${API_URL}/login`, {
        email,
        password,
      })
      .then(function (res) {
        console.log(res);
        if (res.data) {
          if (res.status === 200) {
            setMessage("Login success redirecting...");
            setWarning(true);
            localStorage.setItem("auth-token", res.data);
            setTimeout(() => {
              setWarning(false);
              history.push("/leads");
            }, 2000);
          }
        }
      })
      .catch(function (err) {
        if (err.response) {
          if (err.response.status === 400) {
            setMessage("User not found");
            setWarning(true);
          } else if (err.response.status === 403) {
            setMessage("Invalid email or password");
            setWarning(true);
          } else if (err.response.status === 401) {
            setMessage("Verify your email before logging in");
            setWarning(true);
          }
        }
      });
  };

  const handleUserName = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleClose = () => setWarning(false);

  return (
    <Container>
      <h1 className="text-center">Login</h1>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your email"
            value={email}
            onChange={handleUserName}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="passsword"
            placeholder="Enter your password"
            value={password}
            onChange={handlePassword}
          ></Form.Control>
        </Form.Group>
        <Button type="submit" variant="primary" onClick={userLogin}>
          Login
        </Button>
        <Button
          variant="link"
          onClick={() => {
            props.history.push("/register");
          }}
        >
          Do not have an account? Register here
        </Button>
      </Form>

      <Modal show={warning} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>{message}</Modal.Body>
      </Modal>
    </Container>
  );
}
