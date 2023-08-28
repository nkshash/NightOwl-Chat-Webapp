import React from 'react';
import Logo from './LogoAnimation';
import {useSelector} from 'react-redux';
import {useLogoutUserMutation} from '../services/appApi';
import {Nav,Navbar,Container,NavDropdown,Button} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
function Navigation() {
  const user=useSelector((state)=>state.user);
  const [logoutUser]=useLogoutUserMutation();
  async function handleLogout(e){
    e.preventDefault();
    await logoutUser(user);
    //
    window.location.replace("/");




  }
  return (
    <Navbar bg="dark" data-bs-theme="dark" expand="lg" className="bg-body-tertiary">
      <Container>
      <LinkContainer to='/'>
      <Navbar.Brand ><Logo/></Navbar.Brand>
            </LinkContainer >
      
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
          {!user &&(
            <LinkContainer to='/login'>
            <Nav.Link href="#link">Login</Nav.Link>
            </LinkContainer >)}
          <LinkContainer to='/chat'>
            <Nav.Link href="#link">Chat</Nav.Link>
            </LinkContainer >
           
             {user &&(
            <NavDropdown title={<>
              <img src={user.picture} style={{width:30,height:30,marginRight:10,objectFit:"cover",borderRadius:"50%",zIndex:"99"  }}/>
              {user.name}</>
            } id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              
              <NavDropdown.Item href="#action/3.4">
                <Button variant="warning" onClick={handleLogout}>Logout</Button>
              </NavDropdown.Item>
            </NavDropdown>)}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Navigation
