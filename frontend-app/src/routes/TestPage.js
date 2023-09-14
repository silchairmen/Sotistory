import { useState } from 'react';
import axios from 'axios';
import './TestPage.scss';
import { Avatar } from "@mui/material";
import SotiMyPage from "../img/SotiMyPage.png";
const TestPage=()=> {
  const handleSave = async(event) => {
    event.preventDefault();
    try{
      const data = new FormData(event.currentTarget);
      const response = await axios.post('http://localhost:80/api/member/mypage/edit', data, {withCredentials: true});
            // 응답 처리
      if (response.data.status === 200) {
      } else if(response.data.status === 203){
        return 0;
        // ... (에러 처리)
      }
    } catch (error) {
      console.log("오류");
      return 0;
      // ... (요청 실패 처리)
    }
  };
  const ChangeAvatarHandle=()=>{

  }
  return (
    <div>
      <link href='https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css' rel='stylesheet'></link>
      <div className="login">
        <div className="login__content">
          <div className="login__img">
            <img src={SotiMyPage} alt="user login" />
          </div>
          <div className="login__forms">
            <form action="" className="login__register" id="login-up">
              <h1 className="login__title">내 프로필</h1>
              
              <div class="login__box">
            <i class='bx bx-user login__icon'></i>
            <input type="text" placeholder="닉네임" class="login__input"/>
          </div>
          <div class="login__box">
            <i class='bx bx-at login__icon'></i>
            <input type="text" placeholder="관심사항" class="login__input"/>
          </div>
          <div class="login__box">
            <i class='bx bx-lock login__icon'></i>
            <input type="password" placeholder="비밀번호" class="login__input"/>
          </div>
          <div class="login__box">
            <i class='bx bx-lock login__icon'></i>
            <input type="password" placeholder="비밀번호 재확인" class="login__input"/>
          </div>
              <a href="#" className="login__button" onClick={handleSave}>저장</a>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TestPage;
