import * as React from 'react';
import { useEffect,useState} from 'react';
import styled from 'styled-components';
import '../css/commen.css';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import data from './AppData.json'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
const Body = styled.div`
	overflow:hidden;
	font-family: 'Roboto', serif;
	background: linear-gradient(135deg, black, #220033);
	.modal-active {
		overflow: hidden;
	}
	
	
	`

const History = () => {
const [currentGeneration, setCurrentGeneration] = useState(1);
const [totalGenerations, setTotalGenerations] = useState(data.totalGenerations); // 총 기수 개수
const [generationInfo, setGenerationInfo] = useState(data.generationInfo);
const currentGenerationImages = generationInfo.filter((image) => image.num === currentGeneration);
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
	// currentGeneration에 따라 currentGenerationImages를 필터링하고 imageCount를 업데이트합니다.
	const currentGenerationImages = generationInfo.filter((image) => image.num === currentGeneration);
	const updatedImageCount = currentGenerationImages.length;
	// imageCount를 업데이트합니다.
	setImageCount(updatedImageCount);
  }, [currentGeneration, generationInfo]);

  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      .carousel-item {
        --items: ${generationInfo.filter((image) => image.num === currentGeneration).length};
      }
    `;
    document.head.appendChild(style);
  }, [currentGeneration, generationInfo]);

  useEffect(()=>{
		const navbar = document.querySelector('.footer');
		if (navbar) {
		  navbar.classList.add('bg-delete');
		}
  },[]);

	  
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
				  const clickedImageInfo = generationInfo.filter((image) => image.num === currentGeneration)[currentIndex];
				  setClickedImage(clickedImageInfo);
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
	
		   const handleMouseMove=(e)=>{
			 if(e.type==='mousemove'){
			   cursorsData.forEach(($cursor)=>{
				 $cursor.style.transform=`translate(${e.clientX}px,${e.clientY}px)`;
			   });
			 }
			 if(!isDown)return;
	
			const x=e.clientX||(e.touches&&e.touches[0].clientX)||0; 
			const mouseProgress=(x-startX)*speedDrag; 
			progress+=mouseProgress; 
			startX=x; 
			animate();  
		   };
	
		   const handleMouseDown=(e)=>{
			 isDown=true; 
			 startX=e.clientX||(e.touches&& e.touches[0].clientX)||0; 
		   };
	
		   const handleMouseUp=()=>{
			 isDown=false;  
		   };
	
		   /*-- Listeners --*/
	
		document.addEventListener('mousewheel',handleWheel);
		document.addEventListener('mousedown',handleMouseDown);
		document.addEventListener('mousemove',handleMouseMove);
		document.addEventListener('mouseup',handleMouseUp);
	
		return () => {
		   document.removeEventListener('mousewheel', handleWheel);
		   document.removeEventListener('mousedown', handleMouseDown);
		   document.removeEventListener('mousemove', handleMouseMove);
		   document.removeEventListener('mouseup', handleMouseUp);	
		};
	 }, [currentGeneration, generationInfo]);


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


    return (
    <Body>
	{modalActive && (
	<div className={modalClass}>
	<div className="grid-7 element-animation">
    <div className="card color-card-2">
		<div className='card-header'>
      <img src={clickedImage.img} alt="profile-pic" className="profile"/>
      <h1 className="title-2">{clickedImage.title}</h1>
      <p className="job-title">Woosuk University</p>
      <div className="desc top">
        <p>SOTI {clickedImage.num}기</p>
      </div>
	  <div className="profile-card-social">
      <a href="https://www.instagram.com/iamuhammederdem" className="profile-card-social__item instagram" target="_blank">
        <span className="icon-font">
          <svg className="icon"><use xlinkHref="#icon-instagram"></use></svg>
        </span>
      </a>

      <a href="https://www.behance.net/iaMuhammedErdem" className="profile-card-social__item behance" target="_blank">
        <span className="icon-font">
          <svg className="icon"><use xlinkHref="#icon-behance"></use></svg>
        </span>
      </a>
      <a href="https://github.com/muhammederdem" className="profile-card-social__item github" target="_blank">
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
		{/*{clickedImage.skills.map((skill, index) => (
                    <span key={index}>{skill}</span>
		))}*/}
					<span>HTML</span> <span>CSS</span> <span>Javascript</span>
				</div>
	</div>

	<div className='card-section' id="history">
	  <div className='resume-subtitle'>History</div>
	  <div className='history'>
	  <ol className="dicey">
		{/*{clickedImage.history.map((historys, index) => (
                    <li key={index}>{historys}</li>
		))}*/}
			<li>I rolled a one.</li>
			<li>I rolled a two.</li>
			<li>I rolled a three.</li>
			<li>I rolled a four.</li>
			<li>I rolled a five.</li>
			<li>I rolled a six.</li>
		</ol>
	  </div>
	  </div>
	  <div className="card-buttons">
      	<button data-section="#about" className="is-active">Skill</button>
      	<button data-section="#history">History</button>
    </div>
	  <Button className="modal-close" onClick={handleModalClick}>X</Button>
	  </div>
		</div>
			</div>
      )}
    <div className="carousel">
	<div className='timeline'>
	{currentGeneration > 1 && (<PlayArrowIcon className="previous-button" onClick={goToPreviousGeneration}></PlayArrowIcon>)}
            <p className="current-generation"> {currentGeneration}기</p>
	{currentGeneration < totalGenerations && (<PlayArrowIcon className="next-button" onClick={goToNextGeneration}></PlayArrowIcon>)}
	</div>
	{generationInfo
  .filter((image) => image.num === currentGeneration)
  .map((image, index) => (
    <div key={index} className="carousel-item" >
      <div className="carousel-box">
        <div className="title">{image.title}</div>
        <div className="num">{image.num}</div>
        <img src={image.img} alt=""/>
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

  <symbol id="icon-instagram" viewBox="0 0 32 32">
	<title>instagram</title>
	<path d="M16 2.881c4.275 0 4.781 0.019 6.462 0.094 1.563 0.069 2.406 0.331 2.969 0.55 0.744 0.288 1.281 0.638 1.837 1.194 0.563 0.563 0.906 1.094 1.2 1.838 0.219 0.563 0.481 1.412 0.55 2.969 0.075 1.688 0.094 2.194 0.094 6.463s-0.019 4.781-0.094 6.463c-0.069 1.563-0.331 2.406-0.55 2.969-0.288 0.744-0.637 1.281-1.194 1.837-0.563 0.563-1.094 0.906-1.837 1.2-0.563 0.219-1.413 0.481-2.969 0.55-1.688 0.075-2.194 0.094-6.463 0.094s-4.781-0.019-6.463-0.094c-1.563-0.069-2.406-0.331-2.969-0.55-0.744-0.288-1.281-0.637-1.838-1.194-0.563-0.563-0.906-1.094-1.2-1.837-0.219-0.563-0.481-1.413-0.55-2.969-0.075-1.688-0.094-2.194-0.094-6.463s0.019-4.781 0.094-6.463c0.069-1.563 0.331-2.406 0.55-2.969 0.288-0.744 0.638-1.281 1.194-1.838 0.563-0.563 1.094-0.906 1.838-1.2 0.563-0.219 1.412-0.481 2.969-0.55 1.681-0.075 2.188-0.094 6.463-0.094zM16 0c-4.344 0-4.887 0.019-6.594 0.094-1.7 0.075-2.869 0.35-3.881 0.744-1.056 0.412-1.95 0.956-2.837 1.85-0.894 0.888-1.438 1.781-1.85 2.831-0.394 1.019-0.669 2.181-0.744 3.881-0.075 1.713-0.094 2.256-0.094 6.6s0.019 4.887 0.094 6.594c0.075 1.7 0.35 2.869 0.744 3.881 0.413 1.056 0.956 1.95 1.85 2.837 0.887 0.887 1.781 1.438 2.831 1.844 1.019 0.394 2.181 0.669 3.881 0.744 1.706 0.075 2.25 0.094 6.594 0.094s4.888-0.019 6.594-0.094c1.7-0.075 2.869-0.35 3.881-0.744 1.050-0.406 1.944-0.956 2.831-1.844s1.438-1.781 1.844-2.831c0.394-1.019 0.669-2.181 0.744-3.881 0.075-1.706 0.094-2.25 0.094-6.594s-0.019-4.887-0.094-6.594c-0.075-1.7-0.35-2.869-0.744-3.881-0.394-1.063-0.938-1.956-1.831-2.844-0.887-0.887-1.781-1.438-2.831-1.844-1.019-0.394-2.181-0.669-3.881-0.744-1.712-0.081-2.256-0.1-6.6-0.1v0z"></path>
	<path d="M16 7.781c-4.537 0-8.219 3.681-8.219 8.219s3.681 8.219 8.219 8.219 8.219-3.681 8.219-8.219c0-4.537-3.681-8.219-8.219-8.219zM16 21.331c-2.944 0-5.331-2.387-5.331-5.331s2.387-5.331 5.331-5.331c2.944 0 5.331 2.387 5.331 5.331s-2.387 5.331-5.331 5.331z"></path>
	<path d="M26.462 7.456c0 1.060-0.859 1.919-1.919 1.919s-1.919-0.859-1.919-1.919c0-1.060 0.859-1.919 1.919-1.919s1.919 0.859 1.919 1.919z"></path>
  </symbol>

  <symbol id="icon-behance" viewBox="0 0 32 32">
  <title>Tistory</title>
  <circle cx="16" cy="16" r="16" fill="" />
  <path d="M13.7 9.8h1.9v10.4h-1.9V9.8zM11.9 12.4c-0.3 0-0.6-0.2-0.9-0.4-0.2-0.2-0.3-0.5-0.3-0.8 0-0.3 0.1-0.6 0.3-0.8s0.6-0.4 0.9-0.4c0.3 0 0.6 0.2 0.8 0.4 0.2 0.2 0.4 0.5 0.4 0.8 0 0.3-0.2 0.6-0.4 0.8s-0.5 0.4-0.8 0.4z"/>
  <path d="M19.2 12.4c-0.3 0-0.6-0.2-0.8-0.4-0.2-0.2-0.4-0.5-0.4-0.8 0-0.3 0.2-0.6 0.4-0.8s0.5-0.4 0.8-0.4c0.3 0 0.6 0.2 0.9 0.4 0.2 0.2 0.3 0.5 0.3 0.8 0 0.3-0.1 0.6-0.3 0.8s-0.6 0.4-0.9 0.4z"/>
  <path d="M11.9 17.6c-0.2 0-0.3 0-0.5-0.1-0.2-0.1-0.4-0.2-0.5-0.3-0.2-0.1-0.3-0.3-0.4-0.5-0.1-0.2-0.1-0.4-0.1-0.6 0-0.2 0-0.3 0.1-0.5 0.1-0.2 0.2-0.4 0.3-0.5s0.3-0.3 0.5-0.4c0.2-0.1 0.4-0.1 0.6-0.1 0.2 0 0.3 0 0.5 0.1 0.2 0.1 0.4 0.2 0.5 0.3 0.2 0.1 0.3 0.3 0.4 0.5s0.1 0.4 0.1 0.6c0 0.2 0 0.3-0.1 0.5s-0.2 0.4-0.3 0.5c-0.1 0.2-0.3 0.3-0.5 0.4s-0.4 0.1-0.6 0.1zM19.2 17.6c-0.2 0-0.4-0.1-0.6-0.1s-0.3-0.2-0.5-0.3c-0.2-0.1-0.3-0.3-0.4-0.5s-0.1-0.4-0.1-0.6c0-0.2 0-0.3 0.1-0.5s0.2-0.4 0.3-0.5c0.2-0.1 0.4-0.1 0.6-0.1s0.4 0.1 0.6 0.1 0.3 0.2 0.5 0.3c0.2 0.1 0.3 0.3 0.4 0.5s0.1 0.4 0.1 0.6c0 0.2 0 0.3-0.1 0.5s-0.2 0.4-0.3 0.5c-0.2 0.1-0.3 0.1-0.5 0.1z"/>

  </symbol>

</defs>
</svg>
     </Body>
	 
    );
};

export default History;
