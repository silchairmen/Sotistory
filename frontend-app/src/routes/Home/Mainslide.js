import Carousel from 'react-material-ui-carousel';
import { Paper } from '@mui/material';
import back1 from '../../img/back1.jpg';
import back2 from '../../img/back2.jpg';
import back3 from '../../img/back3.jpg';
import back4 from '../../img/back4.jpg';
import styled from 'styled-components';

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
  return (
    <Carouselstyle>
      <Carousel className="carousel-container" interval={2000} zIndex={1} autoPlay>
        {itemq.map((item, index) => (
          <Item key={index} item={item} />
        ))}
      </Carousel>
    </Carouselstyle>
  );
};

const Item = ({ item }) => {
  return (
    <Paper>
      <div className="main_image">
        <img src={item.image} alt={item.name} />
      </div>
    </Paper>
  );
};

export default Mainslide;