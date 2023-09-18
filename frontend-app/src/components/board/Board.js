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


  const H1 = styled.h1`
    font-size:40px;
    padding-top:80px;
    padding-bottom:100px;
  `;

  
  const Table = styled.table`
    width: 70vw;
    height: 100vh;
    align-items: center;
    justify-content: center;
    padding: 50px ;
    background-color: whitesmoke;
    text-align: center;
    margin: 0 auto;
    border-radius: 10px;
    border : 1px solid #444444;
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
            <div>
              <H1>자유 게시판</H1>
            </div>
            <select value={limit} onChange={handleLimitChange}>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="30">30</option>
            </select>
            <div>
              <Table>
                <thead>
                  <tr>
                    <th width="50">번호</th>
                    <th width="1700">제목</th>
                    <th width="100">ID</th>
                  </tr>
                </thead>
                {paginatedData.map((boardDetail) => {
                  if (loadtype === "" || (boardDetail[loadtype].includes(loaddata))) {
                    return (
                      <BoardList
                        key={boardDetail.postId}
                        author={boardDetail.author}
                        postId={boardDetail.postId}
                        title={boardDetail.title}
                        content={boardDetail.content}
                      />
                    );
                  }
                })}
              </Table>
              <Button
          type="primary"
          onClick={() => {
            navigate(`${location.pathname}/edit/Post`) //여기 수정
          }}
        >
          글 쓰기
        </Button>
        <Button
          type="primary"
          onClick={handleBoardCheck}
        >
          테스트
        </Button>
            </div>
            <footer>
            <Paginate page={page} limit={isNaN(limit) ? 1 : limit} total={total} setPage={setPage} />
              <Search/>
            </footer>
            
          </ContainerFragment>
      </ContainerFragment>
      </LoadingOverlay>

      
    );
  };

  export default Board;