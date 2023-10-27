import { useState,useEffect,useCallback } from 'react';
import axios from 'axios';
import './TestPage.scss';
import photo from '../img/myphoto.jpg';
import profile from '../img/profile_img_A.png';
import MypageModal from './MypageModal';
import styled from 'styled-components';
const TestPage=()=> {
  const [nickname,setNickname] = useState("");
  const [name,setName] = useState("");
  const [joinyear,setJoinyear] = useState("");
  const [stunum,setStunum] = useState("");
  const [email,setEmail] = useState("");
  const [address,setAddress] = useState("");
  const [interest,setInterest] = useState("");
  const [password,setPassword] = useState("");
  const [menuNum, setMenuNum] = useState("0");
  const [inputPassword,setInputPassword] = useState("");
  const [tistory,setTistory] = useState("");
  const [github,setGithub] = useState("");
  const [dreamhack,setDreamhack] = useState("");


  const MypageHr = styled.hr`
    width:100%;
    margin-top:0px;
    margin-bottom:0px;
    margin-left:0px;
  `

  const handleSave = async(event) => {
    event.preventDefault();
    const data = new FormData();
    data.append('nickname',nickname);
    data.append('name',name);
    data.append('joinYear',joinyear);
    data.append('stuNum',stunum);
    data.append('email',email);
    data.append('address',address);
    data.append('interests',interest);
    const passData = new FormData();
    passData.append('password',password);
    const response = await axios.put('http://localhost:80/api/member/myPage/edit',data, {withCredentials: true});
    //const responsePass = await axios.post('http://localhost:80/api/member/myPage/edit',passData, {withCredentials: true});
          // 응답 처리
      
    if (response.data.status === 200) {
    } else{
      console.log(response.data);
        // ... (에러 처리)
      }
  };
  const receiveData= useCallback(()=>{
    console.log(password);
    handleSave();
  })
  const handleSavePassword = (inputPassword)=>{
    setPassword(inputPassword);
  }
  const handleMenuClick = (num) => {
    setMenuNum(num);
  }
  useEffect(()=>{
    const navbar = document.querySelector('#navbar');
      if (navbar) {
        navbar.classList.add('bg-gogo');
      }
    const loadMyData= async()=>{
      const response = await axios.get('http://localhost:80/api/member/myPage', {withCredentials: true});
      if (response.data.status===200){
        setNickname(response.data.memberInfo.nickname);
        setName(response.data.memberInfo.name);
        setJoinyear(response.data.memberInfo.joinYear);
        setStunum(response.data.memberInfo.stuNum);
        setEmail(response.data.memberInfo.email);
        setAddress(response.data.memberInfo.address);
        setInterest(response.data.memberInfo.interests);
      }
    }
    loadMyData();
  },[]);
  const handleNicknameChange=(e)=>{
    setNickname(e.target.value);
  }
  const handleNameChange=(e)=>{
    setName(e.target.value);
  }
  const handleJoinYearChange=(e)=>{
    setJoinyear(e.target.value);
  }
  const handleStuNumChange=(e)=>{
    setStunum(e.target.value);
  }
  const handleAddressChange=(e)=>{
    setAddress(e.target.value);
  }
  const handleTistoryChange=(e)=>{
    setTistory(e.target.value);
  }
  const handleGithubChange=(e)=>{
    setGithub(e.target.value);
  }
  const handleDreamhackChange=(e)=>{
    setDreamhack(e.target.value);
  }
  if (menuNum==="0"){
    return (
      <div className='background'>
        <div className='menu__0'>
        <link href='https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css' rel='stylesheet'></link>
        <div className="menu__mypage">
          <div className="menu__mypage__content">
            <div className="menu__mypage__forms">
              <form action="" className="menu__mypage__register" id="menu__mypage-up">
                <ul className='list'>
                  <li className='list__box'onClick={()=>handleMenuClick("0")}>
                    <img className='menu__profile' src={profile} alt='menu__profile'/>
                  </li>
                  <li className='list__box'onClick={()=>handleMenuClick("1")}>
                    <p className='list__font' >자기 소개</p>
                  </li>
                </ul>
                <div></div>
                  <div className='mypage_profile__box'>
                    <img className='mypage_profile' src={photo} alt='mypage_profile'/>
                  </div>
                  <button className='img_button'>이미지 변경</button>
                  <div className="menu__mypage__inbox1">
                    <p className='menu__mypage__p'>닉네임</p>
                    <MypageHr/>
                    <input type="text" id="nickname" className="menu__mypage__input" value={nickname} onChange={handleNicknameChange}/>
                  </div>
            <div className="menu__mypage__box">
              <div className="menu__mypage__inbox">
              <p className='menu__mypage__p'>이름</p>
              <MypageHr/>
              <input type="text" id="name" className="menu__mypage__input" value={name} onChange={handleNameChange}/>
              </div>
              </div>
            <div className="menu__mypage__box">
              <div className='menu__mypage__inbox'>
              <p className='menu__mypage__p'>기수</p>
              <MypageHr/>
              <input type="text" id="joinyear" className="menu__mypage__input" value={joinyear} onChange={handleJoinYearChange}/>
              </div>
            </div>
            <div className="menu__mypage__box">
              <div className="menu__mypage__inbox">
              <p className='menu__mypage__p'>학번</p>
              <MypageHr/>
              <input type="text" id="stunum" className="menu__mypage__input" value={stunum} onChange={handleStuNumChange}/>
              </div>
            </div>
            <div className="menu__mypage__box">
              <div className="menu__mypage__inbox">
                <p className='menu__mypage__p'>거주지</p>
                <MypageHr/>
              <input type="text" id="address" className="menu__mypage__input" value={address} onChange={handleAddressChange}/>
              </div>
            </div>
                <MypageModal receiveData={receiveData}/>
              </form>
            </div>
          </div>
        </div>
      </div>
      </div>
    );
  }else if(menuNum==="1"){
    return (
      <div className='background'>
        <link href='https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css' rel='stylesheet'></link>
        <div className="menu__mypage">
          <div className="menu__mypage__content">
            <div className="menu__mypage__forms">
              <form action="" className="menu__mypage__register" id="menu__mypage-up">
                <ul className='list'>
                  <li className='list__box'onClick={()=>handleMenuClick("0")}>
                    <img className='menu__profile' src={profile} alt='profile_menu_img'/>
                  </li>
                  <li className='list__box'onClick={()=>handleMenuClick("1")}>
                    <p className='list__font' >자기 소개</p>
                  </li>
                </ul>
                <div></div>
                <p style={{position:"absolute",fontSize:"20px",left:"28%"}}>[직급]{nickname}</p>
                  <div className='mypage_profile__box'>
                    
                    <img className='mypage_profile' src={photo} alt='mypage_profile'/>
                  </div>
                  <button className='img_button'>이미지 변경</button>
                  <div className="menu__mypage__inbox1">
                    <p className='menu__mypage__p'>닉네임</p>
                    <MypageHr/>
                    <input type="text" id="nickname" className="menu__mypage__input" value={nickname} onChange={handleNicknameChange}/>
                  </div>
            <div className="menu__mypage__box">
              <div className="menu__mypage__inbox">
              <p className='menu__mypage__p'>티스토리</p>
              <MypageHr/>
              <input type="text" id="tistory" className="menu__mypage__input" value={tistory} onChange={handleTistoryChange}/>
              </div>
              </div>
            <div className="menu__mypage__box">
              <div className='menu__mypage__inbox'>
              <p className='menu__mypage__p'>깃허브</p>
              <MypageHr/>
              <input type="text" id="github" className="menu__mypage__input" value={github} onChange={handleGithubChange}/>
              </div>
            </div>
            <div className="menu__mypage__box">
              <div className="menu__mypage__inbox">
              <p className='menu__mypage__p'>드림핵</p>
              <MypageHr/>
              <input type="text" id="dreamhack" className="menu__mypage__input" value={dreamhack} onChange={handleDreamhackChange}/>
              </div>
            </div>
            <div className="menu__mypage__box">
              <div className="menu__mypage__inbox">
                <p className='menu__mypage__p'>수상 \
                이력</p>
                <MypageHr/>
              <input type="text" id="address" className="menu__mypage__input" value={address} onChange={handleAddressChange}/>
              </div>
            </div>
                <a className='menu__mypage__button' onClick={handleSave}>
                  저장하기
                </a>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
}

export default TestPage;
