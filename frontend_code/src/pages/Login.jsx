import React , { useContext, useEffect,useRef,useState }from 'react'
import {Button,Form,Row, Col,Spinner} from 'react-bootstrap';
import lottie from 'lottie-web';
import animationData from '../assets/logo.json';
import bg from '../assets/login.mp4'
import {Link,useNavigate} from 'react-router-dom'
import {useLoginUserMutation} from '../services/appApi'
import { AppContext } from '../context/appContext';

function Login() {
  const animationContainerRef = useRef(null);
  useEffect(() => {
    const container = animationContainerRef.current;

    if (container && !container.hasChildNodes()) {
      const anim = lottie.loadAnimation({
        container,
        animationData,
        renderer: 'svg', // Use 'canvas' or 'svg' based on your preference
        loop: true, // Set loop to false to play animation only once
        autoplay: true,
      });
      return () => {
        anim.destroy(); // Clean up animation when component unmounts
      };
    }
  }, []);
  
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [loginUser,{isLoading,error}]=useLoginUserMutation();
    const navigate=useNavigate();
    const {socket}=useContext(AppContext);
    function handelLogin(e){
      e.preventDefault();
      loginUser({email,password}).then(({data})=>{
        if(data){
          socket.emit("new-user");
          navigate("/chat");

        }
      });
    }
  
  return (
    <div style={{overflowX: "hidden",}}>
   
    <Row xs={1} md={2} >
    <Col className="bg-video"><video loop autoPlay muted style={{height:"100%"}}><source src={bg} type="video/mp4"/></video></Col>
      <Col className="d-flex flex-direction-column align-items-center justify-content-center p-2 ">
        
      <Form onSubmit={handelLogin}>
      <span ref={animationContainerRef} style={{ display: 'inline-block',width: "100px", height: "auto", }}></span><span  style={{fontSize:"20px",color:"#15CCEB",fontWeight:"bold", justifyContent:"center"}}>Login Here</span><br/>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        {error && <p className="alert alert-danger ">{error.data}</p>}
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" onChange={(e)=>setEmail(e.target.value)}  value={email} required/>
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}  value={password} required/>
      </Form.Group>
      
      <Button variant="primary" type="submit">
        {isLoading ? <Spinner animation="grow"/>:"Login"}
      </Button><br/><br/>
      <p className="text-center">
        Don't have a account ? <Link to={'/register'}>Register</Link>

      </p>
    </Form></Col>
      
    </Row>
    </div>
  )
}

export default Login
