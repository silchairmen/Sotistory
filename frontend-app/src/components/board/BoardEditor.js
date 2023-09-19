import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState, ContentState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { useLocation } from 'react-router-dom';

const Background = styled.div`
    padding-top: 5%;
    width: 80%;
    height: 80vh;
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
    border : 1px solid #444444;
    background-color: white;
`

const TextField = styled.textarea`
    width: 60%;
    height: 2em;
    border: 1px solid whitesmoke;
    resize: none;
    font-size: 14px;
    text-align:left;
    align-items:center;
    justify-content: center;
    vertical-align: middle;
`


const BoardEditor = () => {
    const [hidden,setHidden] = useState(false);
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [boardText, setBoardText] = useState("");
    const [boardTitle, setBoardTitle] = useState("");
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
            const resp = await axios.get(`http://localhost:80/api/post/freeBoard/post/${indexNum}`);
            setBoardText(resp.data.content);
            setBoardTitle(resp.data.title);
        } catch (error) {
            console.error("Error fetching board data:", error);
        }
    };

    
    useEffect(() => {
        getBoard();
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
    const handleChangeHidden = () => {
        if (hidden===false){
            setHidden(true);
            console.log(hidden);
        }else {
            setHidden(false);
            console.log(hidden);
        }
    }

    const handleTest= () => {
        console.log(splitUrl[splitUrl.length-1]);
    }
    const submitReview = async()=>{
        const titles = boardTitle;
        try{
            const data = new FormData();
          
            data.append('content',editorToHtml);
            data.append('title',titles);
            data.append('postType',"NORMAL");
            const response = await axios.post('http://localhost:80/api/post/freeBoard/create', data, {withCredentials: true});
                  // 응답 처리
            if (response.data.status === 300) {
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
                글 작성
            </MainHeader>
            <EditorForm>
                <input type='checkbox' name="SecretCheck" value="SecretCheck" checked={hidden} onChange={handleChangeHidden}/>비밀 글
                <select name="boardname" className="select" defaultValue="freeBoard">
                    <option enabled="true" value="freeBoard">freeBoard</option>
                    <option enabled="true" value="freeBoard2">freeBorad2</option>
                </select>
                <TextField placeholder="제목을 입력해주세요." value={boardTitle} onChange={handleTitle}/>
                <button
                    className="submit-button"
                    onClick={submitReview}
                >작성</button>
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
            <button onClick={handleTest}>테스트</button>
        </Background>
    )
}

export default BoardEditor;
