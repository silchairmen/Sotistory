  import { useEffect, useState } from "react";
  import axios from "axios";
  import BoardList from "./BoardList";
  import Paginate from "../Paginate";
  import { useSelector} from "react-redux";
  import Search from "../Search";
  import styled from "styled-components";
  import LoadingOverlay from 'react-loading-overlay';
  import { Button } from "@mui/material";
  import { useNavigate,useLocation } from "react-router-dom";
  import '../../css/boardcss.css';


  const H1 = styled.h1`
    font-size:40px;
    padding-top:80px;
    padding-bottom:100px;Selector
  `;

  const ContainerFragment = styled.div`
    background-color:whitesmoke;
    padding-top: 70px;
  `

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
    const [postId,setPostId] = useState(1);
    const [currentDate,setCurrentDate] = useState("");


    useEffect(() => {
      getBoard();
      const navbar = document.querySelector('#navbar');
      if (navbar) {
        navbar.classList.add('bg-gogo');
      }
    }, [address]);

    const getBoard = async () => {
      const resp = await axios.get("/api/question/");
      setBoardData(resp.data.postInfoDtoList)
      setPostId(resp.data.postInfoDtoList.postId);
      setLoading(false); // Set loading to false after data is fetched
      setLimit(resp.data.postInfoDtoList.totalpages);
      setTotal(resp.data.postInfoDtoList.totalCount);

      try {
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

    const handleWrite=()=> {
      window.location.href='FreeBoard/edit/post';
    }


    const paginatedData = boardData.slice(0, boardData.totalElements);
    return (
      <LoadingOverlay
      active={loading}
      spinner
      text='게시판을 불러오는 중입니다.'
    >
      <ContainerFragment>
          <ContainerFragment>
            <div class="loadingset">
          <div class="board_wrap">
        <div class="board_titles">
            <strong>Q&A 게시판</strong>
            <p>Example</p>
        </div>
        <div class="board_list_wrap">
          <div class="board_title">
              <div class="top">
                  <div class="num">비밀</div>
                  <div class="titles">제목</div>
                  <div class="writer">글쓴이</div>
                  <div class="date">작성일</div>
                  <div class="count">응답</div>
              </div>
          </div>
                  {paginatedData.map((boardDetail) => {
                    if (loadtype === "" || (boardDetail[loadtype].includes(loaddata))) {
                      console.log(boardDetail);
                      const createDate = new Date(boardDetail.createDate);
                      const year = createDate.getFullYear();
                      const month = String(createDate.getMonth() + 1).padStart(2, '0');
                      const day = String(createDate.getDate()).padStart(2, '0');
                      const hours = String(createDate.getHours()).padStart(2, '0');
                      const minutes = String(createDate.getMinutes()).padStart(2, '0');
                      const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}`;
                      return (
                        <div class="board_middle">
                          <div class="middle">
                          {boardDetail.postType == "HIDDEN" && (<div class="num">🔐</div>)}
                          {boardDetail.postType != "HIDDEN" && (<div class="num">🔓</div>)}
                            <div class="titles" type="primary" onClick={() => {navigate(`/FreeBoard/${boardDetail.postId}`)}}>{boardDetail.title}</div>
                            <div class="writer">{boardDetail.writer}</div>
                            <div class="date">{formattedDateTime}</div>
                            <div class="count">{boardDetail.commentSize}</div>
                          </div>
                        </div>
                    );
                    }
                  })}
            <div class="board_button_wrap" onClick={handleWrite}>
              등록
            </div>
            <Paginate page={page} limit={isNaN(limit) ? 1 : limit} total={total} setPage={setPage} />
            <Search/>
        </div>
    </div>
    </div>
    <footer>

    </footer>
          </ContainerFragment>
      </ContainerFragment>
      </LoadingOverlay>

      
    );
  };

  export default Board;