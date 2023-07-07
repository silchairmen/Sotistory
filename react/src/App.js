import Header from "./Header";
import Footer from "./Footer";
import Body from "./Body";
import { Fragment } from "react";
import styled from 'styled-components';

const Background = styled.div`
  background-color:white ;
  background-size: cover;
  background-position: center;
  width:"100vw";
  height: "100vh";
`;

function App() {
  return (
    <Background>
        <Fragment>
            <Header />
            <Body />
            <Footer />
        </Fragment>
    </Background>
  );
}

export default App;