import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import styled from 'styled-components';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
const Button = styled.button`
    display:block;
    position:relative;
    padding:1rem;
    margin:2rem 0;
    background-color:black;
    color:#fff;
    font-weight:600;
    text-align:center;
    border-radius:.5rem;
    transition:.3s;
    width: 30%;
    left: 47em;
    justify-content: right;
    &:hover{
        background-color:white;
        color: black;
        cursor: pointer;
        };
`

const MypageModal = ({ onSavePassword }) => {
    const [open, setOpen] = React.useState(false);
    const [inputPassword, setInputPassword] = React.useState("");

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSave = () => {
        onSavePassword(inputPassword); // 부모 컴포넌트로 password 전달
        handleClose();
    };

    return (
        <div  style={{fontfamily:"opensans"}}>
            <Button type="button" onClick={handleOpen}>저장하기</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <p style={{fontSize:"30px",padding:"10px",textAlign:"center"}}>
                        2차 인증
                        </p>
                    <p style={{fontSize:"20px",padding:"5px"}}>
                        비밀번호 입력
                    </p>
                    <input
                        type="password"
                        value={inputPassword}
                        onChange={(e) => setInputPassword(e.target.value)}
                    />
                    <button type='button' onClick={handleSave}>저장</button>
                </Box>
            </Modal>
        </div>
    );
}

export default MypageModal; 