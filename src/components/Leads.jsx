import { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Modal, Form, Container } from "react-bootstrap";

import Header from "./Header";
import Alert from "./Alerts";

const API_URL = "https://surjith-crm-app.herokuapp.com/leads";

export default function ListUsers() {
  const [leadsList, setLeadsList] = useState([]);
  const [requirement, setRequirement] = useState("");
  const [description, setDescription] = useState("");
  const [contact, setContact] = useState("");
  const [getStatus] = useState([
    "New",
    "Contacted",
    "Qualified",
    "Lost",
    "Canceled",
    "Confirmed",
  ]);
  const [getContacts, setGetContacts] = useState([]);
  const [status, setStatus] = useState("New");
  const [newLead, setNewLead] = useState(false);
  const [addUpdate, setAddUpdate] = useState("Add");
  const [tempId, setTempId] = useState();

  const handleInput = ({ target: { name, value } }) => {
    if (name === "requirement") setRequirement(value);
    if (name === "description") setDescription(value);
    if (name === "contact") setContact(value);
    if (name === "status") setStatus(value);
  };

  const addUpdateLead = async (e) => {
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
    setNewLead(false);
    clearState();
    <Alert />;
    getLeads();
  };

  const clearState = () => {
    setRequirement("");
    setDescription("");
    setContact("");
    setStatus("New");
  };

  const handleShow = () => {
    setNewLead(true);
    setAddUpdate("Add");
  };
  const handleClose = () => setNewLead(false);

  const getLeads = async () => {
    const { data } = await axios.get(`${API_URL}`);
    console.log(data);
    setLeadsList([...data]);
  };

  const getContactDetails = async () => {
    const { data } = await axios.get(
      `https://siva-crm-node.herokuapp.com/contacts`
    );
    setGetContacts([...data]);
  };

  const editLead = (id) => {
    try {
      const leads = [...leadsList];
      console.log(leads);
      const index = leads.findIndex((eachLead) => eachLead._id === id);
      const selectedLead = leads[index];
      console.log(selectedLead, index);
      setRequirement(selectedLead.requirement);
      setDescription(selectedLead.description);
      setContact(selectedLead.contact);
      setStatus(selectedLead.status);
      setAddUpdate("Update");
      setTempId(selectedLead._id);
      setNewLead(true);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteLead = async (id) => {
    const { data } = await axios.delete(`${API_URL}/${id}`);
    console.log(data.status);
    getLeads();
    //    if(data.status==200) {
    //        getUsers();
    //    }
    console.log(id);
  };

  useEffect(() => {
    getLeads();
    getContactDetails();
    setAddUpdate("Add");
  }, []);

  return (
    <Container>
      <Header />
      <h4>Leads</h4>
      <Button onClick={handleShow}>Add new</Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Requirment</th>
            <th>Description</th>
            <th>Contact</th>
            <th>Status</th>
            <th colSpan="2" className="text-center">
              Actions
            </th>
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
                  <span>
                    <Button
                      variant="warning"
                      onClick={() => editLead(lead._id)}
                    >
                      Edit
                    </Button>
                  </span>
                  &nbsp;{" "}
                  <span>
                    <Button
                      variant="danger"
                      onClick={() => deleteLead(lead._id)}
                    >
                      Delete
                    </Button>
                  </span>
                </th>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <Modal show={newLead} onHide={handleClose}>
        <Modal.Header closeButton>
          <h3>{addUpdate} lead</h3>
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
                    <option key={index} value={contact.name}>
                      {contact.name}
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
              <Button type="submit" onClick={addUpdateLead}>
                {addUpdate}
              </Button>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
}
