import React, { useState } from "react";
import useScrollFadeIn from "../components/FadeinHook";
import styled, { keyframes } from 'styled-components';
import dreamhackImage from '../img/dreamhack.png'; // Import the image here

const Container = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
  height: 100vh;
  width: 100%;
`;

const Content = styled.div`
  background-color: white;
  border-radius: 15px;
  padding: 20px;
  width: 50vw;
  height: 30vh;
  position: relative; /* 위치 설정을 위해 추가합니다. */
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
  display: inline-block;
  position: absolute;
  left: 250px; /* 체크 표시를 왼쪽으로 이동시킵니다. */
  opacity: 0;
  animation: ${fadeInFromLeft} 0.5s forwards; /* 애니메이션 적용 */
`;

const Paragraph = styled.p`
  font-size: 25px;
  position: relative; /* 위치 설정을 위해 추가합니다. */
`;

const Dreamhack = () => {
  const [showCheckmarks, setShowCheckmarks] = useState([false, false, false, false]);

  const handleMouseEnter = (index) => {
    setShowCheckmarks((prev) => prev.map((_, i) => i === index));
  };

  const handleMouseLeave = () => {
    setShowCheckmarks((prev) => prev.map(() => false));
  };

  const animatedItem = {
    0: useScrollFadeIn('down', 1.2, 0),
    1: useScrollFadeIn('up', 1, 1),
    2: useScrollFadeIn('up', 1, 1.2),
    3: useScrollFadeIn('up', 1, 1.3),
    4: useScrollFadeIn('up', 1, 1.4),
    5: useScrollFadeIn('up', 1, 1.5),
    6: useScrollFadeIn('up', 1, 1.6),
  };

  return (
    <Container>
      <Content {...animatedItem[0]}>
        <Paragraph>
          <img src={dreamhackImage} alt="Dreamhack" />
        </Paragraph>
        <hr />
        <Paragraph
          onMouseEnter={() => handleMouseEnter(0)}
          onMouseLeave={handleMouseLeave}
        >
          {showCheckmarks[0]}
          Check Ranking
        </Paragraph>
        <Paragraph
          onMouseEnter={() => handleMouseEnter(1)}
          onMouseLeave={handleMouseLeave}
        >
          {showCheckmarks[1] && <Checkmark>✔</Checkmark>}
          <h2>DREAMHACK 현황</h2>
        </Paragraph>
        <Paragraph
          onMouseEnter={() => handleMouseEnter(2)}
          onMouseLeave={handleMouseLeave}
        >
          {showCheckmarks[2] && <Checkmark>✔</Checkmark>}
          <h2>SOTI 그룹 랭킹</h2>
        </Paragraph>
        <Paragraph
          onMouseEnter={() => handleMouseEnter(3)}
          onMouseLeave={handleMouseLeave}
        >
          {showCheckmarks[3] && <Checkmark>✔</Checkmark>}
          <h2>우석대학교 랭킹</h2>
        </Paragraph>
      </Content>
    </Container>
  );
}

export default Dreamhack;
