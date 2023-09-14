import { Avatar } from "@mui/material";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Provider } from "react-redux";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Button from '@mui/material/Button';

const Mypage = () => {
    const BackGround = styled.div`
        width: 100%; /* 화면 너비의 100% */
        //display: flex;
        justify-content: center; /* 수평 가운데 정렬 */
        align-items: center; /* 수직 가운데 정렬 */
        background-color: white;
`;
const defaultTheme = createTheme();
  const handlesave = () => {
    
  };
  const ChangeAvatarHandle = () => {};
  return (
    <BackGround>
    <ThemeProvider theme={defaultTheme}>
      <Container>
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            border: "1px solid",
            width: "60vw",
            paddingTop: "100px",
            backgroundColor: "whitesmoke",
          }}
        >
          <Avatar
            sx={{ height: "100px", width: "100px" }}
            onClick={ChangeAvatarHandle}
          ></Avatar>
          <Box component="form" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  id="nickname"
                  label="닉네임"
                  variant="outlined"
                  value=""
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  inputMode="numeric"
                  required
                  label="관심분야"
                  id="hobby"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  inputMode="numeric"
                  required
                  label="주소"
                  id="password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  inputMode="text"

                  label="비밀번호"
                  type="text"
                  id="password"
                />
              </Grid>
              <Button type="submit" variant="contained" sx={{ mt: 3, mb: 3 }} onClick={handlesave}>
              Sign Up
            </Button>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
    </BackGround>
  );
};

export default Mypage;