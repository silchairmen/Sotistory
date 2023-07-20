import React, { useState,useEffect } from 'react';
import '../css/commena.css';

const Menu = (props) => {
  return (
    <div className={`menu-container ${props.showMenu}`}>
      <div className="overlay" />
      <div className="menu-items">
        <ul>
          <li>
            <a href="/" onClick={props.toggleMenu}>
              HOME
            </a>
          </li>
          <li>
            <a href="/Board" onClick={props.toggleMenu}>
              Board
            </a>
          </li>
          <li>
            <a href="/SignIn" onClick={props.toggleMenu}>
              SignIn
            </a>
          </li>
          <li>
            <a href="/SignUp" onClick={props.toggleMenu}>
              SignUp
            </a>
          </li>
          <li>
            <a href="/History" onClick={props.toggleMenu}>
              History
            </a>
          </li>
        </ul>
        <SocialLinks />
      </div>
    </div>
  );
};

const Nav = (props) => {
  return (
    <React.Fragment>
      <nav id="navbar">
        <div className="nav-wrapper">
          <p className="brand">
            SOTI
          </p>
          <a
            onClick={props.toggleMenu}
            className={props.showMenu === 'active' ? 'menu-button active' : 'menu-button'}
          >
            <span />
          </a>
        </div>
      </nav>
    </React.Fragment>
  );
};

const SocialLinks = (props) => {
  return (
    <div className="social">
      <a
        href="https://twitter.com/yagoestevez"
        target="_blank"
        rel="noopener noreferrer"
        title="Link to author's Twitter profile"
      >
        {' '}
        <i className="fab fa-twitter" />
      </a>
      <a
        id="profile-link"
        href="https://github.com/yagoestevez"
        target="_blank"
        rel="noopener noreferrer"
        title="Link to author's GitHub Profile"
      >
        {' '}
        <i className="fab fa-github" />
      </a>
      <a
        href="https://codepen.io/yagoestevez"
        target="_blank"
        rel="noopener noreferrer"
        title="Link to author's Codepen Profile"
      >
        {' '}
        <i className="fab fa-codepen" />
      </a>
    </div>
  );
};

const MenuExampleSizeLarge = () => {
  const [menuState, setMenuState] = useState(false);

  const toggleMenu = () => {
    setMenuState(!menuState ? 'active' : menuState === 'deactive' ? 'active' : 'deactive');
  };
  //nav 바 스크롤 시 배경색 바뀌게 하기
  useEffect(() => {
    const navbar = document.querySelector('#navbar');
    const handleScroll = (e) => {
      const scrollPos = document.documentElement.scrollTop || document.body.scrollTop;
      if (scrollPos + 100 >= window.innerHeight) {
        navbar.classList.add('bg-active');
      } else {
        navbar.classList.remove('bg-active');
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <React.Fragment>
      <Menu toggleMenu={toggleMenu} showMenu={menuState} />
      <Nav toggleMenu={toggleMenu} showMenu={menuState} />
    </React.Fragment>
  );
};

export default MenuExampleSizeLarge;