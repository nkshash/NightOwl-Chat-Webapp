import React from 'react'
import Sidebar from '../components/Sidebar'
import Message from '../components/Message'
import {Row,Col,Container } from 'react-bootstrap'
function Chat() {
  return (
    <Container fluid>
      <Row>
        <Col md={4}><Sidebar/></Col>
        <Col md={8}><Message/></Col>

   
      
      </Row>

      </Container>
    
  )
}

export default Chat
