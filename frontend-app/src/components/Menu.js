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

import MenuItem from '@mui/material/MenuItem';

import '../css/commena.css';
import logo from '../img/logo.png';

const pages = ['FreeBoard', 'History'];
const login=['SignUp', 'SignIn']



function MenuExampleSizeLarge() {
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


  // anchorElNav 변수를 초기화
const [anchorElNav, setAnchorElNav] = useState(null);

// handleOpenNavMenu 함수 정의
const handleOpenNavMenu = (event) => {
  setAnchorElNav(event.currentTarget);
};

// handleCloseNavMenu 함수 정의
const handleCloseNavMenu = () => {
  setAnchorElNav(null);
};


  return (
    <AppBar id="navbar" position="fixed" color='transparent'elevation={0}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
       <img src={logo}  width="45px" alt="SOTI" style={{display: { xs: 'none', md: 'flex' }, mr: 1 }} />
        <Typography
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
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              sx={{
                color: 'white',
                '& svg': {
                  fill: 'white'  // 추가된 부분
                },
                ':hover': {
                  color: '#f300b4',
                  '& svg': {
                    fill: '#f300b4'  // 추가된 부분
                  }
                }
              }}
            >
              <MenuIcon />
            </IconButton>

            <Menu
              id="menu-appbar brand"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'flex', md: 'none' },
                color:'white'
              }}
            >
              {pages.map((page) => (
              <MenuItem key={page} component="a" onClick={() => {
                  alert(`로그인이 필요한 서비스 입니다.`);
                  handleCloseNavMenu();
                }}>
              <Typography textAlign="center">{page}</Typography>
              </MenuItem>
              ))}
            </Menu>
          </Box>
          
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => {
                  alert(`로그인이 필요한 서비스 입니다.`);
                  handleCloseNavMenu();
                }}
                sx={{ color: 'white', display: 'block' , fontFamily: 'Helvetica Neue, sans-serif'}}
              >
                {page}
              </Button>
            ))}
          </Box>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            {login.map((item) => (
              <Button
                key={item}
                onClick={handleCloseNavMenu}
                sx={{ color: 'white', display: 'block', fontFamily: 'Helvetica Neue, sans-serif' }}
                href={`/${item}`}
              >
                {item}
              </Button>
            ))}
          </Box>

          <Box sx={{ display: { xs: 'flex', md: 'none', flexGrow: 1 }, justifyContent: 'flex-end'}}>
            <Button
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
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default MenuExampleSizeLarge;