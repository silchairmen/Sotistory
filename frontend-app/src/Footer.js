import React from "react";
import styled from "styled-components";
const FooterStyle = styled.footer`
  text-Align: center;
  color: white;
  background-Color: black;
  font-size: 1rem;
  padding: 15px;
  `
const Footer = () => {
  return (
    <FooterStyle >
      Contact : contact@soti.or.kr
    </FooterStyle>
  );
};

export default Footer;
