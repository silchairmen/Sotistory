import { BrowserRouter, Routes, Route } from "react-router-dom";
import FreeBoard from "./routes/board/FreeBoard";
import FreeBoardInfo from "./routes/board/FreeBoardInfo";
import SignIn from "./routes/SignIn";
import SignUp from "./routes/SignUp";
import History from "./routes/History";
import { Layout } from 'antd';
import Intro from './routes/intro/index';
import BoardEditor from "./components/board/BoardEditor";
import TestPage from "./routes/TestPage";
import Boardmodifier from "./components/board/Boardmodifier";
import Noticeboard from "./routes/notice/noticeboard";
import NoticeEditor from "./components/notice_board/BoardEditor";
import Testboard from "./components/board/Testboard";
const { Content } = Layout;
const contentStyle = {
  textAlign: 'center',
  minHeight: 120,
  lineHeight: '40px',
  color: '#000',
  width: '100%',
  height: '100%',
};
const contentStyle1 = {
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
          <Routes>
            <Route path="/Question" element={<Content style={contentStyle}><FreeBoard /></Content>} />
            <Route path="/Post" element={<Content style={contentStyle}><Noticeboard /></Content>} />
            <Route path="/Question/:id" element={<Content style={contentStyle}><FreeBoardInfo /></Content>} />
            <Route path="/SignIn" element={<Content style={contentStyle}><SignIn /></Content>} />
            <Route path="/SignUp" element={<Content style={contentStyle}><SignUp /></Content>} />
            <Route path="/History" element={<History />} />
            <Route path="/Question/Edit/:id" element={<Content style={contentStyle1}><Testboard/></Content>} />
            <Route path="/Post/Edit/:id" element={<Content style={contentStyle1}><Testboard/></Content>} />
            <Route path="/Question/modifier/:id" element={<Content style={contentStyle1}><Testboard/></Content>} />
            <Route path="/" element={<Content style={contentStyle}><Intro /></Content>} />
            <Route path="/MyPage" element ={<Content style={contentStyle}><TestPage /></Content>} />
            <Route path="/Test" element={<Content style={contentStyle1}><Testboard/></Content>}/>
          </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default Body;