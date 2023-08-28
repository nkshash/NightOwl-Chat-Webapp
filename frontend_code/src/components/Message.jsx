import React, { useState,useContext,useRef ,useEffect} from 'react'
import {Button , Col, Row, Form} from 'react-bootstrap'
import {useSelector} from "react-redux";
import {AppContext} from "../context/appContext";
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'


import '../assets/home.css'
function Message() {
  const [message,setMessage]=useState("");
  const user=useSelector((state)=>state.user);
  const{socket,currentRoom,setMessages,messages,privateMemberMsg}=useContext(AppContext);
  const messageEndRef=useRef(null);
  useEffect(()=>{
    scrollToBottom();
  },[messages]);
  const [showEmoji, setShowEmoji] = useState(false);
  const addEmoji = (e) => {
    const sym = e.unified.split("_");
    const codeArray = [];
    sym.forEach((el) => codeArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codeArray);
    setMessage(message + emoji);
  };
  function getFormattedDate(){
    const date=new Date();
    const year=date.getFullYear();
    let month=(1+date.getMonth()).toString();
    month=month.length>1? month:'0'+month;
    let day=date.getDate().toString();
    day=day.length>1? day:"0"+day;
    return day +"/"+month+"/"+year;

  }
  function handleSubmit(e){
    e.preventDefault();
  }
  function scrollToBottom(){
    messageEndRef.current?.scrollIntoView({behaviour:"smooth"});
  }
  const todayDate=getFormattedDate();
  socket.off("room-messages").on("room-messages",(roomMessages)=>{
    console.log('room messsages',roomMessages);
    setMessages(roomMessages);

  })
  function handleSubmit(e){
    if(!message) return;
    e.preventDefault();
    const today= new Date();
    const minutes=today.getMinutes()<10? "0" + today.getMinutes() : today.getMinutes();
    const time= today.getHours() + ":" +minutes;
    const roomId=currentRoom;
    socket.emit("message-room",roomId,message,user,time,todayDate);
    setMessage("");
  }
  
  return (
    <>

    <div className="messsage-output">{user && !privateMemberMsg?._id && <div className="alert alert-info" style={{textAlign:"center"}}> You are in the {currentRoom} room</div>}
    
    {user && privateMemberMsg?._id &&(
      <div className =" alert alert-info " style={{textAlign:"center"}}>
        Your conversation with {privateMemberMsg.name} 

      </div>
    )}{!user && <div className="alert alert-danger">Please Login</div>}
    
    {user && messages.map(({_id: date, messagesByDate},idx)=>(
      <div key={idx}>
        <p className='alert alert-info text-center message-date-indicator'>{date}</p>
        {messagesByDate?.map(({content,time,from: sender},msgIdx)=>(
          <div className={sender?.email==user?.email?"message":"incoming-message"} key={msgIdx}>
          <div className="message-inner">
            <div className="d-flex align-items-center mb-3">
              <img src={sender.picture} style={{width:35,height:35,objectFit:"cover",borderRadius:"50%",marginRight:10}}/>
              <p className="message-sender">{sender._id==user?._id?"You" : sender.name}</p>
            </div>
            <p className="message-content">{content}</p>
            <p className="message-timestamp-left">{time}</p>
            </div></div>
        ))}
      </div>
    ))}
    <div ref={messageEndRef}/>
    </div>
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col md={10}>
          <Form.Group>
            <Form.Control  placeholder="enter your message" disabled={!user} value={message} onChange={(e)=>setMessage(e.target.value)} ></Form.Control>
          </Form.Group>
        </Col>
        <Col md={1}>
        <Button variant="outline-secondary" style={{width:"100%",backgroundColor:"none",}} disabled={!user}
              onClick={() => setShowEmoji(!showEmoji)}
            >
              <i className="fas fa-smile"></i>
            </Button>

            {showEmoji && (
              <div className="emojiii">
                <Picker
                  data={data}
                  emojiSize={20}
                  emojiButtonSize={28}
                  onEmojiSelect={addEmoji}
                  maxFrequentRows={0}
                  theme="light" 
                  
                  position="top"
        style={{ position: 'absolute' }}
                  
              
                />
              </div>
            )}
          </Col>
        <Col md={1}>
          <Button variant="outline-primary" type="submit" style={{width:"100%",}} disabled={!user} >
            <i className="fas fa-paper-plane"></i>
          </Button>

        </Col>
      </Row>
    </Form>
    </>
  )
}

export default Message
