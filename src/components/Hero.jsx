import React from 'react';
import { Container } from 'react-bootstrap';
import projectIntro from '../assets/projectIntro.gif'
import '../styles/Hero.css'

function Hero() {
  return ( 
    <Container fluid id="hero">
      <img src={projectIntro} alt="Star Wars Planets" />
    </Container>
  );
}

export default Hero;