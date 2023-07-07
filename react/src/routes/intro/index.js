import gsap from 'gsap';
import './intro.css';
import Home from '../../Home/Home';
import { useState } from 'react';

const Index = () => {
  const introTl = gsap.timeline();

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

  window.addEventListener('load', function () {
    init();
  });

  const [isIntroVisible, setIsIntroVisible] = useState(true);

  const handleButtonClick = () => {
    setIsIntroVisible(false);
    hideLoader();
  };

  const hideLoader = () => {
    let loader = document.getElementById('loader');
    if (loader) {
      loader.style.display = 'none';
    }
  };

  setTimeout(handleButtonClick, 4000);

  return (
    <body>
      {isIntroVisible ? (
        <section id='loader' className="loader">
          <span className="loader__text"><span>Developer,</span></span>
          <span className="loader__text"><span>designer</span></span>
          <span className="loader__text"><span>& runner.</span></span>
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
    </body>
  );
};

export default Index;

