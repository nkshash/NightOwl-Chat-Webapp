import React, {useState} from 'react'
import {Button,Form,Row, Col} from 'react-bootstrap';
import {useSignupUserMutation} from '../services/appApi'
import bg from '../assets/join.mp4'
import {Link,useNavigate} from 'react-router-dom'
import dp from '../assets/dp.jpg'
import '../assets/home.css'



function Register() {
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [name,setName]=useState('');
  const [signupUser,{isLoading,error}]=useSignupUserMutation();
  const navigate=useNavigate();
  const [image,setImage]=useState(null);
  const [uploadingImg , setUploadingImage]=useState(false);
  const [imagePreview,setImagePreview]=useState(null);
  function validate(e){
    const file=e.target.files[0];
    if(file.size>=1048576){
      return alert("max file size is 1mb");

    }
    else{
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }



  }

  async function uploadImage(){
    const data=new FormData();
    data.append('file',image);
    data.append('upload_preset','cuzxjmps')
    try{
      setUploadingImage(true);
      let res=await fetch('https://api.cloudinary.com/v1_1/divgroq7w/image/upload',{
        method:'post',
        body:data,
      } );
      const urlData=await res.json();
      setUploadingImage(false);
      return urlData.url;


    }catch(error){
      setUploadingImage(false);
      console.log(error);    }

  }

  async function handelRegister(e){
    e.preventDefault();
    if (!image) return alert("Please upload your profile picture in jpeg/png format");
    const url=await uploadImage(image);
  console.log(url);
  signupUser({name,email,password,picture:url}).then(({data})=>{
    if(data){
      console.log(data);
      navigate("/chat");

    }
  });

  }

  return (
    <div className="justify-content-center align-items-center" style={{overflowX: "hidden",}}>
   
    <Row xs={1} md={2} >
    
      <Col className="d-flex flex-direction-column align-items-center justify-content-center p-2 ">
        
      <Form onSubmit={handelRegister}>
      
      <div className="profile-pic-container">
      <img src={imagePreview || dp} className="dp"/>
      <label htmlFor="pic">
        
        <i className="fas fa-plus-circle " style={{position:"absolute",
    bottom:"0px",
    right:"11px",
    color:"green",
    background:"white",
    cursor:"pointer",
    zIndex:"2"}}></i></label>
    <input type="file" id="pic" hidden accept="image/png, image/jpeg" onChange={validate}/>
      </div>
      {error && <p className="alert alert-danger">{error.data}</p>}
      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Name</Form.Label>
        <Form.Control type="name" placeholder="Enter your name" onChange={(e)=>setName(e.target.value)}  value={name} required/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
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
        {uploadingImg || isLoading ? 'thanks for joining...': 'Submit' }
      </Button><br/><br/>
      <p className="text-center">
        Already have a account ? <Link to={'/login'}>Login</Link>

      </p>
    </Form></Col>
    <Col className="bg-video"><video loop autoPlay muted style={{height:"100%"}}><source src={bg} type="video/mp4"/></video></Col>
    </Row>
    </div>
  )
}

export default Register
