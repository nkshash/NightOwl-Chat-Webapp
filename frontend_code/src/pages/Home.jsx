import React , { useEffect,useRef }from 'react'
import lottie from 'lottie-web';
import animationData from '../assets/logo.json';
import {Row,Col,Button} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import '../assets/home.css'
import bg from '../assets/backg.mp4'
//https://www.youtube.com/watch?v=qdZYHbg72WQ
function Home() {
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

  
  return (<div className="px-3" style={{overflowX: "hidden",}}>
   
    <Row xs={1} md={2} >
      <Col className="d-flex flex-direction-column align-items-center justify-content-center p-2 ">
      <div><span ref={animationContainerRef} style={{ display: 'inline-block',width: "100px", height: "auto", }}></span><p><span  style={{fontSize:"25px",color:"#15CCEB",fontWeight:"bold", justifyContent:"center"}}>NightOwl</span></p>
       
        <h1>Share the world with your friends.</h1>
        <p>Chat App lets you connect with the world.</p>
        <LinkContainer to="/chat">
        <Button variant="primary">
          Get Started <i className="fas fa-comments home-message-icon"></i>
        </Button>
        </LinkContainer>
      </div></Col>
      <Col className="bg-video"><video loop autoPlay muted style={{height:"100%"}}><source src={bg} type="video/mp4"/></video></Col>
    </Row>
    </div>
    
  )
}

export default Home
