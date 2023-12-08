import * as React from 'react';
import { useEffect,useState} from 'react';
import styled from 'styled-components';
import '../css/commen.css';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import axios, { all } from 'axios';



const Body = styled.div`
	overflow:hidden;
	font-family: 'Roboto', serif;
	background: linear-gradient(135deg, black, #220033);
	.modal-active {
		overflow: hidden;
	}`

const History = () => {
const [currentGeneration, setCurrentGeneration] = useState(1);
const [totalGenerations, setTotalGenerations] = useState(0); // 총 기수 개수
const [allMemberInfo , setAllMemberInfo] = useState([]);
//position에 따른 순서 배열 정의


const getImagePath = (imageName) => `../uploads/`+`${imageName}`;

const [clickedImage, setClickedImage] = useState(null);
const [modalClass, setModalClass] = useState('modal-window');

const [modalActive, setModalActive] = useState(false);
			
const handleButtonClick = (buttonId) => {
		setModalClass(buttonId);
		setModalActive(true);
	};

const handleModalClick = () => {
		setModalClass('modal-window');
		setModalActive(false);
	};

useEffect(() => {
		const fetchData = async () => {
		  try {
			const response = await axios.get('/api/member/all', { withCredentials: true });
			if (response.data.status === 200) {
			  setAllMemberInfo(response.data.allMemberInfo);
			  const maxJoinYear = Math.max(...response.data.allMemberInfo.map(member => parseInt(member.joinYear)));
			  setTotalGenerations(maxJoinYear);
			
				// imageCount를 업데이트합니다.
			}
		  } catch (error) {
			console.error('Error fetching data:', error);
		  }
		};
	
		fetchData();
	  }, []);

  useEffect(()=>{
		const navbar = document.querySelector('.footer');
		if (navbar) {
		  navbar.classList.add('bg-delete');
		}
		/* 
      프로 파일 로드 데이터 구조
    {
      "nickname": "MerryQ",
      "joinYear": "1",
      "awards": null,
      "githubAddr": null,
      "tistoryAddr": null,
      "dreamhackAddr": null,
      "skills": null,
      "profileImageName": null,
      "position": null
    }
      */

  },[]);

  const currentGenerationImages = allMemberInfo.filter((member) => parseInt(member.joinYear) === currentGeneration);
  const [imageCount, setImageCount] = useState(currentGenerationImages.length);

  const goToPreviousGeneration = () => {
    if (currentGeneration > 1) {
      setCurrentGeneration(currentGeneration - 1);
    }
  };

  // 다음 기수로 이동하는 함수
  const goToNextGeneration = () => {
    if (currentGeneration < totalGenerations) {
      setCurrentGeneration(currentGeneration + 1);
    }
  };



  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      .carousel-item {
        --items: ${(allMemberInfo.filter((member) => parseInt(member.joinYear) === currentGeneration)).length};
      }
    `;
    document.head.appendChild(style);
  }, [currentGeneration, allMemberInfo]);


  console.log(allMemberInfo);
	useEffect(() => {
		/*--------------------
		Vars
		--------------------*/
		let progress = 0;
		let startX = 0;
		let active = 0;
		let isDown = false;
	
		/*--------------------
		Contants
		--------------------*/
		const speedWheel = 0.02;
		const speedDrag = -0.1;
	
		  /*--------------------
		  Get Z
		  --------------------*/
		const getZindex = (array, index) => array.map((_, i) => (index === i ? array.length : array.length - Math.abs(index - i)));
	
		  /*--------------------
		  Items
		  --------------------*/
		const itemsData=document.querySelectorAll('.carousel-item');
		const cursorsData=document.querySelectorAll('.cursor');
	
		const displayItems=(item,index)=>{
			const zIndex=getZindex([...itemsData],active)[index];
			item.style.setProperty('--zIndex',zIndex);
			item.style.setProperty('--active',(index-active)/itemsData.length);
		  };
	
		  /*--
			Animate
		  --------------------*/
		  const animate=()=>{
			progress=Math.max(0,Math.min(progress,100));
			active=Math.floor(progress/100*(itemsData.length-1));
		  itemsData.forEach((item,index)=>displayItems(item,index));
		  };
		  
		   animate();

		
	
		   /*-- Click on Items --*/
		   itemsData.forEach((item, i) => {
			  item.addEventListener('click', () => {
				// 현재 progress 값에서만 클릭 이벤트 처리
				const currentIndex = i; // 현재 클릭된 아이템의 인덱스
				const isActiveItem =item.style.getPropertyValue('--active') === '0';
		  
				if (isActiveItem) {
				  // 클릭된 아이템이 현재 progress 값을 가진 아이템일 경우
				  // 클릭 이벤트 처리를 수행
				  // 이 부분에 클릭 이벤트 처리 코드 추가
				  const clickedImageInfo = allMemberInfo.filter((member) => parseInt(member.joinYear) === currentGeneration)[currentIndex];
				  setClickedImage(clickedImageInfo);
				  console.log(clickedImageInfo);
				  handleButtonClick('target');
				}
			  });
		  });
		  
		   /*-- Handlers --*/
	
		   const handleWheel=(e)=>{
			 const wheelProgress=e.deltaY*speedWheel;
			 progress+=wheelProgress;
			 animate();
		   };


	
		  
	
		  
	
		   /*-- Listeners --*/
	
		document.addEventListener('mousewheel',handleWheel);
		
		return () => {
		   document.removeEventListener('mousewheel', handleWheel);

		};
	 }, [currentGeneration, allMemberInfo]);


	 useEffect(() => {
		const buttons = document.querySelectorAll(".card-buttons button");
		const sections = document.querySelectorAll(".card-section");
		const card = document.querySelector(".card");
	
		const handleCardSection = (e) => {
		  const targetSection = e.target.getAttribute("data-section");
		  const section = document.querySelector(targetSection);
		  targetSection !== "#about"
			? card.classList.add("is-active")
			: card.classList.remove("is-active");
		  card.setAttribute("data-state", targetSection);
		  sections.forEach((s) => s.classList.remove("is-active"));
		  buttons.forEach((b) => b.classList.remove("is-active"));
		  e.target.classList.add("is-active");
		  section.classList.add("is-active");
		};
	
		buttons.forEach((btn) => {
		  btn.addEventListener("click", handleCardSection);
		});

		if (modalActive) {
		  buttons.forEach((btn) => {
			btn.addEventListener("click", handleCardSection);
		  });
		} else {
		  buttons.forEach((btn) => {
			btn.removeEventListener("click", handleCardSection);
		  });
		}
	
		return () => {
		  buttons.forEach((btn) => {
			btn.removeEventListener("click", handleCardSection);
		  });
		};
	  }, [modalActive]); // 이펙트 한 번만 실행

	  useEffect(() => {
		const handlestopWheel = (e) => {
		  if (modalActive) {
			e.preventDefault(); // 모달이 열려있을 때 wheel 이벤트를 중지
		  }
		};

		// 모달이 열릴 때 wheel 이벤트 리스너를 추가
		if (modalActive) {
		  document.addEventListener('wheel', handlestopWheel);
		} else {
		  // 모달이 닫혔을 때 wheel 이벤트 리스너를 제거
		  document.removeEventListener('wheel', handlestopWheel);
		}
	
		return () => {
		  // 컴포넌트가 언마운트될 때 이벤트 리스너를 제거
		  document.removeEventListener('wheel', handlestopWheel);
		};
	  }, [modalActive]); // modalActive 값이 변경될 때만 이펙트 실행


	  const closeModal = () => {
		setModalActive(false);
	  };
	
	  // 모달 외부를 클릭했을 때 모달을 닫는 이벤트 핸들러
	  const handleModalOverlayClick = (e) => {
		if (e) {
		  closeModal();
		}
	  };
	
	  // 모달 내부 요소를 클릭했을 때 이벤트 버블링을 막아 모달이 닫히지 않도록 처리
	  const handleModalContentClick = (e) => {
		e.stopPropagation();
	  };


    return (
    <Body>
	{modalActive && (
	<div className={modalClass} onClick={handleModalOverlayClick}>
	<div className="grid-7 element-animation" onClick={handleModalContentClick}>
    <div className="card color-card-2">
		<div className='card-header'>
		{clickedImage.profileImageName !== 'null' ? <img src={'images/'+ clickedImage.profileImageName} alt="profile-pic" className="profile"/> : <img alt="profile-pic" className="profile"/>}
	  <h1 className="title-2">{clickedImage.nickname}</h1>
      <p className="job-title">Woosuk University</p>
      <div className="desc top">
        <p>SOTI {clickedImage.joinYear}기</p>
      </div>
	  <div className="profile-card-social">
      <a href={clickedImage.dreamhackAddr} className="profile-card-social__item dreamhack" target="_blank" rel="noopener noreferrer">
        <span className="icon-font">
          <svg className="icon"><use xlinkHref="#icon-dreamhack"></use></svg>
        </span>
      </a>

      <a href={clickedImage.tistoryAddr} className="profile-card-social__item tistory" target="_blank" rel="noopener noreferrer">
        <span className="icon-font">
          <svg className="icon"><use xlinkHref="#icon-behance"></use></svg>
        </span>
      </a>
      <a href={clickedImage.githubAddr} className="profile-card-social__item github" target="_blank" rel="noopener noreferrer">
        <span className="icon-font">
          <svg className="icon"><use xlinkHref="#icon-github"></use></svg>
        </span>
      </a>
    </div>
	  </div>
	  <hr className="hr-2"/>
	  <div className='card-section is-active' id="about">
			<div className='skill-subtitle'>Skills</div>
				<div className="skills">
				{Array.isArray(clickedImage.skills) ? (
    clickedImage.skills.map((skill, index) => (
      <span key={index}>{skill}</span>
    ))
  ) : (
    clickedImage.skills.split(',').map((skill, index) => (
      <span key={index}>{skill.trim()}</span>
    ))
  )}
				</div>
	</div>

	<div className='card-section' id="history">
	  <div className='resume-subtitle'>History</div>
	  <div className='history'>
	  <ol className="dicey">
  {Array.isArray(clickedImage.awards) ? (
    clickedImage.awards.map((awards, index) => (
      <React.Fragment key={index}>
        {awards.split(',').map((award, subIndex) => (
          <li key={subIndex}>{award.trim()}</li>
        ))}
      </React.Fragment>
    ))
  ) : (
    <React.Fragment>
      {clickedImage.awards.split(',').map((award, index) => (
        <li key={index}>{award.trim()}</li>
      ))}
    </React.Fragment>
  )}
</ol>
	  </div>
	  </div>
	  <div className="card-buttons">
      	<button data-section="#about" className="is-active">Skill</button>
      	<button data-section="#history">History</button>
    </div>
	  </div>
		</div>
			</div>
      )}

    <div className="carousel">
	<div className='timeline'>
	{currentGeneration > 1 && (<PlayArrowIcon className="previous-button" onClick={goToPreviousGeneration}></PlayArrowIcon>)}
            <p className="current-generation"> {currentGeneration}기</p>{/* 현재 총 몇기인지에 대한 부분인데 
			1.데이터 반환시 기수에 있는 숫자를 판별하고 가장 높은수를 뽑아서 지정하려고 계획 중 */ }
	{currentGeneration < totalGenerations && (<PlayArrowIcon className="next-button" onClick={goToNextGeneration}></PlayArrowIcon>)}
	</div>
	{allMemberInfo
  .filter((member) => parseInt(member.joinYear) === currentGeneration)
  .map((member, index) => (
    <div key={index} className="carousel-item" >
      <div className="carousel-box">
        <div className="title">{member.nickname}</div>
        <div className="num">{member.joinYear}</div>
		{member.profileImageName !== 'null' ? <img src={'images/'+ member.profileImageName} /> : <img/>}
      </div>
    </div>
  ))
}
	</div>
	<svg hidden="hidden">
<defs>
  <symbol id="icon-github" viewBox="0 0 32 32">
	<title>github</title>
	<path d="M16.192 0.512c-8.832 0-16 7.168-16 16 0 7.072 4.576 13.056 10.944 15.168 0.8 0.16 1.088-0.352 1.088-0.768 0-0.384 0-1.632-0.032-2.976-4.448 0.96-5.376-1.888-5.376-1.888-0.736-1.856-1.792-2.336-1.792-2.336-1.44-0.992 0.096-0.96 0.096-0.96 1.6 0.128 2.464 1.664 2.464 1.664 1.44 2.432 3.744 1.728 4.672 1.344 0.128-1.024 0.544-1.728 1.024-2.144-3.552-0.448-7.296-1.824-7.296-7.936 0-1.76 0.64-3.168 1.664-4.288-0.16-0.416-0.704-2.016 0.16-4.224 0 0 1.344-0.416 4.416 1.632 1.28-0.352 2.656-0.544 4-0.544s2.72 0.192 4 0.544c3.040-2.080 4.384-1.632 4.384-1.632 0.864 2.208 0.32 3.84 0.16 4.224 1.024 1.12 1.632 2.56 1.632 4.288 0 6.144-3.744 7.488-7.296 7.904 0.576 0.512 1.088 1.472 1.088 2.976 0 2.144-0.032 3.872-0.032 4.384 0 0.416 0.288 0.928 1.088 0.768 6.368-2.112 10.944-8.128 10.944-15.168 0-8.896-7.168-16.032-16-16.032z"></path>
	<path d="M6.24 23.488c-0.032 0.064-0.16 0.096-0.288 0.064-0.128-0.064-0.192-0.16-0.128-0.256 0.032-0.096 0.16-0.096 0.288-0.064 0.128 0.064 0.192 0.16 0.128 0.256v0z"></path>
	<path d="M6.912 24.192c-0.064 0.064-0.224 0.032-0.32-0.064s-0.128-0.256-0.032-0.32c0.064-0.064 0.224-0.032 0.32 0.064s0.096 0.256 0.032 0.32v0z"></path>
	<path d="M7.52 25.12c-0.096 0.064-0.256 0-0.352-0.128s-0.096-0.32 0-0.384c0.096-0.064 0.256 0 0.352 0.128 0.128 0.128 0.128 0.32 0 0.384v0z"></path>
	<path d="M8.384 26.016c-0.096 0.096-0.288 0.064-0.416-0.064s-0.192-0.32-0.096-0.416c0.096-0.096 0.288-0.064 0.416 0.064 0.16 0.128 0.192 0.32 0.096 0.416v0z"></path>
	<path d="M9.6 26.528c-0.032 0.128-0.224 0.192-0.384 0.128-0.192-0.064-0.288-0.192-0.256-0.32s0.224-0.192 0.416-0.128c0.128 0.032 0.256 0.192 0.224 0.32v0z"></path>
	<path d="M10.912 26.624c0 0.128-0.16 0.256-0.352 0.256s-0.352-0.096-0.352-0.224c0-0.128 0.16-0.256 0.352-0.256 0.192-0.032 0.352 0.096 0.352 0.224v0z"></path>
	<path d="M12.128 26.4c0.032 0.128-0.096 0.256-0.288 0.288s-0.352-0.032-0.384-0.16c-0.032-0.128 0.096-0.256 0.288-0.288s0.352 0.032 0.384 0.16v0z"></path>
  </symbol>

  <symbol id="icon-dreamhack" viewBox="0 0 48 48">
	<title>dreamhack</title>
	<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none"><script xmlns=""/>
<g id="Group">
<g id="Group_2">
<path id="Vector" d="M23.0384 7.34726C17.444 1.75284 9.28399 -0.421377 1.64831 1.64831C-0.421377 9.28483 1.75284 17.444 7.34726 23.0384L7.39158 23.0827C15.0381 21.0105 21.0105 15.0373 23.0827 7.39158L23.0384 7.34726Z" fill="#8D98FF"/>
<g id="Group_3">
<path id="Vector_2" d="M23.0829 7.39158L16.8914 9.06908C13.0848 10.101 9.01736 9.01723 6.22851 6.22838L1.64844 1.64831C9.28495 -0.421377 17.445 1.75284 23.0394 7.34726L23.0829 7.39075V7.39158Z" fill="#7A8AFF"/>
<path id="Vector_3" d="M23.0818 7.39146C21.0096 15.038 15.0363 21.0104 7.39062 23.0826L9.08484 16.8309C10.1076 13.0561 13.0561 10.1084 16.8309 9.08484L23.0826 7.39062L23.0818 7.39146Z" fill="#607FFF"/>
<path id="Vector_4" d="M9.06908 16.8911L7.39158 23.0826L7.34726 23.0383C1.75284 17.4439 -0.421377 9.28387 1.64831 1.64819L6.22838 6.22826C9.01723 9.01711 10.101 13.0846 9.06908 16.8911Z" fill="#A6A8FF"/>
</g>
</g>
</g>
</svg>
  </symbol>

  <symbol id="icon-behance" viewBox="0 0 32 32">
  <title>Tistory</title>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 408.4 408.4"><g><circle className="cls-1" cx="58.18" cy="58.18" r="58.18"/><circle className="cls-1" cx="204.2" cy="58.18" r="58.18"/><circle className="cls-1" cx="204.2" cy="204.2" r="58.18"/><circle className="cls-1" cx="204.2" cy="350.22" r="58.18"/><circle className="cls-1" cx="350.22" cy="58.18" r="58.18"/></g></svg>
  </symbol>

</defs>
</svg>
    </Body>
	
    );
};

export default History;