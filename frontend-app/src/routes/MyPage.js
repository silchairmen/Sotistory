import { Avatar, shouldSkipGeneratingVar } from "@mui/material";
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
        height: 70vh; /* 화면 높이의 70% */
        width: 100%; /* 화면 너비의 100% */
        display: flex;
        justify-content: center; /* 수평 가운데 정렬 */
        align-items: center; /* 수직 가운데 정렬 */
        background-color: white;
`;
const defaultTheme = createTheme();
  const handlesave = () => {};
  const ChangeAvatarHandle = () => {};
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            border: "1px solid",
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
                  name="password"
                  label="관심분야"
                  type="password"
                  id="password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  inputMode="numeric"
                  required
                  name="password"
                  label="주소"
                  type="password"
                  id="password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  inputMode="text"
                  name="password"
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
  );
};

export default Mypage;