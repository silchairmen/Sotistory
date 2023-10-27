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
import { useEffect } from 'react';

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
  const [senddata,setSendData] = React.useState("");
  const [checked, setChecked] = React.useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = React.useState("");
  const [emailRegexError, setEmailRegexError] = React.useState(false);
  const [emailduplicationError, setEmailDuplicationError] = React.useState(false);
  const [nickNameRegexError, setNickNameRegexError] = React.useState(false);
  const [nickNameduplicationError, setNickNameDuplicationError] = React.useState(false);


  const navigate = useNavigate();
  useEffect(()=>{
    const navbar = document.querySelector('#navbar');
    if (navbar) {
      navbar.classList.add('bg-gogo');
    }
  })
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
      setSendData("필수 항목을 모두 입력해주세요.")
      return;
    }
  
    // 정규식 체크
    if (
      nameError ||
      stuNumError ||
      joinYearError ||
      passwordError
    ) {
      setShowSuccessAlert('error');
      setSendData("입력 규칙에 맞게 기입해주세요.")
      return;
    }
  
    if (!checked) {
      alert('개인정보 제공 및 활용 동의를 체크해주세요.');
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
      formData.append('interests',interests);
      formData.append('address',selectedAddress.address);
      // 회원가입 요청 보내기
      const response = await axios.post('http://192.168.0.7:3000/api/auth/join', formData);
      if (nickNameduplicationError||emailduplicationError){
        setSendData("중복되는 입력값이 있습니다.");
        setShowSuccessAlert('error');
        return 0;
      }
      // 응답 처리
      if (response.data.status === 300) {
        setSendData(response.data.message);
        setShowSuccessAlert('success');
        // ... (성공 처리)
      } else {
        setSendData("Error: "+response.data.message);
        setShowSuccessAlert('error');
        return 0;
        // ... (에러 처리)
      }
    } catch (error) {
      alert("오류");
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
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;   //정규식 검사 숫자,영문 소,대문자 특문 -,_,. 사용가능 이후는 기본 이메일과 동일
  const regName = /^[가-힣]+$/; // 한글만 사용가능
  const regNickname = /^[0-9a-zA-Z\u1100-\u11FF\u3130-\u318F\uAC00-\uD7AF\-_]{3,20}$/;
  const regStuNum = /^[0-9]{9}$/; //숫자 9자리 제한
  const regJoinYear = /^[0-9]+$/; // 숫자 사용가능
  const regPassword = /^[0-9a-zA-Z!@#$%^&*.]{8,}$/; // 특수문자, 영문 대소문자, 숫자 사용가능 최소 8자리 이상

  // 각 입력 필드의 상태와 에러 메시지를 관리하는 state
  const [name, setName] = React.useState('');
  const [nameError, setNameError] = React.useState(false);

  const [nickname, setNickname] = React.useState('');

  const [stuNum, setStuNum] = React.useState('');
  const [stuNumError, setStuNumError] = React.useState(false);

  const [joinYear, setJoinYear] = React.useState('');
  const [joinYearError, setJoinYearError] = React.useState(false);

  const [email, setEmail] = React.useState('');

  const [password, setPassword] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);

  const [interests,setInterests] = React.useState('');


  // 입력 필드 값이 변경될 때마다 정규식 검사를 수행하고 에러 상태 업데이트
  const handleNameChange = (e) => {
    setName(e.target.value);
    setNameError(!regName.test(e.target.value));
  };

  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
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
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordError(!regPassword.test(e.target.value));
  };
  const handleInterestsChange = (e) => {
    setInterests(e.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // 체크박스가 체크되지 않았으면 경고창 표시
    if (!checked) {
      alert('Please check the agreement.'); // 경고창 띄우기
      return; // 함수 실행 중단
    }
  };
  const CheckNickName = async () => {
    try {
      const Data1 = new FormData();
      Data1.append('nickname', nickname);
      const resp = await axios.post('http://192.168.0.7:3000/api/auth/help/check_nickname', Data1);
      if (resp.data.status === 200) {
        setNickNameDuplicationError(false);
      } else if(resp.data.status === 500){
        setNickNameDuplicationError(true);
      }
    } catch (error) {
    }
  };

  const   CheckEmail = async () => {
    try {
      const Data2 = new FormData();
      Data2.append('email', email);
      const resp = await axios.post('http://192.168.0.16:8888/api/member/help/check_email', Data2);
      if (resp.data.status === 200) {
        setEmailDuplicationError(false);
      } else if(resp.data.status === 500){
        setEmailDuplicationError(true);
      }
    } catch (error) {
    }
  };
  const handleBlurEmail = async (e) => {
    await CheckEmail();
    setEmail(e.target.value);
    setEmailRegexError(!regEmail.test(e.target.value));
  };
  const handleBlurNickname= async (e)=>{
    await CheckNickName();
    setNickname(e.target.value);
    setNickNameRegexError(!regNickname.test(e.target.value));

  }
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
          {senddata}
        </Alert>
      )}

      {showSuccessAlert === "error" && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {senddata}
        </Alert>
      )}
      
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
            {/* 이메일 주소 입력란 */}
              <Grid item xs={12}>
                <TextField
                    required
                    fullWidth
                    name="email"
                    label="이메일 주소"
                    id="email"
                    autoComplete="email"
                    autoFocus
                    value={email}
                    onChange={handleEmailChange}
                    error={emailRegexError||emailduplicationError}
                    helperText={
                      (emailRegexError && emailduplicationError)
                          ? "올바른 이메일 형식이 아닙니다.\n중복된 이메일입니다."
                          : emailRegexError
                              ? "올바른 이메일 형식이 아닙니다."
                              : emailduplicationError
                                  ? "중복된 이메일입니다."
                                  : ""
                    }
                    onBlur={handleBlurEmail}
                />
              </Grid>
          
          {/* 비밀번호 입력란 */}
          <Grid item xs={12}>
            <TextField
              inputMode="numeric"
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
                  ? '특수문자, 영문 대소문자, 숫자 사용가능 최소 8자리 이상'
                  : ''
              }
            />
          </Grid>
          {/* 이름 입력란 */}
          <Grid item xs={12}>
            <TextField
              autoComplete="given-name"
              name="name"
              required
              fullWidth
              id="name"
              label="이름"
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
              value={nickname}
              onChange={handleNicknameChange}
              error={nickNameRegexError||nickNameduplicationError}
              helperText={
                (nickNameRegexError && nickNameduplicationError)
                    ? "닉네임은 영어,한글,특수문자(-_)만 입력 가능합니다.\n중복된 닉네임입니다."
                    : nickNameRegexError
                        ? "닉네임은 영어,한글,특수문자(-_)만 입력 가능합니다."
                        : nickNameduplicationError
                            ? "중복된 닉네임입니다."
                            : ""
              }
              onBlur={handleBlurNickname}
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
              value={stuNum}
              onChange={handleStuNumChange}
              error={stuNumError}
              helperText={stuNumError ? '특수문자없이 학번만 입력하세요.' : ''}
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
              value={joinYear}
              onChange={handleJoinYearChange}
              error={joinYearError}
              helperText={joinYearError ? '숫자만 사용 가능합니다.' : ''}
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
                  value={interests}
                  type="interests"
                  id="interests"
                  autoComplete="new-interests"
                  onChange={handleInterestsChange}
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
                  onFocus={() => setShowAddress(true)}
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
                  label="개인정보 제공 및 활용 동의"
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