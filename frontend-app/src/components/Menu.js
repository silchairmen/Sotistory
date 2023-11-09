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
import { useDispatch, useSelector } from 'react-redux';
import storageSession from 'redux-persist/lib/storage/session'
import { useCookies } from 'react-cookie';
const pages = ['FreeBoard', 'History','Notice'];


function MenuExampleSizeLarge() {
  const dispatch = useDispatch();
  //login 여부 확인
  const sessionCheck=useSelector(state=> state.session.session);
  const [nickname,setNickname] = useState("");
  const [auth, setAuth] = useState(false);
  const [anchorElUser, setAnchorElUser] =useState(null);

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
    async function session(){
      const response = await axios.get('http://localhost:80/api/auth/validate', {withCredentials: true});
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
        const response = await axios.get('http://localhost:80/api/auth/validate', {withCredentials: true});
        if(response.data.status === 200){
          setNickname(response.data.message);
        }else{
          setAuth(false);
        }
    }
    findNickname();
    console.log(nickname);
  },[]);
  useEffect(()=>{
    setAuth(sessionCheck);
  },[sessionCheck])

  // anchorElNav 변수를 초기화
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [cookies, , removeCookie] = useCookies(['JSESSIONID']);

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
    await axios.get('http://localhost:80/api/auth/logout', {withCredentials: true});
    window.location.reload();
  };

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
            Notice
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
            FreeBoard
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
    className='anker'
    aria-controls="menu-board"
    aria-haspopup="true"
    onMouseEnter={handleOpenNavMenu}
    sx={{
      color: 'white',
      display: 'block',
      fontFamily: 'Helvetica Neue, sans-serif',
    }}
  >
    Board
  </Button>
  <Menu
    id="menu-board"
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
      color: 'white',
    }}
  >
    <MenuItem className='anker' component="a" href="/Notice" onClick={handleCloseNavMenu}>
      <Button
        sx={{
          color: 'black',
          display: 'block',
          fontFamily: 'Helvetica Neue, sans-serif',
          width: '100%',
          textAlign: 'left',
        }}
      >
        Notice
      </Button>
    </MenuItem>
    <MenuItem className='anker' component="a" href="/Freeboard" onClick={handleCloseNavMenu}>
      <Button
        sx={{
          color: 'black',
          display: 'block',
          fontFamily: 'Helvetica Neue, sans-serif',
          width: '100%',
          textAlign: 'left',
        }}
      >
        Freeboard
      </Button>
    </MenuItem>
  </Menu>
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
          <Tooltip>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src={photo}   sx={{
                  border: '2px solid',
                  borderColor: 'white'
                  // 다른 스타일 속성들을 추가로 지정할 수 있습니다.
                }}/>
                <p className='nick'>{nickname}</p>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={handleCloseUserMenu}>
                  <Typography 
                    textAlign="center" 
                    href={`/MyPage`}
                  >
                    MyPage
                  </Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center" onClick={handleLogOut}>Logout</Typography>
                </MenuItem>
            </Menu>
          </Box>

          <Box sx={{ display: { xs: 'flex', md: 'none', flexGrow: 1 }, justifyContent: 'flex-end'}}>
          <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src={photo} sx={{
                  border: '2px solid',
                  borderColor: 'white'
                  // 다른 스타일 속성들을 추가로 지정할 수 있습니다.
                }} />
                  <p className='nick2'>{nickname}</p>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center" component="a" href={`/MyPage`} style={{ textDecoration: 'none', color:'black' }}>MyPage</Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center" onClick={handleLogOut}>Logout</Typography>
                </MenuItem>
            </Menu>
          </Box>
          </>
          ) : (
            <>          
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <Button
                className='anker'
                onClick={handleCloseNavMenu}
                sx={{ color: 'white', display: 'block', fontFamily: 'Helvetica Neue, sans-serif' }}
                href={`/SignIn`}
              >
                SignIn
              </Button>
              <Button
                className='anker'
                onClick={handleCloseNavMenu}
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
