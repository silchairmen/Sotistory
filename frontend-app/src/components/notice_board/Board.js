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
            <center><h1>공지사항</h1></center>
            <center>지금 SOTI의 공지사항을 확인하세요!</center>
            <br />
            <div class="gallery">
            {paginatedData.map((boardDetail) => {
              if (loadtype === "" || (boardDetail[loadtype].includes(loaddata))) {
                return (
                  <div class="thumb">
                    <div class="overlay"></div>
                    <div class="title">
                      <TruncateText text={boardDetail.title} maxLength={10} />
                    </div>
                    <div class="author">
                      작성자 {boardDetail.author}
                    </div>
                    <div class="content">
                      <TruncateText text={boardDetail.content} maxLength={100} />
                    </div>
                  </div>
            );
            }
          })}
            </div>
          </ContainerFragment>
      </ContainerFragment>
      </LoadingOverlay>

      
    );
  };

  export default Board;