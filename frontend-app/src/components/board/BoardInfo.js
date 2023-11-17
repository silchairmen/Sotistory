import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import '../../css/Board.css';
import { useSelector} from "react-redux";
import { Viewer } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
const Board=styled.div`
  background-color:white;
  display: flex;
  justify-content: center;
  align-items: center;
  height: auto;
`

function Boardinfo({address}) {
  const [boardData, setBoardData] = useState({});
  const [commentInfo, setCommentInfo] = useState([]);
  const [boardText,setBoardText] = useState();
  const [boardType, setBoardType] = useState("");
  const { id } = useParams();
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [password, setPassword] = useState('');
  const [modalOpen, setModalOpen] = useState(false); // 모달 창 표시 여부
  const [modalContent, setModalContent] = useState(''); // 모달 창 내용
  const [showModal, setShowModal] = useState(false);
  const loaddata=useSelector(state => state.search.keyword);
  const loadtype=useSelector(state => state.search.type);
  const [comment, setComment] = useState('');

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value); // 입력값이 변경될 때 상태를 업데이트
  };

  const handleButtonClick = async () => {
    const data = new FormData();
    data.append('content',comment);
    const cresp = await axios.post(`/api/question/comment/${id}`, data, {withCredentials: true});
    console.log(cresp.data)
    window.location.reload();
    alert("댓글이 입력되었습니다.");

  };

  const handlePasswordSubmit = async () => {
    try {
      // 비밀번호 확인 요청
      setShowModal(false);
      const resps = await axios.get(`/api/question/${id}?password=${password}`);
      console.log(resps.data);
      if (resps.data.postId >= 1) {
        setBoardType(resps.data.postType);
        setBoardData(resps.data);
        setBoardText(resps.data.content)
      } else {
        // 비밀번호가 틀렸을 때 모달 창을 표시
        setModalContent('비밀번호가 틀렸습니다.');
        setModalOpen(true);
      }
    } catch (error) {
      console.error('Error while checking password:', error);
    }
  };

  
  const testhandle=()=>{
    setBoardText(boardData.content)
  }

  useEffect(() => {
    const getInfo = async () => {
      try {
        const resp = await axios.get(`/api/question/${id}`);
        console.log(resp.data);
        console.log("asd")
        if (resp.status === 200 ){
          setBoardType(resp.data.postType);
          setBoardData(resp.data);
          setCommentInfo(resp.data.commentInfoDtoList)
        } else {
          setShowModal(true);
        }
        
      } catch (error) {
        console.error("Error fetching board info:", error);
      }
    };
    getInfo();
  },[id]);
  useEffect(()=>{
    setBoardText(boardData.content)
  },[boardData])
  const slicecomment = commentInfo.slice(0);
  console.log(slicecomment); 
  return (
    <Board>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>비밀번호</h2>
            <p><input placeholder="비밀번호 입력" value={password} onChange={handlePasswordChange} /></p>
            <button onClick={handlePasswordSubmit}>입력</button>
          </div>
        </div>
      )}
      <div className="black-box"></div>
      <div className="boardcontainer board_mt-5">
        <div className="board_col-lg-8">
          <article>
            <header className="board_mb-4c" style={{ height: "10vh" }}>
              <h1 className="board_fw-bolder board_mb-1">{boardData.title}</h1>
              <div className="board_text-muted board_fst-italic board_mb-2">
                작성자 {boardData.writer}
              </div>
            </header>
            <section className="board_mb-5">
              <div
                style={{
                  display: "flex",
                  justifyContent: "left",
                  marginBottom: "-17px",
                }}
              >
                <h4>
                  <p className="board_mb-4" style={{ color: "gray" }}>
                    본문
                  </p>
                </h4>
              </div>
              <div className="board_textbox">
                {/* boardText가 값이 있는 경우에만 Viewer를 렌더링 */}
                {boardText && <Viewer events={["load", "change"]} initialValue={boardText} />}
              </div>
            </section>
          </article>
                    <Link to={{pathname:`/Question/modifier/${id}`,state:{id: id}}}><p style={{color: 'blue',}}>글 수정</p></Link>

                    <section className="board_mb-5s">
                        <div className="bg-light">
                            <div style={{ display: 'flex', justifyContent: 'left', marginBottom: '-17px'}}><h4><p style={{color: 'green',}}></p></h4></div>
                                <form className="board_mb-4 board_ms-4"><textarea className="board_form-control" rows="3" placeholder="댓글을 입력해주세요." value={comment} onChange={handleCommentChange}></textarea></form>
                                <div style={{ display: 'flex', justifyContent: 'flex-end', paddingRight: '10px', cursor: 'pointer' }} onClick={handleButtonClick}><p style={{ color: 'green', fontSize: '14px', marginTop: '-15px' }}>작성</p></div>
                    {slicecomment.map((commentDetail, index) => {
                    if (loadtype === "" || (commentDetail[loadtype].includes(loaddata))) {
                      return (
                        <div className="board_d-flex board_mb-4s board_lh-1">
                          <div className="board_ms-3">
                            <div className="board_fw-bold"><p>{commentDetail.writer}</p></div>
                            <p className="board_fw-bold2">{commentDetail.content}</p>
                          </div>
                        </div>
                    );
                    }
                  })}
                        </div>
                    </section>
                </div>

      
        </div>
        <Viewer initialValue={boardData.content}/>
      </Board>
      
      
  );
}

export default Boardinfo; 
