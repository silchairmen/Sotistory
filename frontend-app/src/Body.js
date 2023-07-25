import { BrowserRouter, Routes, Route } from "react-router-dom";
import FreeBoard from "./routes/board/FreeBoard";
import FreeBoardInfo from "./routes/board/FreeBoardInfo";
import SignIn from "./routes/SignIn";
import SignUp from "./routes/SignUp";
import History from "./routes/History";
import { Layout } from 'antd';
import Intro from './routes/intro/index';
import BoardEditor from "./components/board/BoardEditor";

const { Content } = Layout;
const contentStyle = {
  textAlign: 'center',
  minHeight: 120,
  lineHeight: '40px',
  color: '#000',
  width: '100%',
  height: '100%',

};

function Body() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Layout>
        <div>
          <Routes>
            <Route path="/FreeBoard" element={<Content style={contentStyle}><FreeBoard /></Content>} />
            <Route path="/FreeBoard/:id" element={<Content style={contentStyle}><FreeBoardInfo /></Content>} />
            <Route path="/SignIn" element={<Content style={contentStyle}><SignIn /></Content>} />
            <Route path="/SignUp" element={<Content style={contentStyle}><SignUp /></Content>} />
            <Route path="/History" element={<History />} />
            <Route path="/FreeBoard/edit/:id" element={<Content style={contentStyle}><BoardEditor/></Content>} />
            <Route path="/" element={<Content style={contentStyle}><Intro /></Content>} />
          </Routes>
        </div>
      </Layout>
    </BrowserRouter>
  );
}

export default Body;