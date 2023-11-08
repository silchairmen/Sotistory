import Header from "./Header";
import Footer from "./Footer";
import Body from "./Body";
import { Fragment } from "react";
import styled from 'styled-components';
import { Provider } from 'react-redux';
import rootReducer from "./redux/rootReducer";
import { createStore } from 'redux';

const store = createStore(rootReducer);

const Background = styled.div`
  background-color:white ;
  background-size: cover;
  background-position: center;
  width:"100vw";
  height: "100vh";
  ::-webkit-scrollbar {
    width: 12px; /* 스크롤 바의 너비를 조절할 수 있습니다. */
  }
  
  ::-webkit-scrollbar-thumb {
    background-color: #888; /* 슬라이더의 배경색을 설정합니다. */
    border-radius: 6px; /* 슬라이더의 모양을 설정합니다. */
  }
  
  /* 웹킷 브라우저(Chrome, Safari)에서 스크롤바 색상 지정 */
  ::-webkit-scrollbar-thumb:hover {
    background-color: #555; /* 슬라이더에 호버했을 때의 배경색을 설정합니다. */
  }
`;
function App() {
  return (
    <Provider store={store}>
    <Background>
        <Fragment>
            <Header />
            <Body />
            <Footer />
        </Fragment>
    </Background>
    </Provider>
  );
}

export default App;