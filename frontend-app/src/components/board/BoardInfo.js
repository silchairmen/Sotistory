import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import '../../css/Board.css';

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
      <div className="black-box"></div>
        <div className="boardcontainer board_mt-5">
                <div className="board_col-lg-8">
                    <article>
                        <header className="board_mb-4c">

                            <h1 className="board_fw-bolder board_mb-1">{boardInfo.title}</h1>

                            <div className="board_text-muted board_fst-italic board_mb-2">작성자 {boardInfo.writer}</div>
                            
                        </header>
                        
                        <section className="board_mb-5">
                          <div style={{ display: 'flex', justifyContent: 'left', marginBottom: '-17px'}}><h4><p className="board_mb-4" style={{color: 'gray',}}>본문</p></h4></div>
                          <div className="board_textbox" dangerouslySetInnerHTML={{ __html: boardInfo.content }}></div>
                        </section>
                    </article>

                    <section className="board_mb-5s">
                        <div className="bg-light">
                            <div style={{ display: 'flex', justifyContent: 'left', marginBottom: '-17px'}}><h4><p style={{color: 'green',}}></p></h4></div>
                                <form className="board_mb-4 board_ms-4"><textarea className="board_form-control" rows="3" placeholder="댓글을 입력해주세요."></textarea></form>
                                <div style={{ display: 'flex', justifyContent: 'flex-end', paddingRight: '10px' }}><h6><p style={{color: 'green',fontSize:'15px'}}>작성</p></h6></div>

                                <div className="board_d-flex board_mb-4s board_lh-1">
                                    <div className="board_ms-3">
                                        <div className="board_fw-bold"><p>작성자명</p></div>
                                        <p className="board_fw-bold2">대댓글 내용</p>
                                        
                                    </div>
                                </div>
                        </div>
                    </section>
                </div>
      <Link to={{pathname:`/FreeBoard/modifier/${id}`,state:{id: id}}}><p style={{color: 'blue',}}>글 수정</p></Link>
        </div>
      


      </Board>
  );
}

export default Boardinfo;
