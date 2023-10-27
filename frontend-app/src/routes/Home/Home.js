import React from "react";
import styled from 'styled-components';
import Info from './Info'
import Mainslide from "./Mainslide";
import Dreamhack from "./Dreamhack";

const Background = styled.div`
  width:100%;
  background-color:white;
`
const Home = () => {
  return (
    <Background>
      <Mainslide/> 
      <Info />
      <Dreamhack />
    </Background>
  );
};

export default Home;