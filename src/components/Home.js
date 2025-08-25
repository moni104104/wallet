import React from 'react';
import { Button, Container } from 'react-bootstrap'; 
import profile from './images/profile.png';
import registration from './images/website.png';
import question from './images/question.png';
import service from './images/service.png';
import Login from './AfterLog/Login';
import { useState, useEffect } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';


function Home() {
  const navigate = useNavigate(); 
 
    const goToLogin = () => {
    navigate('/login'); 
  };


   const goToRegistration = () => {
    navigate('/registration'); 
  };  


  const styles = {
    div: {
      height: '100vh',
      backgroundColor: "rgba(150, 164, 184, 0.4)",
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    container: {
      backgroundColor: 'white',
      padding: '30px',
      borderRadius: '12px',
      textAlign: 'center',
      maxWidth: '600px',
    },
    image: {
      width: '150px',
      height: '150px',
      marginBottom: '20px',
    },
    box: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: '30px',
    },
    icons: {
      margin: 'auto 20px',
      textAlign: 'center',
    },
    icon: {
      width: '50px',
      height: '50px',
      marginBottom: '10px',
      cursor:"pointer"
    },
    marquee: {
      marginTop: '30px',
      color: 'red',
      fontWeight: 'bold',
    }
  };




  return (
    <div style={styles.div}>
      <Container style={styles.container}>
        <img src={profile} alt="Profile" style={styles.image} />
        <h1>PERSONAL BANKING</h1>
        <Button variant="success" onClick={goToLogin} className='mt-3'>
          Login
        </Button>

      



           <div style={styles.box}>
          <div style={styles.icons} onClick={goToRegistration}>
            <img src={registration} alt="Registration" style={styles.icon} />
            <p>Registration</p>
          </div>
          <div style={styles.icons}>
            <img src={question} alt="Help" style={styles.icon} />
            <p>How do I?</p>
          </div>
          <div style={styles.icons}>
            <img src={service} alt="Service" style={styles.icon} />
            <p>Customer Care</p>
          </div>
        </div>

        <marquee style={styles.marquee}>
          Bank never asks for confidential information such as PIN and OTP from customers. Any such call can be made only by a fraudster. Please do not share personal info.
        </marquee>
      </Container>
    </div>
  );
}

export default Home;
