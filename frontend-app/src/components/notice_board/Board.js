import { useEffect, useState } from "react";
import axios from "axios";
import BoardList from "../board/BoardList";
import Paginate from "../Paginate";
import { useSelector} from "react-redux";
import Search from "../Search";
import styled from "styled-components";
import LoadingOverlay from 'react-loading-overlay';
import { Button } from "@mui/material";
import { useNavigate,useLocation } from "react-router-dom";
import '../../css/noticeboard.css';
import image from "../../img/1.png"
import TruncateText from '../TruncateText'

// 모달의 스타일을 정의합니다.
const customModalStyle = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

const H1 = styled.h1`
  font-size:40px;
  padding-top:80px;
  padding-bottom:100px;
`;

const ContainerFragment = styled.div`
  background-color:whitesmoke;
  padding-top: 70px;
`

const ScrollableDiv = styled.div`
  height: 290px;
  width: 100%;
  display: flex;
  overflow-x: auto;
  overflow-y: hidden;
  align-items: flex-start; /* 아래쪽 정렬을 위해 사용 */
  white-space: nowrap; /* 수평 스크롤을 사용하려면 내부 요소를 인라인 블록으로 설정합니다. */
  border-top: 1px solid rgba(0, 0, 0, 0.2); /* 상단에 1px의 검은 테두리 추가 */
  border-bottom: 1px solid rgba(0, 0, 0, 0.2); /* 상단에 1px의 검은 테두리 추가 */
  
`;

const Content = styled.div`
  width: 100%; /* 내부 컨텐츠의 너비가 스크린 너비를 초과할 경우 스크롤이 활성화됩니다. */
  height: 100%;
`;

const imageStyle = {
  height: '100%',
  width: '100%',
  marginRight: '-100px',
  transform: 'translateX(220%)',
  borderRadius: '4px',
};

const containerStyle = {
  display: 'flex',
  height: '92%',
  width: '30%',
  position: 'absolute',
  zIndex: '5',
};


const Board = ({address}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [boardData, setBoardData] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [total, setTotal] = useState(1);
  const loaddata=useSelector(state => state.search.keyword);
  const loadtype=useSelector(state => state.search.type);
  const [selectedBoard, setSelectedBoard] = useState(null);

  const openModal = (boardDetail) => {
    setSelectedBoard(boardDetail);
    console.log(selectedBoard)
  };

  const closeModal = () => {
    setSelectedBoard(null);
  };

  useEffect(() => {
    getBoard();
    const navbar = document.querySelector('#navbar');
    if (navbar) {
      navbar.classList.add('bg-gogo');
    }
  }, [address]);

  const getBoard = async () => {
    try {
      const resp = await axios.get("/api/promotional/");
      console.log(resp.data);
      setBoardData(resp.data.postInfoDtoList);
      setLoading(false); // Set loading to false after data is fetched
      setLimit(resp.data.totalCount);
      setTotal(resp.data.totalPages);
      console.log(resp.data)
    } catch (error) {
      console.error("Error fetching board data:", error);
      setLoading(false); // Set loading to false on error as well
    }
  };

  const handleLimitChange = (e) => {
    setLimit(Number(e.target.value));
    setPage(1);
  };
  
  const handleBoardCheck=()=> {
    console.log(boardData);
    console.log(paginatedData);
  }

  const handleRegpage=()=> {
    window.location.href="/Post/Edit/post"
  }

  const paginatedData = boardData.slice(0, boardData.totalElements);
  return (
    <LoadingOverlay active={loading} spinner text="게시판을 불러오는 중입니다.">  
    <ContainerFragment>
          <center><h1>공지 게시판</h1></center>
          <center>지금 SOTI의 공지사항을 확인하세요!</center>
          <ScrollableDiv>
            <Content>
            {paginatedData
            .filter((boardDetail) => boardDetail.postType === "NOTICE")
            .map((boardDetail, index) => {
            if (loadtype === "" || (boardDetail[loadtype].includes(loaddata))) {
                return (
                  <div className="thumbnotice">
                    <div class="overlaynotice"></div>
                    <div style={containerStyle}>
                     <img src={image} alt="이미지 설명" style={imageStyle} />
                    </div>
                    <div class="title">
                      <TruncateText text={boardDetail.title} maxLength={10} size={16} />
                    </div>
                    <div class="author">
                      작성자 {boardDetail.writer}
                    </div>
                    <div class="content">
                      <TruncateText text={boardDetail.content} maxLength={100} size={16} />
                    </div>
                    <div class="regdate">
                      작성일 {boardDetail.regDate}
                    </div>

                  </div>
            );
          }
        })}
            </Content>
          </ScrollableDiv>
          <center><h1>홍보 게시판</h1></center>
          <center>지금 SOTI의 홍보글을 확인하세요!</center>
          <div class="reg_button" onClick={handleRegpage}>등록</div>
          <div class="gallery">
          {paginatedData
            .filter((boardDetail) => boardDetail.postType === "NORMAL")
            .map((boardDetail, index) => {
            if (loadtype === "" || (boardDetail[loadtype].includes(loaddata))) {
                return (
                  <div className="thumb" key={index} onClick={() => openModal(boardDetail)}>
                    <div class="overlay"></div>
                    <div class="title">
                      <TruncateText text={boardDetail.title} maxLength={10} size={16} />
                    </div>
                    <div class="author">
                      작성자 {boardDetail.writer}
                    </div>
                    <div class="content">
                      <TruncateText text={boardDetail.content} maxLength={100} size={16} />
                    </div>
                    <div class="regdate">
                      작성일 {boardDetail.regDate}
                    </div>
                  </div>
            );
          }
        })}
      {/* 모달 */}
      {selectedBoard && (
          <div className="modal">
            {/* 모달 내용 */}
            <div className="modal_text">
              <h2>{selectedBoard.title}</h2>
              <p>작성자: {selectedBoard.writer}asdfasdf</p>
              <div dangerouslySetInnerHTML={{ __html: selectedBoard.content }}></div>
              {/* 추가적인 내용 및 버튼 등을 원하는 대로 추가할 수 있습니다 */}
              <button onClick={closeModal}>닫기</button>
            </div>
          </div>
        )}
          </div>
          
    </ContainerFragment>
    </LoadingOverlay>

    
  );
};

export default Board;