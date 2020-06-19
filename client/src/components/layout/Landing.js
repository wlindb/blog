import React from "react";
import { Container } from "react-bootstrap";
import pi from './pi.jpg';

const Landing = () => {
   return (
      <Container>
         <img alt='pi' src={pi} style={{width: 'inherit', height: 'inherit'}}/>
      </Container>
   );
};

export default Landing;