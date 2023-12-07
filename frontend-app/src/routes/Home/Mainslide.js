import Carousel from 'react-material-ui-carousel';
import { Paper } from '@mui/material';
import back1 from '../../img/back1.jpg';
import back2 from '../../img/back2.jpg';
import back3 from '../../img/back3.jpg';
import back4 from '../../img/back4.jpg';
import mback1 from '../../img/mback1.jpg';
import mback2 from '../../img/mback2.jpg';
import mback3 from '../../img/mback3.jpg';
import mback4 from '../../img/mback4.jpg';
import styled from 'styled-components';
import '../../css/ImageComponent.scss'
import { useState } from 'react';

const itemq = [
  {
    image: back1,
  },
  {
    image: back2,
  },
  {
    image: back3,
  },
  {
    image: back4,
  },
];
const mitemq = [
  {
    image: mback1,
  },
  {
    image: mback2,
  },
  {
    image: mback3,
  },
  {
    image: mback4,
  },
];

const Carouselstyle = styled.div`
  .carousel-container {
    height: 100vh;
    position: relative;
    overflow: hidden;
  }

  .carousel-container .Paper {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    background-color: transparent;
    position: relative;
    transition: transform 0.5s ease-in-out;
  }



  .carousel-container .main_image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    filter: brightness(70%);
    position: absolute;
    top: 0;
    left: 0;
    transition: transform 0.5s ease-in-out;
    backface-visibility: hidden;
    z-index: 0;
  }

  .carousel-container .main_image_text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    z-index: 2;
    transition: opacity 0.5s ease-in-out;
  }

  .carousel-container .main_image_text2 {
    position: absolute;
    top: 60%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    transition: opacity 0.5s ease-in-out;
  }


  .carousel-container .CarouselButton {
    display: none;
  }

  .css-1m9128y {
    display: none;
  }
`;

const Mainslide = () => {
  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );

  return (
    <Carouselstyle>
      <Carousel
        className="carousel-container"
        interval={4000}
        zIndex={1}
        height={'100%'}
        autoPlay
      >
        {isMobile
          ? mitemq.map((item, index) => (
              <Item key={index} item={item} />
            ))
          : itemq.map((item, index) => (
              <Item key={index} item={item} />
            ))}
      </Carousel>
    </Carouselstyle>
  );
};

const Item = ({ item }) => {
  const [loading,setLoading] = useState(false)
 const showimagehandle= () =>{
    setLoading(true)
 }
  return (
    <Paper>
        <div className="main_image">
          <div className='main_image_loaded'>
          <img
            src={item.image}
            alt={item.name}
            onLoad={() =>showimagehandle()}
          />
          </div>
          <div className="loading" style={{ display: loading ? 'none' : 'block' }}>
            <svg width="300px" height="200px" viewBox="0 0 187.3 93.7" preserveAspectRatio="xMidYMid meet">
              <path id="infinity-outline" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" 
                    d="M93.9,46.4c9.3,9.5,13.8,17.9,23.5,17.9s17.5-7.8,17.5-17.5s-7.8-17.6-17.5-17.5c-9.7,0.1-13.3,7.2-22.1,17.1 				c-8.9,8.8-15.7,17.9-25.4,17.9s-17.5-7.8-17.5-17.5s7.8-17.5,17.5-17.5S86.2,38.6,93.9,46.4z" />
              <path id="infinity-bg" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" 
                    d="M93.9,46.4c9.3,9.5,13.8,17.9,23.5,17.9s17.5-7.8,17.5-17.5s-7.8-17.6-17.5-17.5c-9.7,0.1-13.3,7.2-22.1,17.1 				c-8.9,8.8-15.7,17.9-25.4,17.9s-17.5-7.8-17.5-17.5s7.8-17.5,17.5-17.5S86.2,38.6,93.9,46.4z" />
              </svg>
            </div>
        </div>
        
    </Paper>
  );
};

export default Mainslide;