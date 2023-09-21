import * as React from 'react';
import { useEffect,useState} from 'react';
import styled from 'styled-components';
import '../css/commen.css';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import data from './AppData.json'
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
				const currentZIndex = parseInt(item.style.getPropertyValue('--zIndex')); // 현재 클릭된 아이템의 z-index
		  
				if (currentZIndex === itemsData.length) {
				  // 클릭된 아이템이 현재 progress 값을 가진 아이템일 경우
				  // 클릭 이벤트 처리를 수행
				  // 이 부분에 클릭 이벤트 처리 코드 추가
				  console.log(`클릭 이벤트 처리 - 인덱스: ${currentIndex}`);
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
	<div id="modal-container">
  <div class="modal-background">
    <div class="modal">
      <h2>I'm a Modal</h2>
      <p>Hear me roar.</p>
    </div>
  </div>
</div>
    <div className="carousel">
	<div className='timeline'>
	{currentGeneration > 1 && (<PlayArrowIcon className="previous-button" onClick={goToPreviousGeneration}></PlayArrowIcon>)}
            <p className="current-generation"> {currentGeneration}기</p>
	{currentGeneration < totalGenerations && (<PlayArrowIcon className="next-button" onClick={goToNextGeneration}></PlayArrowIcon>)}
	</div>
	{generationInfo
  .filter((image) => image.num === currentGeneration)
  .map((image, index) => (
    <div key={index} className="carousel-item">
      <div className="carousel-box">
        <div className="title">{image.title}</div>
        <div className="num">{image.num}</div>
        <img src={image.img} alt="" />
      </div>
    </div>
  ))
}
	</div>
     </Body>
    );
};

export default History;