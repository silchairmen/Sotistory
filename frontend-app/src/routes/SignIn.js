import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios'
import Alert from '@mui/material/Alert'
import { useEffect } from 'react';
import styled from 'styled-components';

const StyledSignUpWrapper = styled('div')({
  marginTop: '57px',
});
function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignIn() {
  const [showSuccessAlert, setShowSuccessAlert] = React.useState("");
  useEffect(()=>{
    const navbar = document.querySelector('#navbar');
    if (navbar) {
      navbar.classList.add('bg-gogo');
    }
  })
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      !email ||
      !password
    ) {
      setShowSuccessAlert('error');
      return;
    }
  
    // 정규식 체크
    if (
      emailError ||
      passwordError
    ) {
      setShowSuccessAlert('error');
      return;
    }
    try{
      const data = new FormData(event.currentTarget);
      const response = await axios.post('/api/auth/login', data, {withCredentials: true});
            // 응답 처리
      if (response.data.status === 200) {
        setSendData(response.data.message);
        setShowSuccessAlert('success');
        setTimeout(() => {
          window.location.replace('/');
        }, 1000);
      } else if(response.data.status === 203){
        setSendData(response.data.message);
        setShowSuccessAlert('error');
        return 0;
        // ... (에러 처리)
      }
    } catch (error) {
      setShowSuccessAlert('error');
      return 0;
      // ... (요청 실패 처리)
    }
    }


  const regEmail =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;   //정규식 검사 숫자,영문 소,대문자 특문 -,_,. 사용가능 이후는 기본 이메일과 동일
  const regPassword = /^[0-9a-zA-Z!@#$%^&*.]{8,}$/; // 특수문자, 영문 대소문자, 숫자 사용가능 최소 8자리 이상

  const [email, setEmail] = React.useState('');
  const [emailError, setEmailError] = React.useState(false);

  const [password, setPassword] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);

  const [senddata,setSendData]= React.useState("");
  
  const handleEmailChange = React.useMemo(() => (e) => {
    setEmail(e.target.value);
    setEmailError(!regEmail.test(e.target.value));
  }, [setEmail, setEmailError, regEmail]);

  const handlePasswordChange = React.useMemo(() => (e) => {
    setPassword(e.target.value);
    setPasswordError(!regPassword.test(e.target.value));
  }, [setPassword, setPasswordError, regPassword]);

  return (
    <ThemeProvider theme={defaultTheme}>
      <StyledSignUpWrapper>
      {/* 성공 알림 표시 */}
      {showSuccessAlert === "success" && (
          <Alert severity="success" sx={{ mt: 2 }}>
            {senddata}
          </Alert>
      )}
      {showSuccessAlert === "error" && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {senddata}
          </Alert>
      )}
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              required
              fullWidth
              name="email"
              label="이메일 주소"
              id="email"
              autoComplete="email"
              value={email}
              onChange={handleEmailChange}
              error={emailError}
              helperText={emailError ? '올바른 이메일 형식이 아닙니다.' : ''}
            />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="비밀번호"
                type="password"
                id="password"
                onChange={handlePasswordChange}
                value={password}
                error={passwordError}
                helperText={
                passwordError
                  ? '특수문자, 영문 대소문자, 숫자만 사용 가능합니다.'
                  : ''
              }
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/SignUp" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
      </StyledSignUpWrapper> 
    </ThemeProvider>
  );
}