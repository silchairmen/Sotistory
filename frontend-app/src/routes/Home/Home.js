import React, { useEffect } from "react";
import styled from 'styled-components';
import Info from './Info'
import Mainslide from "./Mainslide";
import Dreamhack from "./Dreamhack";
import axios from "axios";
import { useDispatch } from "react-redux";

const Background = styled.div`
  width:100%;
  background-color:white;
`
const Home = () => {
  const dispatch= useDispatch();
  useEffect(()=>{
    async function session(){
      try{
        const response = await axios.get('http://localhost:80/api/member/validate', {withCredentials: true});
        if(response.data.status === "200"){
          dispatch({type:"SESSION_TOKEN",session:true});
        }else{
          dispatch({type:"SESSION_TOKEN",session:false});
        }
      }catch(error){
        alert("오류");
      }
      
    }
    session();

  })
  return (
    <Background>
      <Mainslide/> 
      <Info />
      <Dreamhack />
    </Background>
  );
};


export default Home;
