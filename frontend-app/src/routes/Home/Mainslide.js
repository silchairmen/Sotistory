import Carousel from 'react-material-ui-carousel';
import { Paper } from '@mui/material';
import back1 from '../../img/test1.jpg';
import back2 from '../../img/test2.jpg';
import back3 from '../../img/background3.jpg';
import back4 from '../../img/background4.jpg';
import styled from 'styled-components';
import {useEffect,useState} from 'react';
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
}];

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

  .carousel-container .CarouselButton {
    display: none;
  }

  .css-1m9128y {
    display: none;
  }
`;

const Mainslide = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, [])

  return (
    <Carouselstyle>
      <Carousel
        className="carousel-container"
        interval={4000}
        zIndex={1}
        autoPlay
        animation={mounted && 'fade'}
      >
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