import Header from "./Header";
import Footer from "./Footer";
import Body from "./Body";
import { Fragment } from "react";
import styled from 'styled-components';
import { Provider } from 'react-redux';
import rootReducer from "./redux/rootReducer";
import { createStore } from 'redux';
import { CookiesProvider } from "react-cookie";

const store = createStore(rootReducer);

const Background = styled.div`
  background-color:white ;
  background-size: cover;
  background-position: center;
  width:"100vw";
  height: "100vh";
`;
function App() {
  return (
    <Provider store={store} >
      <CookiesProvider>
        <Background>
          <Fragment>
            <Header />
            <Body />
            <Footer />
          </Fragment>
        </Background>
      </CookiesProvider>
    </Provider>
  );
}

export default App;