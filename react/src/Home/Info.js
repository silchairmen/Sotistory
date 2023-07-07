import React from "react";
import useScrollFadeIn from "../components/FadeinHook";
import styled from 'styled-components';


const Container = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
  height: 100vh; /* 뷰포트의 높이에 맞추려면 100vh로 설정 */
  width: 100%;
`;

const Content = styled.div`
  background-color: white;
  border-radius: 15px;
  padding: 20px;
  width: 50vw;
  height: 30vh;
`;

const Paragraph = styled.p`
font-size:17px;
`;
const Info = () => {
  const animatedItem = {
    0: useScrollFadeIn('up', 1, 1),
    1: useScrollFadeIn('up', 1, 1.2),
    2: useScrollFadeIn('up', 1, 1.3),
    3: useScrollFadeIn('up', 1, 1.4),
    4: useScrollFadeIn('down', 1.2, 0)
  };
  
  return(
    <Container>
      <Content {...animatedItem[4]}>
        <Paragraph {...animatedItem[0]}>SOTI 란 ?</Paragraph>
        <hr />
        <Paragraph {...animatedItem[1]}>대충 SOTI 뜻이 적히는 공간</Paragraph>
      </Content>
    </Container>
  );
}

export default Info;


