import React from 'react';
import {useHistory} from 'react-router-dom';
import {Container, Nav} from 'react-bootstrap';

export default function Header(){

    const history= useHistory();

    const navigateDashboard=(link)=>history.push(link);

    const logoutUser=()=>{
        localStorage.setItem('auth-token','');
        history.push('/login');
    }

    return (
        <>
        <Container>
            <h3>CRM App</h3>

        <Nav>
            {/* <Nav.Link onClick={()=>{navigateDashboard('/dashboard')}}>Dashboard</Nav.Link> */}
            <Nav.Link onClick={()=>{navigateDashboard('/leads')}}>Leads</Nav.Link>
            <Nav.Link onClick={()=>{navigateDashboard('/users')}}>Users</Nav.Link>
            <Nav.Link onClick={()=>{navigateDashboard('/service-requests')}}>Service requests</Nav.Link>
            {/* <Nav.Link onClick={()=>{navigateDashboard('/contacts')}}>Contacts</Nav.Link> */}
            <Nav.Link onClick={()=>{logoutUser()}}>Logout</Nav.Link>
        </Nav>

        </Container>
        </>
    )

}