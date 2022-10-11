import { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Modal, Form, Container } from "react-bootstrap";

import Header from "./Header";

const API_URL = "https://surjith-crm-app.herokuapp.com/requests";

export default function ListUsers() {
  const [leadsList, setLeadsList] = useState([]);
  const [requirement, setRequirement] = useState("");
  const [description, setDescription] = useState("");
  const [contact, setContact] = useState("");
  const [getStatus] = useState([
    "Created",
    "Open",
    "In process",
    "Released",
    "Canceled",
    "Completed",
  ]);
  const [getContacts, setGetContacts] = useState([]);
  const [status, setStatus] = useState("New");
  const [newRequest, setNewRequest] = useState(false);
  const [addUpdate, setAddUpdate] = useState("Add");
  const [tempId, setTempId] = useState();

  const handleInput = ({ target: { name, value } }) => {
    if (name === "requirement") setRequirement(value);
    if (name === "description") setDescription(value);
    if (name === "contact") setContact(value);
    if (name === "status") setStatus(value);
  };

  const addRequest = async (e) => {
    e.preventDefault();
    let data;
    if (addUpdate === "Add") {
      if (status === null) setStatus("New");
      data = await axios.post(`${API_URL}`, {
        requirement,
        description,
        contact,
        status,
      });
    } else if (addUpdate === "Update") {
      data = await axios.put(`${API_URL}/${tempId}`, {
        requirement,
        description,
        contact,
        status,
      });
    }
    console.log(data.response);
    setNewRequest(false);
    clearState();
    getRequests();
  };

  const clearState = () => {
    setRequirement("");
    setDescription("");
    setContact("");
    setStatus("New");
  };

  const handleShow = () => {
    setNewRequest(true);
    setAddUpdate("Add");
  };
  const handleClose = () => setNewRequest(false);

  const getRequests = async () => {
    const { data } = await axios.get(`${API_URL}`);
    console.log(data);
    setLeadsList([...data]);
  };

  const getContactDetails = async () => {
    const { data } = await axios.get(
      `https://surjith-crm-app.herokuapp.com/contacts`
    );
    setGetContacts([...data]);
  };

  const editRequest = (id) => {
    try {
      const leads = [...leadsList];
      console.log(leads);
      const index = leads.findIndex((eachLead) => eachLead._id === id);
      const selectedRequest = leads[index];
      console.log(selectedRequest, index);
      setRequirement(selectedRequest.requirement);
      setDescription(selectedRequest.description);
      setContact(selectedRequest.contact);
      setStatus(selectedRequest.status);
      setAddUpdate("Update");
      setTempId(selectedRequest._id);
      setNewRequest(true);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteRequest = async (id) => {
    const { data } = await axios.delete(`${API_URL}/${id}`);
    console.log(data.status);
    getRequests();
    //    if(data.status==200) {
    //        getUsers();
    //    }
    console.log(id);
  };

  useEffect(() => {
    getRequests();
    getContactDetails();
    setAddUpdate("Add");
  }, []);

  return (
    <Container>
      <Header />
      <h4>Service requests</h4> <br />
      <Button onClick={handleShow}>Add new</Button>
      <Modal show={newRequest} onHide={handleClose}>
        <Modal.Header closeButton>
          <h3>{addUpdate} service request</h3>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Requirement</Form.Label>
              <Form.Control
                value={requirement}
                name="requirement"
                onChange={handleInput}
              ></Form.Control>
              <Form.Label>Description</Form.Label>
              <Form.Control
                value={description}
                name="description"
                onChange={handleInput}
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Contact</Form.Label>
              <Form.Select
                value={contact}
                type="dropdown"
                name="contact"
                onChange={handleInput}
              >
                {getContacts.map((contact, index) => {
                  return (
                    <option key={index} value={contact.email}>
                      {contact.email}
                    </option>
                  );
                })}
              </Form.Select>
              <Form.Group>
                <Form.Label>Status</Form.Label>
                <Form.Select
                  value={status}
                  type="dropdown"
                  name="status"
                  onChange={handleInput}
                >
                  {getStatus.map((eachStatus, index) => {
                    return (
                      <option key={index} value={eachStatus}>
                        {eachStatus}
                      </option>
                    );
                  })}
                </Form.Select>
              </Form.Group>
              <Button type="submit" onClick={addRequest}>
                {addUpdate}
              </Button>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
      <br />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Requirment</th>
            <th>Description</th>
            <th>Contact</th>
            <th>Status</th>
            <th colSpan="2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {leadsList.map((lead, index) => {
            return (
              <tr key={index}>
                <th>{lead.requirement}</th>
                <th>{lead.description}</th>
                <th>{lead.contact}</th>
                <th>{lead.status}</th>
                <th>
                  <Button
                    variant="warning"
                    onClick={() => editRequest(lead._id)}
                  >
                    Edit
                  </Button>
                  &nbsp;
                  <Button
                    variant="danger"
                    onClick={() => deleteRequest(lead._id)}
                  >
                    Delete
                  </Button>
                </th>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Container>
  );
}
