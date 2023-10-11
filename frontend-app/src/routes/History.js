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

    return (
    <Body>
	{modalActive && (
	<div className={modalClass}>
	<div className="grid-7 element-animation">
    <div className="card color-card-2">
	<Button className="modal-close" onClick={handleModalClick} >Close</Button>
      <ul>
        <li><i className="fas fa-arrow-left i-l b"></i></li>
        <li><i className="fas fa-ellipsis-v i-r b"></i></li>
        <li><i className="far fa-heart i-r b"></i></li>
      </ul>
      <img src={clickedImage.img} alt="profile-pic" className="profile"/>
      <h1 className="title-2">{clickedImage.title}</h1>
      <p className="job-title"> Woosuk University</p>
      <div className="desc top">
        <p>Create usable interface and designs @GraphicSpark</p>
      </div>
      <button className="btn color-a top"> Hire me</button>
      <hr className="hr-2"/>
      <div className="container">
        <div className="content">
          <div className="grid-2">
            <button className="color-b circule"> <i className="fab fa-dribbble fa-2x"></i></button>
            <h2 className="title-2">12.3k</h2>
            <p className="followers">Followers</p>
          </div>
          <div className="grid-2">
            <button className="color-c circule"><i className="fab fa-behance fa-2x"></i></button>
            <h2 className="title-2">16k</h2>
            <p className="followers">Followers</p>
          </div>
          <div className="grid-2">
            <button className="color-d circule"><i className="fab fa-github-alt fa-2x"></i></button>
            <h2 className="title-2">17.8k</h2>
            <p className="followers">Followers</p>
          </div>
        </div>
    </div>
			
					{/*<div className='modalposition'>
						<Avatar	alt="Remy Sharp" src={clickedImage.img} sx={{ width: 180, height: 150 }}/>
						</div>
				<div className='contents'>
					<h2>이름: {clickedImage.title}</h2>
				</div>
				<div className='bottom'>
					<h1>이력사항</h1>			
	</div>*/}
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
     </Body>
    );
};

export default History;