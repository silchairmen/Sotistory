import React from "react";
import useScrollFadeIn from "../../components/FadeinHook";
import styled from 'styled-components';


const Container = styled.div`
  justify-content: center;
  position: relative;
  align-items: center;
  display: flex;
  background-color:black;
  color:white;
  height: 60vh; /* 뷰포트의 높이에 맞추려면 100vh로 설정 */
  width: 100%;
`;

const Content = styled.div`
  border-radius: 15px;
  padding: 20px;
  width: 30%;
  height: 30vh;
  position: relative;
`;
const H1 = styled.h1`
  text-align:middle;
  position: absolute;
  left:150px;
  font-size:50px;
  padding-right: 200px;
`;
const Paragraph = styled.p`
text-align:left;
font-size:30px;
`;
const Info = () => {
  const animatedItem = {
    0: useScrollFadeIn('down', 1, 0),
    1: useScrollFadeIn('down', 1, 1),
    2: useScrollFadeIn('up', 1, 1.3),
    3: useScrollFadeIn('up', 1, 1.4),
    4: useScrollFadeIn('down', 1.2, 0)
  };
  
  return(
    <Container>
      
      <H1 {...animatedItem[0]}>What is SOTI?</H1>
      <br />
      <Content {...animatedItem[1]}>
        <Paragraph >S ecurity</Paragraph>
        <Paragraph >O ver</Paragraph>
        <Paragraph >T echnology</Paragraph>
        <Paragraph >I nformation</Paragraph>
      </Content>
    </Container>
  );
}

export default Info;