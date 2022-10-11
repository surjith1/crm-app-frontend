import { useState } from "react";
import axios from "axios";
import { Form, Button, Container, Modal } from "react-bootstrap";

const API_URL = "https://surjith-crm-app.herokuapp.com/users";

export default function Register(props) {
  console.log(props);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("Admin");
  const [warning, setWarning] = useState(false);
  const [message, setMessage] = useState();

  const handleInput = ({ target: { name, value } }) => {
    if (name === "firstname") setFirstName(value);
    if (name === "lastname") setLastName(value);
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
    if (name === "usertype") setUserType(value);
    console.log(userType);
  };

  const registerUser = async (e) => {
    e.preventDefault();
    await axios
      .post(`${API_URL}`, {
        name: [firstName, lastName],
        email,
        password,
        userType,
        verified: false,
      })
      .then(function (res) {
        if (res.data) {
          if (res.status === 200) {
            setWarning(true);
            setMessage(
              "Check your Inbox/spam folder on your email for the verification link"
            );
          }
        }
      })
      .catch(function (err) {
        if (err.response) {
          if (err.response.status === 400) {
            setWarning(true);
            setMessage("User already exists");
          }
        }
      });
  };

  const handleClose = () => setWarning(false);

  return (
    <Container>
      <h1>Register</h1>
      <Form>
        <Form.Group>
          <Form.Label>First name</Form.Label>
          <Form.Control
            value={firstName}
            name="firstname"
            onChange={handleInput}
          ></Form.Control>
          <Form.Label>Last name</Form.Label>
          <Form.Control
            value={lastName}
            name="lastname"
            onChange={handleInput}
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control
            value={email}
            name="email"
            onChange={handleInput}
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            value={password}
            name="password"
            onChange={handleInput}
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>User type</Form.Label>
          <Form.Select
            value={userType}
            type="dropdown"
            name="usertype"
            onChange={handleInput}
          >
            <option value="Admin">Admin</option>
            <option value="Manager">Manager</option>
            <option value="Employee">Employee</option>
          </Form.Select>
        </Form.Group>
        <br />
        {/* <Form.Group> */}
        <Button type="submit" onClick={registerUser}>
          Register
        </Button>
        {props.type === "user" ? (
          <p></p>
        ) : (
          <Button
            variant="link"
            onClick={() => {
              props.history.push("/login");
            }}
          >
            Already have an account? Login here
          </Button>
        )}
        {/* </Form.Group> */}
      </Form>
      <Modal show={warning} onHide={handleClose}>
        <Modal.Header closeButton>
          {/* <Modal.Title>Verfiy email</Modal.Title> */}
        </Modal.Header>
        <Modal.Body>{message}</Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => {
              props.history.push("/login");
            }}
          >
            Proceed to login
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
