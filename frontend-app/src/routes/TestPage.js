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
  const [tistory,setTistory] = useState("");
  const [github,setGithub] = useState("");
  const [dreamhack,setDreamhack] = useState("");
  const [position,setPosition] = useState("");
  const [skills,setSkills] = useState("");
  const [award,setAward] = useState("");


  const MypageHr = styled.hr`
    width:100%;
    margin-top:0px;
    margin-bottom:0px;
    margin-left:0px;
  `

  const handleSave = async(event) => {
    console.log(event.target.form);
    event.preventDefault();
    if (menuNum==="0"){
      const data = new FormData(event.currentTarget.form);
      const response = await axios.put(`http://localhost:80/api/member/info/edit`,data, {withCredentials: true});
      if (response.data.status === 200) {          // 응답 처리
        console.log("저장성공");
      } else{
        console.log(response.data);
          // ... (에러 처리)
        }
    }else if(menuNum==="1"){
      const data = new FormData(event.currentTarget.form);
      const response = await axios.put(`http://localhost:80/api/member/profile/edit`,data, {withCredentials: true});
      if (response.data.status === 400) {          // 응답 처리
        console.log("저장성공");
      } else{
        console.log(response.data);
          // ... (에러 처리)
        }
    }

      
    
  };
  const handleMenuClick = (num) => {
    setMenuNum(num);
  }
  useEffect(()=>{
    const navbar = document.querySelector('#navbar');
      if (navbar) {
        navbar.classList.add('bg-gogo');
      }
    const loadMyData= async()=>{
      if (menuNum==="0"){
        const response = await axios.get('http://localhost:80/api/member/info', {withCredentials: true});
        if (response.data.status===200){
          setNickname(response.data.memberInfo.nickname);
          setName(response.data.memberInfo.name);
          setJoinyear(response.data.memberInfo.joinYear);
          setStunum(response.data.memberInfo.stuNum);
          setEmail(response.data.memberInfo.email);
          setAddress(response.data.memberInfo.address);
          setInterest(response.data.memberInfo.interests);
        }
      }else if(menuNum==="1"){
        const response = await axios.get('http://localhost:80/api/member/profile', {withCredentials: true});
        if (response.data.status===200){
          setAward(response.data.memberProfileDto.awards);
          setDreamhack(response.data.memberProfileDto.dreamhackAddr);
          setGithub(response.data.memberProfileDto.githubAddr);
          setSkills(response.data.memberProfileDto.skills);
          setTistory(response.data.memberProfileDto.tistoryAddr);
          setPosition(response.data.memberProfileDto.position);
        }
      }
      

    }
    loadMyData();
  },[menuNum]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "nickname":
        setNickname(value);
        break;
      case "name":
        setName(value);
        break;
      case "joinYear":
        setJoinyear(value);
        break;
      case "stuNum":
        setStunum(value);
        break;
      case "address":
        setAddress(value);
        break;
      case "tistoryAddr":
        setTistory(value);
        break;
      case "githubAddr":
        setGithub(value);
        break;
      case "dreamhackAddr":
        setDreamhack(value);
        break;
      case "skills":
        setSkills(value);
        break;
      case "awards":
        setAward(value);
        break;
      default:
        break;
    }
  };
  if (menuNum==="0"){
    return (
      <div className='background'>
        <div className='menu__0'>
        <link href='https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css' rel='stylesheet'></link>
        <div className="menu__mypage">
          <div className="menu__mypage__content">
            <div className="menu__mypage__forms">
              <form action="" className="menu__mypage__register" id="menu__mypage-up"style={{width:"500px"}}> 
                <ul className='list' style={{width:"20%"}}>
                  <li className='list__box'onClick={()=>handleMenuClick("0")}>
                    <img className='menu__profile' src={profile} alt='menu__profile'/>
                  </li>
                  <li className='list__box'onClick={()=>handleMenuClick("1")}>
                    <p className='list__font' >자기 소개</p>
                  </li>
                </ul>
                <div></div>
                  
            <div className="menu__mypage__box" style={{marginLeft:"20%",width:"80%"}}>
              <div className="menu__mypage__inbox">
                <p className='menu__mypage__p'>닉네임</p>
                <MypageHr/>
                <input type="text" name='nickname' id="nickname" className="menu__mypage__input" value={nickname} onChange={handleInputChange}/>
              </div>
              <div className="menu__mypage__inbox">
              <p className='menu__mypage__p'>이름</p>
              <MypageHr/>
              <input type="text" name='name' id="name" className="menu__mypage__input" value={name} onChange={handleInputChange}/>
              </div>
              <div className='menu__mypage__inbox'>
              <p className='menu__mypage__p'>기수</p>
              <MypageHr/>
              <input type="text" name='joinYear' id="joinyear" className="menu__mypage__input" value={joinyear} onChange={handleInputChange}/>
              </div>
              <div className="menu__mypage__inbox">
              <p className='menu__mypage__p'>학번</p>
              <MypageHr/>
              <input type="text" name='stuNum' id="stunum" className="menu__mypage__input" value={stunum} onChange={handleInputChange}/>
              </div>
              <div className="menu__mypage__inbox">
                <p className='menu__mypage__p'>거주지</p>
                <MypageHr/>
              <input type="text" name='address' id="address" className="menu__mypage__input" value={address} onChange={handleInputChange}/>
              </div>
              </div>
              <button className='menu__mypage__button' type='submit' onClick={handleSave} style={{left:"25%",width:"72%",cursor:"pointer"}}>저장하기</button>
              <input type="hidden" name='email' id="email" className="menu__mypage__input" value={email}/>
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
              <form action="" className="menu__mypage__register" id="menu__mypage-up" style={{width:"1000px"}}>
                <ul className='list' style={{width:"10%"}}>
                  <li className='list__box'onClick={()=>handleMenuClick("0")}>
                    <img className='menu__profile' src={profile} alt='profile_menu_img'/>
                  </li>
                  <li className='list__box'onClick={()=>handleMenuClick("1")}>
                    <p className='list__font' >자기 소개</p>
                  </li>
                </ul>
                <div></div>
                <p style={{position:"absolute",fontSize:"20px",left:"28%"}}>[{position}]{nickname}</p>
                  <div className='mypage_profile__box'>
                    
                    <img className='mypage_profile' src={photo} alt='mypage_profile'/>
                  </div>
                  <button className='img_button'>이미지 변경</button>
                  <div className="menu__mypage__inbox1">
                    <p className='menu__mypage__p'>스킬</p>
                    <MypageHr/>
                    <input type="text" name='skills' id="skills" className="menu__mypage__input" value={skills} onChange={handleInputChange}/>
                  </div>
            <div className="menu__mypage__box" style={{marginLeft:"auto"}}>
              <div className="menu__mypage__inbox">
              <p className='menu__mypage__p'>티스토리</p>
              <MypageHr/>
              <input type="text" name='tistoryAddr' id="tistory" className="menu__mypage__input" value={tistory} onChange={handleInputChange}/>
              </div>
              <div className='menu__mypage__inbox'>
              <p className='menu__mypage__p'>깃허브</p>
              <MypageHr/>
              <input type="text" name='githubAddr' id="github" className="menu__mypage__input" value={github} onChange={handleInputChange}/>
              </div>
              <div className="menu__mypage__inbox">
              <p className='menu__mypage__p'>드림핵</p>
              <MypageHr/>
              <input type="text" name='dreamhackAddr' id="dreamhack" className="menu__mypage__input" value={dreamhack} onChange={handleInputChange}/>
              </div>
              <div className="menu__mypage__inbox">
                <p className='menu__mypage__p'>수상 이력</p>
                <MypageHr/>
              <input type="text" name='awards' id="awards" className="menu__mypage__input" value={award} onChange={handleInputChange}/>
              </div>
              </div>
                <button className='menu__mypage__button' type='submit' onClick={handleSave} style={{left: "47em",width: "30%",cursor:"pointer"}}>
                  저장하기
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
}

export default TestPage;
