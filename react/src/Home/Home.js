import React from "react";
import styled from 'styled-components';
import Info from './Info'
import Mainslide from "./Mainslide";

const Background = styled.div`
  width:100%;
`
const Home = () => {

  return (
    <Background>
      <Mainslide/> 
      <Info />
    </Background>
  );
};



export default Home;
