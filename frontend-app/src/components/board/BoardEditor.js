import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState, ContentState, convertToRaw, convertFromHTML } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { useLocation } from 'react-router-dom';

const Background = styled.div`
    padding-top: 5%;
    width: 70%;
    height: 120vh;
    align-items:center;
    justify-content: center;
    margin: 0 auto; 
    background-color: whitesmoke;
`


const MainHeader = styled.h1`
    font-size: 30px;
    padding-bottom: 30px;
`

const EditorForm = styled.div`
    width:100%;
    height:80%;
    border: 1px solid rgba(0, 0, 0, 0.3);
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.7);
    border-radius: 10px;
    background-color: white;
    padding: 15px;
    
`


const TextField = styled.textarea`
    width: 60%;
    height: 50px;
    border: 1px solid rgba(0, 0, 0, 0.3);
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.7);
    border-radius: 5px;
    margin-bottom: 10px;
    outline: none;
    resize: none;
    font-size: 20px;
    text-align:center;
    vertical-align: middle;
    line-height: normal;
    justify-content: center; /* 가로 방향 가운데 정렬 */
    align-items: center; /* 세로 방향 가운데 정렬 */
    padding: 10px;
`


const BoardEditor = () => {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [boardText, setBoardText] = useState("");
    const [boardTitle, setBoardTitle] = useState("");
    const [boardpass, setBoardPass] = useState("");
    const [selectedValue, setSelectedValue] = useState("Question"); // 초기 선택 값
    const editorToHtml = draftToHtml(convertToRaw(editorState.getCurrentContent()));


    const location = useLocation();
    const splitUrl = location?.pathname?.split('/') ?? null;
    const onEditorStateChange = (editorState) => {
        // editorState에 값 설정
        setEditorState(editorState);
    };

    const getBoard = async () => {
        const indexNum = splitUrl[splitUrl.length-1];
        try {
            const resp = await axios.get(`/api/post/Question/post/${indexNum}`);
            setBoardText(resp.data.content);
            setBoardTitle(resp.data.title);
            setBoardPass(resp.data.password);
        } catch (error) {
            console.error("Error fetching board data:", error);
        }
    };

    useEffect(() => {
        if(splitUrl[splitUrl.length-1]!=="post"){
            getBoard();
        }
        const navbar = document.querySelector('#navbar');
        if (navbar) {
            navbar.classList.add('bg-gogo');
        }
    }, []);

    useEffect(() => {
        // 글 내용(boardText)을 Draft.js 형식으로 변환하여 에디터의 초기값으로 설정
        const contentState = ContentState.createFromText(boardText);
        const newEditorState = EditorState.createWithContent(contentState);
        setEditorState(newEditorState);

    }, [boardText]);


    const handleTitle = (e) => {
        setBoardTitle(e.target.value);
    }
    const handleSelectChange = (event) => {
        setSelectedValue(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setBoardPass(event.target.value);
    }

    const submitReview = async()=>{
        const titles = boardTitle;
        try{
            const data = new FormData();
            
            if (boardpass.trim() === ""){
                data.append('content',editorToHtml);
                data.append('title',titles);
            }else{
                data.append('content',editorToHtml);
                data.append('title',titles);
                data.append('password',boardpass);
            }
            const response = await axios.post(`/api/${selectedValue}/`, data, {withCredentials: true});
            if (selectedValue==="question"){
                window.location.href = '/Question';
            }else if(selectedValue==="notice"){
                window.location.href = '/Post';
            }
            
            // 응답 처리
            if (response.data.status === 200) {
                alert(response.data.responseMessage);
                
            } else{
                alert(response.data.responseMessage);
                // ... (에러 처리)
            }
        } catch (error) {
            console.log("오류");
            return 0;
            // ... (요청 실패 처리)
        }
    };
    


    return (
        <Background>
            <MainHeader>
                질문 작성
            </MainHeader>
            <div>
                <TextField
                    placeholder="제목을 입력해주세요."
                    value={boardTitle}
                    onChange={handleTitle}
                />
            </div>
            <button
                style={{
                    backgroundColor: "black",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    display: "inline-block",
                    marginBottom: "5px", // 아래쪽 여백을 설정
                    float: "right",
                    height: "50px",
                    width: "55px",
                    fontWeight: "bold",
                    margin: "10px",
                    boxShadow: "0 5px 10px rgba(0, 0, 0, 0.3)",
                }}
                    className="submit-button"
                    onClick={submitReview}
                >작성</button>
            <EditorForm>
                
            <select name="boardname" className="select" value={selectedValue} onChange={handleSelectChange}>
                <option value="question">Question</option>
                <option value="notice">Notice</option>
            </select>
            비밀번호:
            <input
                type="BoardPass"
                id="passwordInput"
                name="BoardPass"
                value={boardpass}
                onChange={handlePasswordChange}
            />
                <Editor
                    wrapperClassName="wrapper-class"
                    editorClassName="editor"
                    toolbarClassName="toolbar-class"
                    toolbar={{
                        // inDropdown: 해당 항목과 관련된 항목을 드롭다운으로 나타낼것인지
                        list: { inDropdown: true },
                        textAlign: { inDropdown: true },
                        link: { inDropdown: true },
                        history: { inDropdown: false },
                        fontSize: {
                            icon: 'fontSize', // 아이콘
                            inDropdown: true, // 드롭다운으로 표시
                            options: [10, 12, 14, 16, 18, 20], // 사용 가능한 폰트 크기 옵션
                        },
                        fontFamily: {
                            options: ['Arial', 'Georgia', 'Impact', 'Tahoma', 'Times New Roman', 'Verdana'],
                        },
                    }}
                    placeholder="내용을 작성해주세요."
                    value={boardText}
                    // 한국어 설정
                    localization={{ 
                        locale: 'ko',
                    }}
                    // 초기값 설정
                    editorState={editorState}
                    // 에디터의 값이 변경될 때마다 onEditorStateChange 호출
                    onEditorStateChange={onEditorStateChange}
                />
            </EditorForm>
        </Background>
    )
}

export default BoardEditor;