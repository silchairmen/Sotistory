import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import '../../css/boardInfo.css';

const Board=styled.div`
  background-color:white;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Footer=styled.div`
  padding:15px;
  background-color:white;
  align-items:center;
  background-position:center;
  height:10%;
  outline:auto;
  text-align:left;
`
const UserId=styled.div`
  align-items:center;
`
function Boardinfo({address}) {
  const [boardInfo, setBoardInfo] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const getInfo = async () => {
      try {
        const resp = await axios.get(`${address}${id}`);
        
        setBoardInfo(resp.data);
        console.log(resp.data);
      } catch (error) {
        console.error("Error fetching board info:", error);
      }
    };
    getInfo();
  }, [id]);

  return (
    <Board>
      <div class="black-box"></div>
        <div class="container mt-5">
                <div class="col-lg-8">
                    <article>
                        <header class="mb-4c">

                            <h1 class="fw-bolder mb-1">{boardInfo.title}</h1>

                            <div class="text-muted fst-italic mb-2">작성자 {boardInfo.author}</div>
                            
                        </header>
                        
                        <section class="mb-5">
                          <div style={{ display: 'flex', justifyContent: 'left', marginBottom: '-17px'}}><h4><p class="mb-4" style={{color: 'gray',}}>본문</p></h4></div>
                          <div class="textbox" dangerouslySetInnerHTML={{ __html: boardInfo.content }}></div>
                        </section>
                    </article>

                    <section class="mb-5s">
                        <div class="card bg-light">
                            <div class="card-body">
                            <div style={{ display: 'flex', justifyContent: 'left', marginBottom: '-17px'}}><h4><p style={{color: 'green',}}></p></h4></div>
                                <form class="mb-4 ms-4"><textarea class="form-control" rows="3" placeholder="댓글을 입력해주세요."></textarea></form>
                                <div style={{ display: 'flex', justifyContent: 'flex-end', paddingRight: '10px' }}><h6><p style={{color: 'green',}}>작성</p></h6></div>

                                <div class="d-flex mb-4s lh-1">
                                    <div class="ms-3">
                                        <div class="fw-bold"><p>작성자명</p></div>
                                        <p class="fw-bold2">대댓글 내용</p>
                                        
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
      <Link to={{pathname:`/FreeBoard/edit/${id}`,state:{id: id}}}><p style={{color: 'blue',}}>글 수정</p></Link>
        </div>
      


      </Board>
  );
}

export default Boardinfo;