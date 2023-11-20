import * as React from 'react';
import { useEffect,useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import '../css/commena.css';
import logo from '../img/logo.png';
import axios from 'axios';
import { useSelector,useDispatch } from 'react-redux';

//const response = await axios.get('api/member/profile', {withCredentials: true});

import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuList from '@mui/material/MenuList';

const pages = ['FreeBoard', 'History'];


function MenuExampleSizeLarge() {
  const dispatch = useDispatch();
  //login 여부 확인
  const sessionCheck=useSelector(state=> state.session.session);
  const [nickname,setNickname] = useState("");
  const [auth, setAuth] = useState(false);
  const [anchorElUser, setAnchorElUser] =useState(null);
  const [loading, setLoading] = useState(true);
  const [isBoardMenuOpen, setIsBoardMenuOpen] = useState(false);
  

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 900);
  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth <= 900);
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);




  useEffect(() => {
    async function session(){
      const response = await axios.get('/api/auth/validate', {withCredentials: true});
      if(response.data.status === 200){
        dispatch({type:"LOGIN_SUCCESS"});
      }else{
        dispatch({type:"LOGIN_FAILED"});
      }
    }
    session();
    setAuth(sessionCheck);
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

    async function findNickname(){
        const response = await axios.get('/api/auth/validate', {withCredentials: true});
        if(response.data.status === 200){
          setNickname(response.data.message);
          setLoading(false);
        }else{
          setAuth(false);
          setLoading(false);
        }
    }
    findNickname();
    
  },[]);
  // anchorElNav 변수를 초기화
  const [anchorElNav, setAnchorElNav] = useState(null);


// handleOpenNavMenu 함수 정의
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
// handleCloseNavMenu 함수 정의
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
    setIsBoardMenuOpen(false);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleLogOut =async() =>{
    setAuth(false);
    await axios.get('/api/auth/logout', {withCredentials: true});
    window.location.reload();
  };



  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <AppBar id="navbar" position="fixed" color='transparent'elevation={0}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
        <img src={logo}  href="/" width="45px" alt="SOTI" style={{display: { xs: 'none', md: 'flex' }, mr: 1 }} />
        <Typography
            className='anker'
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontWeight: 700,
              fontFamily: 'Helvetica Neue, sans-serif',
              letterSpacing: '.3rem',
              color: 'white',
              textDecoration: 'none',
            }}
          >
            SOTI
          </Typography>

          <Typography
            className='anker'
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              fontWeight: 700,
              fontFamily: 'Helvetica Neue, sans-serif',
              letterSpacing: '.3rem',
              color: 'white',
              textDecoration: 'none',
            }}
          >
            SOTI
          </Typography>
          {isMobile ?  (
    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
      <IconButton
        ref={anchorRef}
        id="composition-button"
        aria-controls={open ? 'composition-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        sx={{
          color: 'white',
          display: 'block',
          fontFamily: 'Helvetica Neue, sans-serif',
        }}
        onClick={handleToggle}
      >
        <MenuIcon />
      </IconButton>
      <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          placement="bottom-start"
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === 'bottom-start' ? 'left top' : 'left bottom',
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    id="composition-menu"
                    aria-labelledby="composition-button"
                    onKeyDown={handleListKeyDown}
                  >
                    <a className="aconfig" href="/Question">
                    <MenuItem onClick={handleClose} >Question</MenuItem>
                    </a>
                    <a className="aconfig"href="/Post">
                    <MenuItem onClick={handleClose}>Post</MenuItem>
                    </a>                
                    <a className="aconfig" href="/History">
                    <MenuItem onClick={handleClose}>history</MenuItem>
                    </a>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
    </Box>
  )
:
          (<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          <Button
          ref={anchorRef}
          id="composition-button"
          aria-controls={open ? 'composition-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true"
          sx={{
            color: 'white',
            display: 'block',
            fontFamily: 'Helvetica Neue, sans-serif',
          }}
          onClick={handleToggle}
        >
          Board
        </Button>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          placement="bottom-start"
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === 'bottom-start' ? 'left top' : 'left bottom',
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    id="composition-menu"
                    aria-labelledby="composition-button"
                    onKeyDown={handleListKeyDown}
                  >
                    <a className="aconfig" href="/Question">
                    <MenuItem onClick={handleClose} >Question</MenuItem>
                    </a>
                    <a className="aconfig"href="/Post">
                    <MenuItem onClick={handleClose}>Post</MenuItem>
                    </a>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
  <Button
    className='anker'
    onClick={handleCloseNavMenu}
    sx={{
      color: 'white',
      display: 'block',
      fontFamily: 'Helvetica Neue, sans-serif',
    }}
    href="/History"
  >
    History
  </Button>
          </Box>)}
          {/*
            세션 체크하는 부분 auth 안쓰고 session써도 돼서 수정했습니다.
            추가적으로 loading추가해서 버벅이면서 로딩되는건 개선했는데
            로딩속도가 느려서 추가적으로 수정해야돼여
            */}
            
          {/*오른쪽 상단 부분*/}
          {!loading&&sessionCheck ? (
            <>          
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <Button
                className='anker'
                sx={{ color: 'white', display: 'block', fontFamily: 'Helvetica Neue, sans-serif' }}
                href={`/Mypage`}
              >
                Mypage
              </Button>
              <Button
                className='anker'
                onClick={handleLogOut}
                sx={{ color: 'white', display: 'block', fontFamily: 'Helvetica Neue, sans-serif' }}
              >
                Logout
              </Button>
          </Box>

          <Box sx={{ display: { xs: 'flex', md: 'none', flexGrow: 1 }, justifyContent: 'flex-end'}}>
            <Button
              className='anker'
              variant="contained"
              size="small"
              sx={{ margin: 1, bgcolor: 'transparent', color: 'white',  ':hover': {
                backgroundColor: 'transparent !important',
                boxShadow: 'none !important'
              },
              boxShadow: 'none' }}
              href={`/Mypage`}
            >
            Mypage
            </Button>
            <Button
              className='anker'
              variant="contained"
              size="small"
              onClick={() => handleLogOut}
              sx={{ margin: 1, bgcolor: 'transparent', color: 'white',  ':hover': {
                backgroundColor: 'transparent !important',
                boxShadow: 'none !important'
              },
              boxShadow: 'none' }}
            >
            Logout
            </Button>
          </Box>
          </>
          ) : (
            <>
            {!loading&&!sessionCheck?(
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <Button
                className='anker'
                sx={{ color: 'white', display: 'block', fontFamily: 'Helvetica Neue, sans-serif' }}
                href={`/SignIn`}
              >
                SignIn
              </Button>
              <Button
                className='anker'
                sx={{ color: 'white', display: 'block', fontFamily: 'Helvetica Neue, sans-serif' }}
                href={`/SignUp`}
              >
                SignUp
              </Button>
          </Box>):(null)}
          {!loading&&!sessionCheck?(<Box sx={{ display: { xs: 'flex', md: 'none', flexGrow: 1 }, justifyContent: 'flex-end'}}>
            <Button
              className='anker'
              variant="contained"
              size="small"
              onClick={() => console.log('onclick')}
              sx={{ margin: 1, bgcolor: 'transparent', color: 'white',  ':hover': {
                backgroundColor: 'transparent !important',
                boxShadow: 'none !important'
              },
              boxShadow: 'none' }}
              href={`/SignIn`}
            >
            SignIn
            </Button>
            <Button
              className='anker'
              variant="contained"
              size="small"
              onClick={() => console.log('onclick')}
              sx={{ margin: 1, bgcolor: 'transparent', color: 'white',  ':hover': {
                backgroundColor: 'transparent !important',
                boxShadow: 'none !important'
              },
              boxShadow: 'none' }}
              href={`/SignUp`}
            >
            SignUp
            </Button>
          </Box>):(null)}
          
          </>)
            }
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default MenuExampleSizeLarge;
