import { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Container, Modal } from "react-bootstrap";

import Header from "./Header";

const API_URL = "http://localhost:3001/users";

export default function ListUsers() {
  const [userList, setUserList] = useState([]);
  const [warning, setWarning] = useState(false);
  // const [addUser,setAddUser]= useState(false);

  const getUsers = async () => {
    console.log("Local storage", localStorage.getItem("auth-token"));
    const { data } = await axios.get(`${API_URL}`);
    console.log(data);
    setUserList([...data]);
  };

  // const editUser=(id)=>{
  //     console.log(id);
  // }

  const deleteUser = async (id) => {
    const userSelected = userList.filter((user) => {
      return user._id === id;
    });
    const userType = userSelected[0].userType;
    if (userType !== "Admin") {
      const { data } = await axios.delete(`${API_URL}/${id}`);
      console.log(data.status);
      getUsers();
      // console.log(id);
    } else {
      setWarning(true);
    }
  };

  const handleClose = () => setWarning(false);

  // const handleShow=()=>setAddUser(true);
  // const handleClose=()=>{
  //     setAddUser(false);
  //     getUsers();
  // }

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <Container>
      <Header />
      <h4>Users</h4>
      {/* <Button onClick={handleShow}>Add new</Button> */}
      {/* <Modal show={addUser} onHide={handleClose}>
            <Modal.Header closeButton>
                <h3>Add user</h3>
            </Modal.Header>
            <Modal.Body>
                <RegisterUser type='user'/>
            </Modal.Body>
        </Modal> */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>First name</th>
            <th>Last name</th>
            <th>Email</th>
            <th>Type</th>
            <th colSpan="2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {userList.map((user, index) => {
            return (
              <tr key={index}>
                <th>{user.name[0]}</th>
                <th>{user.name[1]}</th>
                <th>{user.email}</th>
                <th>{user.userType}</th>
                {/* {/* <th><Button onClick={()=>editUser(user._id)}>Edit</Button></th> */}
                <th>
                  <Button variant="danger" onClick={() => deleteUser(user._id)}>
                    Delete
                  </Button>
                </th>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <Modal show={warning} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Body>Admin user cannot be deleted</Modal.Body>
        </Modal.Header>
      </Modal>
    </Container>
  );
}
