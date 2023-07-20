import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import DaumPostcode from 'react-daum-postcode';
import Alert from '@mui/material/Alert';
import { useNavigate} from 'react-router-dom'
import axios from 'axios'

function Address({ onSelectAddress }) {
  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }
    onSelectAddress({
      address: fullAddress,
      zonecode: data.zonecode,
    });
  };

  return (
    <>
      <DaumPostcode onComplete={handleComplete} style={{ height: 700 }} />
    </>
  );
}

const defaultTheme = createTheme();

export default function SignUp() {
  const [showAddress, setShowAddress] = React.useState(false);
  const [selectedAddress, setSelectedAddress] = React.useState({
    address: '',
    zonecode: '',
  });
  const [checked, setChecked] = React.useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = React.useState("");
  const navigate = useNavigate();

  const handleSignUp = async (event) => {
    event.preventDefault();
  
    // 필수 입력 항목의 값이 비어있는지 확인
    if (
      !name ||
      !nickname ||
      !stuNum ||
      !joinYear ||
      !email ||
      !password
    ) {
      setShowSuccessAlert('error');
      return;
    }
  
    // 정규식 체크
    if (
      nameError ||
      nicknameError ||
      stuNumError ||
      joinYearError ||
      emailError ||
      passwordError
    ) {
      setShowSuccessAlert('error');
      return;
    }
  
    if (!checked) {
      alert('개인정보 제공 동의를 체크해주세요.');
      return;
    }
  
    try {
      // 회원가입 요청에 필요한 데이터 준비
      const formData = new FormData();
      formData.append('name', name);
      formData.append('nickname', nickname);
      formData.append('stuNum', stuNum);
      formData.append('joinYear', joinYear);
      formData.append('email', email);
      formData.append('password', password);
  
      // 회원가입 요청 보내기
      const response = await axios.post('http://192.168.0.12:8989/signUp', formData);
  
      // 응답 처리
      if (response.status === 200) {
        setShowSuccessAlert('success');
        // ... (성공 처리)
      } else {
        console.log(response.status);
        setShowSuccessAlert('error');
        return 0;
        // ... (에러 처리)
      }
    } catch (error) {
      console.log("오류");
      setShowSuccessAlert('error');
      return 0;
      // ... (요청 실패 처리)
    }

    // 3초 뒤에 /signin 페이지로 리다이렉트합니다.
    setTimeout(() => {
      navigate('/signin');
    }, 1000); // 3초 뒤에 /signin으로 이동
  };

  // 각 입력 필드에 대한 정규식 패턴 설정
  const regEmail =
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;   //정규식 검사 숫자,영문 소,대문자 특문 -,_,. 사용가능 이후는 기본 이메일과 동일
  const regName = /^[가-힣]+$/; // 한글만 사용가능
  const regNickname = /^[0-9a-zA-Z\u1100-\u11FF\u3130-\u318F\uAC00-\uD7AF\-_]+$/;
  const regStuNum = /^[0-9]+$/; // 숫자 사용가능
  const regJoinYear = /^[0-9]+$/; // 숫자 사용가능
  const regPassword = /^[0-9a-zA-Z!@#$%^&*]+$/; // 특수문자, 영문 대소문자, 숫자 사용가능

  // 각 입력 필드의 상태와 에러 메시지를 관리하는 state
  const [name, setName] = React.useState('');
  const [nameError, setNameError] = React.useState(false);

  const [nickname, setNickname] = React.useState('');
  const [nicknameError, setNicknameError] = React.useState(false);

  const [stuNum, setStuNum] = React.useState('');
  const [stuNumError, setStuNumError] = React.useState(false);

  const [joinYear, setJoinYear] = React.useState('');
  const [joinYearError, setJoinYearError] = React.useState(false);

  const [email, setEmail] = React.useState('');
  const [emailError, setEmailError] = React.useState(false);

  const [password, setPassword] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);

  // 입력 필드 값이 변경될 때마다 정규식 검사를 수행하고 에러 상태 업데이트
  const handleNameChange = (e) => {
    setName(e.target.value);
    setNameError(!regName.test(e.target.value));
  };

  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
    setNicknameError(!regNickname.test(e.target.value));
  };

  const handleStuNumChange = (e) => {
    setStuNum(e.target.value);
    setStuNumError(!regStuNum.test(e.target.value));
  };

  const handleJoinYearChange = (e) => {
    setJoinYear(e.target.value);
    setJoinYearError(!regJoinYear.test(e.target.value));
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError(!regEmail.test(e.target.value));
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordError(!regPassword.test(e.target.value));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    // 체크박스가 체크되지 않았으면 경고창 표시
    if (!checked) {
      alert('Please check the agreement.'); // 경고창 띄우기
      return; // 함수 실행 중단
    }

    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
                {/* 성공 알림 표시 */}
      {showSuccessAlert === "success" && (
        <Alert severity="success" sx={{ mt: 2 }}>
          회원가입이 성공적으로 완료되었습니다!
        </Alert>
      )}
      {showSuccessAlert === "error" && (
        <Alert severity="error" sx={{ mt: 2 }}>
          입력 값을 확인해주세요. 모든 필수 입력 항목을 작성해주세요.
        </Alert>
      )}
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
          {/* 이름 입력란 */}
          <Grid item xs={12}>
            <TextField
              autoComplete="given-name"
              name="name"
              required
              fullWidth
              id="name"
              label="이름"
              autoFocus
              value={name}
              onChange={handleNameChange}
              error={nameError}
              helperText={nameError ? '한글만 사용 가능합니다.' : ''}
            />
          </Grid>

          {/* 닉네임 입력란 */}
          <Grid item xs={12}>
            <TextField
              autoComplete="given-nickname"
              name="nickname"
              required
              fullWidth
              id="nickname"
              label="닉네임"
              autoFocus
              value={nickname}
              onChange={handleNicknameChange}
              error={nicknameError}
              helperText={
                nicknameError
                  ? '한글,영문 대소문자, 특수문자(-, _),숫자만 사용 가능합니다.'
                  : ''
              }
            />
          </Grid>

          {/* 학번 입력란 */}
          <Grid item xs={6}>
            <TextField
              autoComplete="given-stuNum"
              name="stuNum"
              required
              fullWidth
              id="stuNum"
              label="학번"
              autoFocus
              value={stuNum}
              onChange={handleStuNumChange}
              error={stuNumError}
              helperText={stuNumError ? '숫자만 사용 가능합니다.' : ''}
            />
          </Grid>

          {/* 기수 입력란 */}
          <Grid item xs={6}>
            <TextField
              autoComplete="기수"
              name="joinYear"
              required
              fullWidth
              id="joinYear"
              label="기수"
              autoFocus
              value={joinYear}
              onChange={handleJoinYearChange}
              error={joinYearError}
              helperText={joinYearError ? '숫자만 사용 가능합니다.' : ''}
            />
          </Grid>

          {/* 이메일 주소 입력란 */}
          <Grid item xs={12}>
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
          </Grid>

          {/* 비밀번호 입력란 */}
          <Grid item xs={12}>
            <TextField
              inputMode="numeric"
              pattern="[0-9]*"
              required
              fullWidth
              name="password"
              label="비밀번호"
              type="password"
              id="password"
              autoComplete="new-password"
              value={password}
              onChange={handlePasswordChange}
              error={passwordError}
              helperText={
                passwordError
                  ? '특수문자, 영문 대소문자, 숫자만 사용 가능합니다.'
                  : ''
              }
            />
          </Grid>
              {/* 관심 분야 입력란 */}
              <Grid item xs={12} mt={5}>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  name="interests"
                  label="관심 분야"
                  type="interests"
                  id="interests"
                  autoComplete="new-interests"
                />
              </Grid>
              {/* 주소 입력란 */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="address"
                  label="주소 입력"
                  type="address"
                  id="address"
                  autoComplete="new-address"
                  onClick={() => setShowAddress(true)}
                  value={selectedAddress.address}
                  readOnly
                />
              </Grid>
              <Grid item xs={12}>
                {showAddress && <Address onSelectAddress={setSelectedAddress} />}
              </Grid>
              {/* 개인정보 제공 동의 체크박스 */}
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="개인정보 제공 동의"
                  // 체크박스 상태를 checked 상태에 연결
                  checked={checked}
                  onChange={(e) => setChecked(e.target.checked)}
                />
              </Grid>
            </Grid>
           {/* 회원가입 버튼 */}
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} onClick={handleSignUp}>
              Sign Up
            </Button>
            
            <Grid container justifyContent="flex-end">
              {/* 로그인 페이지로 이동하는 링크 */}
              <Grid item>
                <Link href="/signin" variant="body2">
                  이미 계정이 만들어져 있나요?
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}