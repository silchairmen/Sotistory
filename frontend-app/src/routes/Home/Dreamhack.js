import React, { useState } from "react";
import useScrollFadeIn from "../../components/FadeinHook";
import styled, { keyframes } from 'styled-components';
import dreamhackImage from '../../img/dreamhack.png';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: auto;
  width: 100%;
`;

const Content = styled.div`
  background-color: white;
  border-radius: 15px;
  padding: 20px;
  width: 100%;
  height: auto;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const fadeInFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-10px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const Checkmark = styled.span`
  position: absolute;
  left: calc(50% - 150px);
  opacity: 0;
  animation: ${fadeInFromLeft} 0.5s forwards;
`;

const Paragraph = styled.p`
  font-size: 20px;
  position: relative;
  //padding-left: 30px;
  cursor: pointer;
`;
const Image = styled.img`
  width: 100%;
  height: auto;
  max-width: 40%; /* 이미지의 최대 너비를 100%로 설정 */
  @media screen and (max-width: 768px) {
     max-width:100%
  }

`;

const Dreamhack = () => {
  const [showCheckmarks, setShowCheckmarks] = useState([false, false, false, false]);

  const handleMouseEnter = (index) => {
    setShowCheckmarks((prev) => prev.map((_, i) => i === index));
  };

  const handleMouseLeave = () => {
    setShowCheckmarks((prev) => prev.map(() => false));
  };
  const handleClickRanking = (index) => {
    switch(index) {
      case 2:
        window.location.href = "https://dreamhack.io/ranking/wargame?scope=organization&filter=global&page=1&country&search=&name=%EC%9A%B0%EC%84%9D%EB%8C%80%ED%95%99%EA%B5%90&type=school";
        break;
      default:
        break;
    }
  };
  

  const animatedItem = {
    0: useScrollFadeIn('right', 1, 0),
    1: useScrollFadeIn('up', 1, 1),
    2: useScrollFadeIn('up', 1, 1.2),
    3: useScrollFadeIn('up', 1, 1.3),
    4: useScrollFadeIn('up', 1, 1.4),
  };

  return (
    <Container>
      <Content {...animatedItem[0]}>
        <Paragraph>
          <Image src={dreamhackImage} alt="Dreamhack" />
        </Paragraph>
        <h1 style={{fontSize:"30px"}}>Check Ranking</h1>
        {["DREAMHACK 현황", "SOTI 그룹 랭킹", "우석대학교 랭킹"].map((text, index) => (
          <Paragraph
            key={index}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
            onClick={()=>handleClickRanking(index)}
          >
            {showCheckmarks[index] && <Checkmark>✔</Checkmark>}
            {text}
          </Paragraph>
        ))}
      </Content>
    </Container>
  );
}

export default Dreamhack;