import { useState,useEffect } from 'react';
import axios from 'axios';
import './TestPage.scss';
import photo from '../img/myphoto.jpg';
const TestPage=()=> {
  const [nickname,setNickname] = useState("");
  const [name,setName] = useState("");
  const [joinyear,setJoinyear] = useState("");
  const [stunum,setStunum] = useState("");
  const [email,setEmail] = useState("");
  const [address,setAddress] = useState("");
  const [interest,setInterest] = useState("");
  const handleSave = async(event) => {
    event.preventDefault();
    
    try{
      const data = new FormData(event.currentTarget);
      data.append('nickname',nickname);
      const response = await axios.put('http://localhost:80/api/member/myPage/edit',data, {withCredentials: true});
            // 응답 처리
      if (response.data.status === 200) {
      } else{
        return 0;
        // ... (에러 처리)
      }
    } catch (error) {
      alert("저장 오류");
      return 0;
      // ... (요청 실패 처리)
    }
  };
  useEffect(()=>{
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
        console.log(response.data.memberInfo);
      }
    }
    loadMyData();

  })
  console.log(interest);
  return (
    <div>
      <link href='https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css' rel='stylesheet'></link>
      <div className="login">
        <div className="login__content">
          <div className="login__forms">
            <form action="" className="login__register" id="login-up">
              <ul className='list'>
                <li className='list__box'>
                  <p className='list__font'>내 프로필</p>
                </li>
                <hr/>
                <li className='list__box'>
                  <p className='list__font'>자기 소개</p>
                </li>
                <hr/>
                <li className='list__box'>
                  <p className='list__font'>수상 이력</p>
                </li>
                <hr/>
              </ul>
              <div className='profile__box'>
                <img className='profile' src={photo} alt='profile'/>
              </div>
              <div className="login__inbox1">
                <p className='login__p'>닉네임</p>
                <hr/>
            <input type="text" id="nickname" className="login__input" value={nickname}/>
                </div>
              <div className="login__box">
          </div>
          <div className="login__box">
            <div className="login__inbox">
            <p className='login__p'>이름</p>
            <hr/>
            <input type="text" id="name" className="login__input" value={name}/>
            </div>
            </div>
          <div className="login__box">
            <div className='login__inbox'>
            <p className='login__p'>기수</p>
            <hr/>
            <input type="text" id="joinyear" className="login__input" value={joinyear}/>
            </div>
          </div>
          <div className="login__box">
            <div className="login__inbox">
            <p className='login__p'>학번</p>
            <hr/>
            <input type="text" id="stunum" className="login__input" value={stunum}/>
            </div>
          </div>
          <div className="login__box">
            <div className='login__inbox2'>
            <p className='login__p'>관심사항</p>
            <hr/>
            <input type="text" id="interest" className="login__input1" value={interest}/>
            </div>
          </div>
          <div className="login__box">
            <div className="login__inbox">
              <p className='login__p'>이메일</p>
              <hr/>
            <input type="text" inputMode="email" className="login__input" value={email}/>
            </div>
          </div>
          <div className="login__box">
            <div className="login__inbox">
              <p className='login__p'>거주지</p>
              <hr/>
            <input type="text" id="address" className="login__input" value={address}/>
            </div>
          </div>
              <a className="login__button" onClick={handleSave}>저장</a>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TestPage;
