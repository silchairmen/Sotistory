import axios from 'axios';
import { useEffect, useState,useRef} from 'react';
import styled from 'styled-components';
import '@toast-ui/editor/dist/toastui-editor.css';
import React from 'react';
import fontSize from "tui-editor-plugin-font-size";
import 'prismjs/themes/prism.css';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';
import { Editor } from '@toast-ui/react-editor';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useLocation } from 'react-router-dom';
import "tui-editor-plugin-font-size/dist/tui-editor-plugin-font-size.css";
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import '@toast-ui/editor-plugin-table-merged-cell/dist/toastui-editor-plugin-table-merged-cell.css';
import tableMergedCell from '@toast-ui/editor-plugin-table-merged-cell';

import Prism from 'prismjs';
// 여기 css를 수정해서 코드 하이라이팅 커스텀 가능
import 'prismjs/themes/prism.css';
import '../../css/spinner.scss';

const Background = styled.div`
    padding-top: 3rem;
    width: 100%;
    height: 100vh;
    background-color: white;
`



const EditorForm = styled.div`
    width:98%;
    height:100%;
    border-radius: 10px;
    background-color: white;
    padding: 15px;
    margin:0 auto;

`


const TextField = styled.textarea`
    width: 50rem;
    height: 80px;
    border: 0px solid rgba(0, 0, 0, 0.3);
    border-radius: 5px;
    margin-top: 10px;
    outline: none;
    resize: none;
    font-size: 2.75rem;
    vertical-align: middle;
    line-height: normal;
    justify-content: left; /* 가로 방향 가운데 정렬 */
    align-items: left; /* 세로 방향 가운데 정렬 */
    padding: 10px;
    overflow-y: hidden;
`


const Testboard = () => {
    const editorRef = useRef();
    const [boardText, setBoardText] = useState("");
    const [boardTitle, setBoardTitle] = useState("");
    const [boardpass, setBoardPass] = useState();
    const [selectedValue, setSelectedValue] = useState("question"); // 초기 선택 값
    const [showPasswordInput, setShowPasswordInput] = useState(false);
    const [checkModifier,setCheckModifier] = useState(false);
    const [loading, setLoading] = useState(true);

    const handleCheckboxChange = (e) => {
        setShowPasswordInput(e.target.checked);
    };
    const location = useLocation();
    const splitUrl = location?.pathname?.split('/') ?? null;
    const PostAddress = splitUrl[1];

    


    useEffect(() => {
        setLoading(true)
        const getBoard = async () => {
            const lastSegment = splitUrl[splitUrl.length - 1];
            const checkInt = Number(lastSegment);
    
            // 숫자로 변환 가능하고, 변환된 값이 원래 값과 같은지 확인
            if (!isNaN(checkInt) && Number.isInteger(checkInt) && checkInt.toString() === lastSegment) {
                try {
                    setLoading(true)
                    const resp = await axios.get(`/api/question/${lastSegment}`);
                    setBoardText(resp.data.content);
                    setBoardTitle(resp.data.title);
                    setBoardPass(resp.data.password);
                    setCheckModifier(true);
                    
                    console.log(boardText);
                } catch (error) {
                    console.error("Error fetching board data:", error);
                } finally {
                    setLoading(false);
                    console.log(boardText)
                }
            }else{
                setLoading(false)
            }
        };
        const navbar = document.querySelector('#navbar');
        if (navbar) {
            navbar.classList.add('bg-gogo');
        }
        if (PostAddress==="Question"){
            setSelectedValue("question")
        }else if(PostAddress==="Post"){
            setSelectedValue("promotional")
        }
        getBoard();
        
    }, []);
    useEffect(() => {
        // boardText의 업데이트된 값을 로그로 출력
        console.log("업데이트된 boardText:", boardText);
    // Editor 컴포넌트의 초기화가 완료된 후에 값을 설정
        if (editorRef.current) {
            editorRef.current.getInstance().setMarkdown(boardText);
        }

    }, [boardText]);
    const handleTitle = (e) => {
        e.target.style.height='auto'
        e.target.style.height= e.target.scrollHeight + 'px';
        setBoardTitle(e.target.value);
    }
    const handlePasswordChange = (event) => {
        setBoardPass(event.target.value);
    }

    const submitReview = async()=>{
        
        const lastSegment = splitUrl[splitUrl.length - 1];
        const checkInt = Number(lastSegment);
        console.log(selectedValue)
        {/* 새 글 작성 로직 */}
        if(lastSegment==="post"){
            try{
                const data = new FormData();
                if(selectedValue==="question"){
                    if (boardpass === undefined){
                        data.append('content',editorRef.current.getInstance().getMarkdown());
                        data.append('title',boardTitle);
                    }else if(boardpass!==null){
                        data.append('content',editorRef.current.getInstance().getMarkdown());
                        data.append('title',boardTitle);
                        data.append('password',boardpass);
                    }
                }else if(selectedValue ==="promotional"){
                    data.append('content',editorRef.current.getInstance().getMarkdown());
                    data.append('title',boardTitle);
                }
                
                const response = await axios.post(`/api/${selectedValue}/`, data, {withCredentials: true});
                window.location.href = `/${PostAddress}`;
                
                // 응답 처리
                if (response.status === 200) {
                    alert("작성 완료");
                    
                } else{
                    alert("작성 실패");
                    // ... (에러 처리)
                }
            } catch (error) {
                console.log(error);
                return 0;
                // ... (요청 실패 처리)
            }
            {/* 수정 로직 */}
        }else if(!isNaN(checkInt) && Number.isInteger(checkInt) && checkInt.toString() === lastSegment){
            try{
                const data = new FormData();
                if (boardpass === undefined){
                    data.append('content',editorRef.current.getInstance().getMarkdown());
                    data.append('title',boardTitle);
                }else if(boardpass!==null){
                    data.append('content',editorRef.current.getInstance().getMarkdown());
                    data.append('title',boardTitle);
                    data.append('password',boardpass);
                }
                const response = await axios.put(`/api/${selectedValue}/${lastSegment}`, data, {withCredentials: true});
                window.location.href = `/${PostAddress}/${lastSegment}`;
                
                // 응답 처리
                if (response.data.status === 200) {
                    alert("작성 완료");
                    
                } else{
                    alert("작성 실패");
                    // ... (에러 처리)
                }
            } catch (error) {
                console.log(error);
                return 0;
                // ... (요청 실패 처리)
            }
        };
}
    return (
        <Background>
            {loading ? (
                <div style={{display:"flex",alignItems:"center",justifyContent:"center",height:"100vh"}}>
                <svg className="spinner" width="65px" height="65px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
                <circle className="path" fill="none" strokeWidth="6" strokeLinecap="round" cx="33" cy="33" r="30"></circle>
            </svg></div>
            ) :(
            <EditorForm>
                {!loading&&checkModifier ? (
                    boardTitle && (
                        <TextField
                            placeholder="제목을 입력해주세요."
                            value={boardTitle}
                            onChange={handleTitle}
                            rows={1}
                        />
                    )
                ) : (
                    <TextField
                        placeholder="제목을 입력해주세요."
                        value={boardTitle}
                        onChange={handleTitle}
                        rows={1}
                    />
                )}
                <hr style={{ width: "8rem", left: "-0.5%", position: "relative", height: "0.5rem", border: "0", backgroundColor: "black" }} />
                {!loading&&checkModifier ? (
                        <Editor
                            initialValue={boardText}
                            previewStyle='vertical'
                            height="70vh"
                            initialEditType="wysiwyg"
                            useCommandShortcut={true}
                            plugins={[fontSize, colorSyntax, tableMergedCell,[codeSyntaxHighlight,{ highlighter: Prism }]]}
                            ref={editorRef}
                            hooks={{
                                addImageBlobHook: async (blob, callback) => {
                                    const data = new FormData();
                                    data.append("file",blob)
                                    const url = await axios.post('/api/img',data)
                                    callback(url.data);
                                }
                            }}
                        />
                ) : (
                    <Editor
                        initialValue={boardText}
                        previewStyle='vertical'
                        height="70vh"
                        initialEditType="wysiwyg"
                        useCommandShortcut={true}
                        plugins={[fontSize, colorSyntax, tableMergedCell,[codeSyntaxHighlight,{ highlighter: Prism }]]}
                        ref={editorRef}
                        hooks={{
                            addImageBlobHook: async (blob, callback) => {
                                const data = new FormData();
                                data.append("file",blob)
                                const url = await axios.post('/api/img',data)
                                callback(url.data);
                            }
                        }}
                    />
                )}
                <div style={{ alignItems: 'center', justifyContent: 'space-between', marginTop: '20px', width: '20rem', position: "absolute", right: '0.5em', height: '10%', alignContent: 'center' }}>
                    <div style={{ display: 'relative', alignItems: 'center' }}>
                        <p style={{ width: '4rem', }}>비밀 글 :</p>
                        <input
                            type="checkbox"
                            id="passwordCheckbox"
                            onChange={handleCheckboxChange}
                            style={{ position: "absolute", bottom: "4.4rem", left: "3.5rem" }}
                        />
                    </div>
                    {showPasswordInput && (
                        <input
                            type="password"
                            id="passwordInput"
                            name="BoardPass"
                            value={boardpass}
                            onChange={handlePasswordChange}
                            style={{ width: '8rem', padding: '8px', position: "absolute", right: "21rem", bottom: "3.5rem", fontFamily: "'TTWanjunuricheR', sans-serif" }}
                            placeholder='비밀번호 입력'
                        />
                    )}
                    <button
                        style={{
                            backgroundColor: 'black',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            height: '45px',
                            width: '200px',
                            boxShadow: '0 5px 10px rgba(0, 0, 0, 0.3)',
                            position: "absolute",
                            right: "2rem",
                            marginLeft: "1rem",
                            bottom: "3.3rem",
                            fontFamily: "'TTWanjunuricheR', sans-serif",
                            fontSize: "1rem",
                        }}
                        onClick={submitReview}
                    >
                        작성 완료
                    </button>
                </div>
            </EditorForm>)}
        </Background>
    )
}

export default Testboard;