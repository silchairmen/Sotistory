import * as React from 'react';
import { useEffect,useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import '../css/commena.css';
import logo from '../img/logo.png';
import photo from '../img/myphoto.jpg';
import axios from 'axios';
import { useSelector } from 'react-redux';


import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';

const pages = ['FreeBoard', 'History'];


function MenuExampleSizeLarge() {
  //login 여부 확인
  const [nickname,setNickname] = useState("");
  const [auth, setAuth] = useState(false);
  const [anchorElUser, setAnchorElUser] =useState(null);

  const sessionCheck=useSelector((state)=> state.session.session);
  const [isBoardMenuOpen, setIsBoardMenuOpen] = useState(false);
 
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);

const toggleCategoryMenu = () => {
  setIsCategoryMenuOpen(!isCategoryMenuOpen);
};

  const handleBoardMenuItemClick = (event) => {
    // Handle the click on "Board" menu item
    event.preventDefault(); // Prevent navigation
    setIsBoardMenuOpen(!isBoardMenuOpen); // Toggle the "Board" sub-menu
  };

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
      try{
        const response = await axios.get('http://localhost:80/api/member/validate', {withCredentials: true});
        if(response.data.status === 200){
          setNickname(response.data.message);
        }
      }catch{
        //alert("error");
      }
    }
    
    findNickname();
  }, []);

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
  

  const handleLogOut =() =>{
    setAuth(false);
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
        size="large"
        aria-label="Menu Button"
        aria-controls="menu-board"
        aria-haspopup="true"
        onClick={handleOpenNavMenu}
        sx={{
          color: 'white',
        }}
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id="menu-board"
        anchorEl={anchorElNav}
        anchorOrigin={{
          vertical:40 // 상단에서 열도록 수
        }}
        keepMounted
        open={Boolean(anchorElNav)}
        onClose={handleCloseNavMenu}
        sx={{
          color: 'white',
        }}
      >
        <MenuItem className='anker'>
          <Button
            sx={{
              color: 'black',
              display: 'block',
              fontFamily: 'Helvetica Neue, sans-serif',
              width: '100%',
              textAlign: 'left',
              zIndex:1
            }}
          >
            Category 1
          </Button>
        </MenuItem>
        <MenuItem className='anker'>
          <Button
            sx={{
              color: 'black',
              display: 'block',
              fontFamily: 'Helvetica Neue, sans-serif',
              width: '100%',
              textAlign: 'left',
              zIndex:1
            }}
          >
            Category 2
          </Button>
        </MenuItem>
        <MenuItem className='anker'>
          <Button
            sx={{
              color: 'black',
              display: 'block',
              fontFamily: 'Helvetica Neue, sans-serif',
              width: '100%',
              textAlign: 'left',
            }}
          >
            Category 3
          </Button>
        </MenuItem>
        <MenuItem className='anker' component="a" href="/History" onClick={handleCloseNavMenu}>
          <Button
            sx={{
              color: 'black',
              display: 'block',
              fontFamily: 'Helvetica Neue, sans-serif',
              width: '100%',
              textAlign: 'left',
            }}
          >
            History
          </Button>
        </MenuItem>
      </Menu>
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
          Dashboard
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
                    <a className="aconfig" href="">
                    <MenuItem onClick={handleClose} >Profile</MenuItem>
                    </a>
                    <a className="aconfig"href="">
                    <MenuItem onClick={handleClose}>My account</MenuItem>
                    </a>
                    <a className="aconfig" href="">
                    <MenuItem onClick={handleClose}>Logout</MenuItem>
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

          {/*오른쪽 상단 부분*/}
          {auth ? (
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
          </Box>

          <Box sx={{ display: { xs: 'flex', md: 'none', flexGrow: 1 }, justifyContent: 'flex-end'}}>
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
          </Box>
          </>)
            }
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default MenuExampleSizeLarge;
