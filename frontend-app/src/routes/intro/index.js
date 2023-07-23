import gsap from 'gsap';
import './intro.css';
import Home from '../Home/Home';
import { useState ,useEffect} from 'react';

const Index = () => {
  const introTl = gsap.timeline();
  const [isIntroVisible, setIsIntroVisible] = useState(true);
  useEffect(() => {
    function init() {
      introTl.to('.loader__text span', { autoAlpha: 1 });
      introTl.from('.loader__text span', {
        yPercent: 150,
        stagger: 0.125,
        duration: 0.325,
        ease: 'Power3.inOut'
      });
      introTl.to('.loader__text span', {
        yPercent: 150,
        stagger: 0.125,
        duration: 0.325,
        ease: 'Power3.inOut'
      }, '+=.9');
      introTl.to('.loader__slice', {
        yPercent: 100,
        stagger: 0.125,
        duration: 0.6,
        ease: 'Power3.inOut'
      }, '<.125');
      introTl.from('.hero__title span', {
        yPercent: -100,
        duration: 0.6,
        ease: 'Power3.inOut'
      }, '<.4.5');
    }

    init();
    
    const erase = setTimeout(() => {
      hideLoader();
    }, 2000);
    const timer = setTimeout(() => {
      handleButtonClick();
    }, 4000);

    return () => (clearTimeout(timer),clearTimeout(erase));
  }, []);

  const handleButtonClick = () => {
    setIsIntroVisible(false);
  };

  const hideLoader = () => {
    let loaderTexts = document.getElementsByClassName('loader__text');
  
    for (let i = 0; i < loaderTexts.length; i++) {
      loaderTexts[i].textContent = '';
    }
  };
  

  return (
    <div>
      {isIntroVisible ? (
        <section id='loader' className="loader">
          <span className="loader__text"><span>우석대학교</span></span>
          <span className="loader__text"><span>정보보안학과</span></span>
          <span className="loader__text"><span>동아리</span></span>
          <div className="loader__slice"></div>
          <div className="loader__slice"></div>
          <div className="loader__slice"></div>
        </section>
      ) : (
        <Home />
      )}
      {isIntroVisible ? (
        <section className="hero">
          <h1 className="hero__title"><span>Welcome, SOTI</span></h1>
        </section>
      ) : null}
    </div>
  );
};

export default Index;