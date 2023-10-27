/* eslint-disable no-undef */
import React from "react";
import "../../css/style.css";
import Logo from "../../img/logo.png";
import Fade from "react-reveal/Fade"


const timelineData = [
  {
    text: 'SOTI 창설',
    date: '2023-04-18',
    category: {
    tag: 'birthday!',
    color: 'black'
    },
  },
  {
  text: 'SOTI WEB HACKING CHALLANGE 1th Start',
  date: '2023-05-18',
  category: {
  tag: 'CLUB FINALTEST',
  color: '#e17b77'
    },
  },
{
  text: 'Join 2023 CODEGATE as "삼례를 아시나요"',
  date: '2023-06-18',
  category: {
  tag: 'CODEGATE',
  color: '#1DA1F2'
  },
},
{
  text:'SOTI Start Web, System hacking education',
  date: '2023-07-10',
  category: {
  tag: 'Education',
  color: '#018f69'
  }
  },
  {
  text: 'SOTI join the wori bank web hacking challange as team Sotistory',
  date: '2023-08-07',
  category: {
  tag: 'Penetration test',
  color: 'orange'
  },
  },
  {
    text: 'SOTI won the wori bank web hacking challange Encouragement Award',
    date: '2023-09-14',
    category: {
    tag: 'Award',
    color: 'black'
    },
    }
] 

const TimelineItem = ({ data}) => (
  <Fade bottom >
  <div className="timeline-item">
  <div className="timeline-item-content">
  <span className="tag" style={{ background: data.category.color }}>
  {data.category.tag}
  </span>
  <time>{data.date}</time>
  <p>{data.text}</p>
    <span className="circle" />
  </div>
</div>
  </Fade> );

const Timeline = () => {

  return (
  <div >
  <div className="timeline-container">
  {timelineData.map((data, idx) => (
  <TimelineItem data={data} key={idx} />
  ))}
  </div>
  </div>
);
} 

export const Info = () => {
  return (
<div className="main-div">
  <div className="div-1" >
  <Fade bottom >
  <img className="kakaotalk" alt="SotiLogo" src={Logo} />
  </Fade>
  <div className="security-over" >
  <Fade bottom >
  <h3><span>S</span>ecurity</h3>
  <h3><span>O</span>f</h3>
  <h3><span>T</span>echnology</h3>
  <h3><span>I</span>nformation</h3>
  </Fade>
  </div>
  <Timeline />
  </div>
</div>
);
}; 
export default Info;