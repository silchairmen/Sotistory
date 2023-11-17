import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import '../../css/Board.css';
import { useSelector } from "react-redux";
import { Viewer } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import 'prismjs/themes/prism.css';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import Prism from 'prismjs';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';

const Board = styled.div`
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  height: auto;
  width: 100%;
`;

function Boardinfo({ address }) {
  const [boardData, setBoardData] = useState({});
  const [commentInfo, setCommentInfo] = useState([]);
  const [boardText, setBoardText] = useState();
  const [boardType, setBoardType] = useState("");
  const { id } = useParams();
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [password, setPassword] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [showModal, setShowModal] = useState(false);
  const loaddata = useSelector(state => state.search.keyword);
  const loadtype = useSelector(state => state.search.type);
  const [comment, setComment] = useState('');
  const [textboxHeight, setTextboxHeight] = useState(0);

  const [requestAddress,setRequestAddress] = useState("");

  const location = useLocation();
  const splitUrl = location?.pathname?.split('/') ?? null;

  const [buttonStates, setButtonStates] = useState({
    delete: false,
    modify: false,
    submit: false,
    answer: false,
  });
  const PostAddress = splitUrl[1];
  const Id = splitUrl[splitUrl.length-1]

  const submitAnswer=async()=>{
    const data = new FormData();
    data.append("answerCompleted",true);
    data.append('content',boardText);
    data.append('title',boardData.title);
    
    console.log(PostAddress)
    if (PostAddress === "Question"){
      setRequestAddress("question")
    }else if (PostAddress === "Post"){
      setRequestAddress("promotional")
    }
    const response = await axios.put(`/api/question/${Id}`, data, {withCredentials: true}); 
    if (response.status===200){
      alert("저장 성공")
    }
  }
  const submitDelete=async()=>{
    const res=await axios.delete(`/api/question/${Id}`, {withCredentials: true});
    if(res.data.status===200){
      alert("삭제 성공")
      window.location.href=`/${PostAddress}`
    }else{
      alert("잘못된 접근입니다.")
    }
  }
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleCommentChange = (e) => {
    setComment(e.target.value);
    e.target.style.height='auto';
    e.target.style.height= e.target.scrollHeight + 'px';
  };

  const handleButtonClick = async () => {
    const data = new FormData();
    data.append('content', comment);
    const cresp = await axios.post(`/api/question/comment/${id}`, data, { withCredentials: true });
    console.log(cresp.data);
    window.location.reload();
    alert("댓글이 입력되었습니다.");
  };

  const handlePasswordSubmit = async () => {
    try {
      setShowModal(false);
      const resps = await axios.get(`/api/question/${id}?password=${password}`);
      console.log(resps.data);
      if (resps.data.postId >= 1) {
        setBoardType(resps.data.postType);
        setBoardData(resps.data);
        setBoardText(resps.data.content)
      } else {
        setModalContent('비밀번호가 틀렸습니다.');
        setModalOpen(true);
      }
    } catch (error) {
      console.error('Error while checking password:', error);
    }
  };

  useEffect(() => {
    // 여기서 boardText의 내용에 따라 높이를 계산하고 업데이트합니다.
    if (boardText) {
      const textArea = document.createElement("textarea");
      textArea.innerHTML = boardText;
      document.body.appendChild(textArea);
      setTextboxHeight(textArea.scrollHeight);
      document.body.removeChild(textArea);
    }
  }, [boardText]);
  const handleTextChange = (e) => {
    setBoardText(boardData.content);
    e.target.style.height='auto';
    e.target.style.height= e.target.scrollHeight + 'px';
  };


  useEffect(() => {
    const getInfo = async () => {
      try {
        const resp = await axios.get(`/api/question/${id}`);
        console.log(resp.data);
        console.log("asd")
        if (resp.status === 200) {
          setBoardType(resp.data.postType);
          setBoardData(resp.data);
          setCommentInfo(resp.data.commentInfoDtoList);
        } else {
          setShowModal(true);
        }
      } catch (error) {
        console.error("Error fetching board info:", error);
      }
    };
    getInfo();
  }, [id]);
  const formatDate=(dateString)=> {
    const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    const formattedDate = new Date(dateString).toLocaleDateString(undefined, options);
    return formattedDate;
  }
  useEffect(() => {
    setBoardText(boardData.content);
  }, [boardData]);

  const slicecomment = commentInfo.slice(0);
  const handleButtonMouseEnter = (button) => {
    setButtonStates((prevState) => ({ ...prevState, [button]: true }));
  };

  const handleButtonMouseLeave = (button) => {
    setButtonStates((prevState) => ({ ...prevState, [button]: false }));
  };

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
      <div className="board_mt-5" style={{padding:"10px",width:"70%"}}>
        <div className="board_col-lg-8">
          <article>
            <header style={{ height: "10vh", textAlign:"left",lineHeight:"3.3rem"}}>
              <p className="board_fw-bolder board_mb-1" style={{fontSize:"3rem"}}>{boardData.title}</p>
              <div style={{position:"relative",paddingBottom:"10px"}}>
                <div style={{marginTop:"20px"}}>
                  <p style={{position:"absolute",fontSize:"1.5rem"}}>{boardData.writer}</p>
                  {boardData.createDate && boardData.lastModifiedDate ? (
                    <p style={{float:"right", width:"10rem",position:"relative"}}>{formatDate(boardData.createDate)}</p>
                  ) : (
                    <p style={{float:"right"}}>{formatDate(boardData.lastModifiedDate)}</p>
                  )}
                </div>
              </div>
            </header>
            <hr style={{width:"100%",left:"0",position:"relative", marginLeft:"0",border:"1px solid #f0e8e8"}}/>
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
              <div className="board_textbox" style={{paddingBottom:"5rem",paddingRight:"10px",paddingTop:"3.2rem"}}>
                {boardText && <Viewer events={["load", "change"]} plugins={[[codeSyntaxHighlight, { highlighter: Prism }]]} initialValue={boardText} onChange={handleTextChange}/>}
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "1rem",marginRight:"0.5rem" }}>
                <p onClick={submitDelete} onMouseEnter={() => handleButtonMouseEnter("delete")} onMouseLeave={() => handleButtonMouseLeave("delete")} style={{textDecoration: buttonStates.delete ? "underline" : "none", backgroundColor:"#666", width: "5rem", cursor: "pointer", textAlign: "center", marginLeft: "1rem",textShadow: "0px -1px #474747",borderColor:"#444",color: "#fff",borderWidth:"1px 1px 3px 1px",borderStyle:"solid", borderradius: "2px",height:"2.5rem"}}>삭제</p>
                <Link to={{ pathname: `/Questi'on/modifier/${id}`, state: { id: id } }} style={{ width: "5rem", color: 'blue',  textAlign: "center", marginLeft: "1rem",color: 'inherit', textDecoration: 'none'}}>
                    <p onMouseEnter={() => handleButtonMouseEnter("modify")} onMouseLeave={() => handleButtonMouseLeave("modify")} style={{textDecoration: buttonStates.modify ? "underline" : "none",backgroundColor:"#666",textShadow: "0px -1px #474747",borderColor:"#444",color: "#fff",borderWidth:"1px 1px 3px 1px",borderStyle:"solid", borderradius: "2px",height:"2.5rem"}}>수정</p>
                </Link>
                <p onClick={submitAnswer} onMouseEnter={() => handleButtonMouseEnter("answer")} onMouseLeave={() => handleButtonMouseLeave("answer")} style={{textDecoration: buttonStates.answer ? "underline" : "none", backgroundColor:"#3b4890", width: "5.8rem", cursor: "pointer", textAlign: "center", marginLeft: "1rem",textShadow: "0px -1px #474747",borderColor:"#29367c",color: "#fff",borderWidth:"1px 1px 3px 1px",borderStyle:"solid", borderradius: "2px",height:"2.5rem"}}>답변 완료</p>
              </div>
            </section>
          </article>
          <section className="board_mb-5s">
            <div className="bg-light" style={{border:"1px solid #f0e8e8"}}>       {/*댓글 입력란*/}
              <div style={{ display: 'flex', justifyContent: 'left' }}></div>
              <form className="board_mb-4 board_ms-4">
                <textarea
                  className="board_form-control"
                  rows="1"
                  placeholder="댓글을 입력해주세요."
                  value={comment}
                  onChange={handleCommentChange}
                  style={{ border: 0, outline: "none",resize:"none",width:"100%"}}
                ></textarea>
              </form>
              <div onMouseEnter={() => handleButtonMouseEnter("submit")} onMouseLeave={() => handleButtonMouseLeave("submit")} onClick={handleButtonClick} style={{ display: 'flex', justifyContent: 'flex-end', paddingRight: '20px', width: "100%", }} >
                <p  style={{textDecoration: buttonStates.submit ? "underline" : "none" ,color: 'green', fontSize: '14px', marginTop: '-15px', cursor: 'pointer'}}>댓글 작성</p>
              </div>
            </div>
            
            <br/>
            <br/>
            <div style={{width:"100%", position:"relative",border:"1px solid #f0e8e8"}}>
              {slicecomment.map((commentDetail, index) => {
                  if (loadtype === "" || (commentDetail[loadtype].includes(loaddata))) {
                    return (
                      <div className="board_d-flex board_mb-4s board_lh-1" key={index}>
                        <div className="board_ms-3">
                          <p className="board_fw-bold" style={{fontSize:"1.5rem",marginBottom:"1rem"}}>{commentDetail.writer}</p>
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
    </Board>
  );
}

export default Boardinfo;
