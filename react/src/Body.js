import { BrowserRouter, Routes, Route } from "react-router-dom";
import FreeBoard from "./routes/board/FreeBoard";
import FreeBoardInfo from "./routes/board/FreeBoardInfo";
import SignIn from "./routes/SignIn";
import SignUp from "./routes/SignUp";
import { Layout} from 'antd';
import Intro from './routes/intro/index';

const { Content } = Layout;
const contentStyle = {
  textAlign: 'center',
  minHeight: 120,
  lineHeight: '40px',
  color: '#000',
  width: '100%',
  height: '100%',
  //background: 'transparent',
};
function Body() {
  return (
      <Content style={contentStyle}>
        <BrowserRouter basename={process.env.PUBLIC_URL}>
          <Routes>
            <Route path="/Board" element={<FreeBoard />} />
            <Route path="/Board/:id" element={<FreeBoardInfo />} />
            <Route path="/SignIn" element={<SignIn />} />
            <Route path="/SignUp" element={<SignUp/>} />
            <Route path="/" element={<Intro/>} />
          </Routes>
          
        </BrowserRouter>
      </Content>
  );
}

export default Body;
