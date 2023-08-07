// eslint-disable-next-line import/named
import { useNavigate } from "react-router-dom";
import { TextField, Button, Grid, Box } from "@mui/material";
import { store } from "@/Store/store.ts";
import { signIn } from "@/Store/userSlice.ts";
import axios from "axios";
import { useState } from "react";

function LogIn() {
  const [idHelper, setIdHelper] = useState(" ");
  const [pwHelper, setPwHelper] = useState(" ");

  const navigate = useNavigate();

  async function validate(id: string, pw: string) {
    const url = "http://i9c104.p.ssafy.io:48080/api/sign-in";
    const data = {
      user_id: id,
      password: pw,
    };

    try {
      // 서버로 POST 요청 보내기
      const response = await axios.post(url, data);

      // 응답 데이터를 콘솔에 출력
      localStorage.setItem("AccessToken", response.data.body.access_token);
    } catch (error) {
      // console.error("Error sending request:", error.response.data.result);
      return "로그인실패";
    }
  }

  const logInHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    // 공백 검사
    let retErr = false;

    if (!formData.get("id")) {
      setIdHelper("ID의 길이는 5자리 이상이어야 합니다");
      retErr = true;
    } else {
      setIdHelper(" ");
    }

    if (!formData.get("pw")) {
      setPwHelper("패스워드의 길이는 8자리 이상이어야 합니다");
      retErr = true;
    } else {
      setPwHelper(" ");
    }

    if (retErr) {
      return;
    }

    const userId = formData.get("id")!.toString();
    const userPw = formData.get("pw")!.toString();

    console.log(userId);
    console.log(userPw);

    validate(userId, userPw);

    // 로그인 성공시

    store.dispatch(signIn({ id: userId }));

    const sessionStorage = window.sessionStorage;
    sessionStorage.setItem("userState", "isLoggedIn");
    sessionStorage.setItem("userId", userId);

    navigate("/Home");
  };

  return (
    <>
      <div className="flex items-center justify-center">
        <form onSubmit={logInHandler}>
          <Grid container spacing={4} columns={11}>
            <Grid item xs={12}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <TextField
                  label="ID"
                  variant="standard"
                  name="id"
                  error={idHelper !== " "}
                  helperText={idHelper}
                />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <TextField
                  label="password"
                  variant="standard"
                  name="pw"
                  error={pwHelper !== " "}
                  helperText={pwHelper}
                />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  height: 64,
                }}
              >
                <Button variant="contained" type="submit" className="text-xs">
                  로그인
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </div>
    </>
  );
}

export default LogIn;
