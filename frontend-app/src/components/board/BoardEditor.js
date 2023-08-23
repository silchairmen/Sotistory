import axios from 'axios';
import { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styled from 'styled-components';

const BoardEditor = () => {
    const modules = {
        toolbar: {
            container: [
                [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                [{ 'font': [] }],
                [{ 'align': [] }],
                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }, 'link'],
                [{ 'color': ['#000000', '#e60000', '#ff9900', '#ffff00', '#008a00', '#0066cc', '#9933ff', '#ffffff', '#facccc', '#ffebcc', '#ffffcc', '#cce8cc', '#cce0f5', '#ebd6ff', '#bbbbbb', '#f06666', '#ffc266', '#ffff66', '#66b966', '#66a3e0', '#c285ff', '#888888', '#a10000', '#b26b00', '#b2b200', '#006100', '#0047b2', '#6b24b2', '#444444', '#5c0000', '#663d00', '#666600', '#003700', '#002966', '#3d1466', 'custom-color'] }, { 'background': [] }],
                ['image', 'video'],
                ['clean']  
            ],
        }
    }
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
        font-size: 40px;
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
        font-size: 18px;
        text-align:left;
        align-items:center;
        justify-content: center;
        vertical-align: middle;
    `
    const editorStyle = {
        height: '419px',
        background: 'white',
    };
    const [boardText,setBoardText]= useState("");
    const [boardTitle,setBoardTitle]= useState("");


    useEffect(() => {
        const getBoard = async () => {
            try {
                const resp = await axios.get(`https://jsonplaceholder.typicode.com/posts/1`);
                setBoardText(resp.data.body);
                setBoardTitle(resp.data.title);
            } catch (error) {
                console.error("Error fetching board data:", error);
            }
        };

        getBoard();
        
        const navbar = document.querySelector('#navbar');
        if (navbar) {
            navbar.classList.add('bg-gogo');
        }
    }, []);
    const handleTitleChange=(e)=>{
        setBoardTitle(e.target.value);
    }
    return (
        <Background>
            <MainHeader>
                글 작성
            </MainHeader>
            <EditorForm>
                <input type='checkbox' name="SecretCheck" value="SecretCheck"/>비밀 글
                <select name="boardname" className="select">
                    <option disabled selected>FreeBoard</option>
                </select>
                <div>
                <TextField placeholder="제목을 입력해주세요." value={boardTitle} onChange={handleTitleChange}/>
                </div>
                <button>작성</button>
                <ReactQuill modules={modules}
                    theme='snow'
                    placeholder='내용을 입력해주세요.'
                    value={boardText}
                    style={editorStyle}
                ></ReactQuill>
            </EditorForm>
        </Background>
    )
}

export default BoardEditor