import { useEffect, useState } from "react";
import axios from "axios";
import Paginate from "../Paginate";
import { useSelector} from "react-redux";
import Search from "../Search";
import styled from "styled-components";
import LoadingOverlay from 'react-loading-overlay';
import { useNavigate } from "react-router-dom";
import '../../css/boardcss.css';
import video from "../../img/boardvideo.mp4"

import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';


  const ContainerFragment = styled.div`
    height: 100%;
  `;

  const Board = ({address}) => {
    const navigate = useNavigate();
    const [boardData, setBoardData] = useState([]);
    const [loading, setLoading] = useState(true); // Add loading state
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [total, setTotal] = useState(1);
    const loaddata=useSelector(state => state.search.keyword);
    const loadtype=useSelector(state => state.search.type);
    const [postId,setPostId] = useState(1);
    const [sessionValid, setSessionValid] = useState(false); // 세션 유효 여부 추가


  useEffect(() => {
    getBoard();
    const navbar = document.querySelector('#navbar');
    if (navbar) {
      navbar.classList.add('bg-gogo');
    }
    const verifySession = async () => { // 세션 검증을 위한 함수
      try {
        const sessionResp = await axios.get('/api/auth/validate', { withCredentials: true });
        if (sessionResp.data.status === 200) {
          setSessionValid(true); // 세션이 유효한 경우 상태 변경
        } else {
          setSessionValid(false); // 세션이 유효하지 않은 경우 상태 변경
        }
      } catch (error) {
        console.error("Error verifying session:", error);
        setSessionValid(false); // 에러 발생 시 세션 유효하지 않은 것으로 처리
      }
    };

    verifySession(); // 페이지 로드 시 세션 검증 수행
  }, [address]);

    const getBoard = async () => {
      const resp = await axios.get("/api/question/");
      setBoardData(resp.data.postInfoDtoList)
      setPostId(resp.data.postInfoDtoList.postId);
      setLoading(false); // Set loading to false after data is fetched
      setTotal(resp.data.totalCount);
  }

  const handleLimitChange = (e) => {
    setLimit(Number(e.target.value));
    setPage(1);
  };

  const handleWriteButtonClick = (event) => {
    event.preventDefault();

    if (sessionValid) {
      window.location.href = '/Question/edit/post'; // 세션이 유효한 경우 글 작성 페이지로 이동
    } else {
      toast.warn("로그인이 필요합니다!"); // 세션이 유효하지 않은 경우 알림
    }
  };


    const paginatedData = boardData.slice((page - 1) * limit, page * limit);
    return (
      <LoadingOverlay
      active={loading}
      spinner
      text='게시판을 불러오는 중입니다.'
      >

      <ContainerFragment>
      <video
        autoPlay
        loop
        muted
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: '0',
          pointerEvents: 'none',
        }}
      >
        <source src={video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
          <div class="loadingset">
          <div class="board_wrap">

        <div class="board_list_wrap">
          <br />
        <div class="board_titles">
            <strong><h1>Q&A 게시판</h1> </strong>
        </div>
          <div class="board_title">
              <div class="board_top">
                  <div class="num">비밀글</div>
                  <div class="titles">제목</div>
                  <div class="writer">글쓴이</div>
                  <div class="date">작성일</div>
                  <div class="count">응답</div>
              </div>
          </div>
                  {paginatedData.map((boardDetail) => {
                    if (loadtype === "" || (boardDetail[loadtype].includes(loaddata))) {
                      const createDate = new Date(boardDetail.createDate);
                      const year = createDate.getFullYear();
                      const month = String(createDate.getMonth() + 1).padStart(2, '0');
                      const day = String(createDate.getDate()).padStart(2, '0');
                      const hours = String(createDate.getHours()).padStart(2, '0');
                      const minutes = String(createDate.getMinutes()).padStart(2, '0');
                      const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}`;
                      return (
                        <div className="board_middle" onClick={() => {{navigate(`/Question/${boardDetail.postId}`)}}}>
                          <div className="middle">
                          {boardDetail.postType == "HIDDEN" && (<div className="num">🔐</div>)}
                          {boardDetail.postType != "HIDDEN" && (<div className="num"></div>)}
                            <div className="titles" type="primary" style={{textAlign:"left"}}>{boardDetail.title} [{boardDetail.commentSize}]</div>
                            <div className="writer">{boardDetail.writer}</div>
                            <div className="date">{formattedDateTime}</div>
                            <div className="count" style={{ color: boardDetail.answerCompleted ? 'green' : 'red' }}>{boardDetail.answerCompleted ? "완료" : "대기"}</div>
                          </div>
                        </div>
                    );
                    }
                  })}
            <div onClick={handleWriteButtonClick} style={{display:"flex",backgroundColor:"#666", width: "5rem", cursor: "pointer", textAlign: "center", marginLeft: "auto",marginRight:"10%",marginTop:"1.2rem",textShadow: "0px -1px #474747",borderColor:"#444",color: "#fff",borderWidth:"1px 1px 3px 1px",borderStyle:"solid", borderradius: "2px",height:"2.5rem",justifyContent:"center"}}>
              등록
            </div>
              <Paginate page={page} limit={isNaN(limit) ? 1 : limit} total={total} setPage={setPage} />
              <Search/>
        </div>
    </div>
    </div>
    <footer>

    </footer>
    <ToastContainer
                position="top-right"
                limit={4}
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover={false}
                theme="light"
      />
      </ContainerFragment>
      </LoadingOverlay>

  );
};

export default Board;