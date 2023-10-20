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
    padding-bottom:100px;
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

    useEffect(() => {
      getBoard();
      const navbar = document.querySelector('#navbar');
      if (navbar) {
        navbar.classList.add('bg-gogo');
      }
    }, [address]);

    const getBoard = async () => {
      try {
        const resp = await axios.get("http://localhost:80/api/post/freeBoard/posts");
        setBoardData(resp.data.pageInfo.content);
        setLoading(false); // Set loading to false after data is fetched
        console.log(resp.data.pageInfo);
        setLimit(resp.data.pageInfo.pagesize);
        setTotal(resp.data.pageInfo.totalPages);
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
    const paginatedData = boardData.slice(0, boardData.totalElements);
    return (
      <LoadingOverlay
      active={loading}
      spinner
      text='게시판을 불러오는 중입니다.'
    >
      <ContainerFragment>
          <ContainerFragment>
          <div class="board_wrap">
        <div class="board_title">
            <strong>Q&A 게시판</strong>
            <p>Example</p>
        </div>
        <div class="board_list_wrap">
            <div class="board_list">
                <div class="top">
                    <div class="num">번호</div>
                    <div class="titlesa">제목</div>
                    <div class="writer">글쓴이</div>
                    <div class="date">작성일</div>
                    <div class="count">응답</div>
                </div>
                  {paginatedData.map((boardDetail) => {
                    if (loadtype === "" || (boardDetail[loadtype].includes(loaddata))) {
                      console.log(boardDetail);
                      return (
                        <div>
                        
                          <div class="num">{boardDetail.postId}</div>
                          <div class="titles" type="primary" onClick={() => {navigate(`/FreeBoard/${boardDetail.postId}`)}}>{boardDetail.title}</div>
                          <div class="writer">{boardDetail.author}</div>
                          <div class="date">{boardDetail.regtime}</div>
                          <div class="count">{boardDetail.count}</div>
                        </div>
                    );
                    }
                  })}
                  
            </div>
            <div class="bt_wrap">
                <a href="FreeBoard/edit/post" class="on">등록</a>
            </div>
        </div>
        <footer>
          <Paginate page={page} limit={isNaN(limit) ? 1 : limit} total={total} setPage={setPage} />
          <Search/>
        </footer>
    </div>

            
          </ContainerFragment>
      </ContainerFragment>
      </LoadingOverlay>

      
    );
  };

  export default Board;