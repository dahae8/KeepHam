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
  const [idValue, setidValue] = useState("");
  const [pwValue, setpwValue] = useState("");

  const navigate = useNavigate();

  async function validate(id: string, pw: string) {
    const url = import.meta.env.VITE_URL_ADRESS + "/api/sign-in";
    const data = {
      user_id: id,
      password: pw,
    };
    console.log("함수실행");
    try {
      // 서버로 POST 요청 보내기
      const response = await axios.post(url, data);
      console.log("로그인 결과 : ", response.data.body);
      // 응답 데이터를 콘솔에 출력
      localStorage.setItem("AccessToken", response.data.body.access_token);
      sessionStorage.setItem("userRole", response.data.body.user_role);
      return "성공";
    } catch (error) {
      console.error("에러메시지 :", error);
      return "실패";
    }
  }

  const logInHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    // 공백 검사
    let retErr = false;

    if (!formData.get("id")) {
      setIdHelper("ID를 입력해주세요");
      retErr = true;
    } else {
      setIdHelper(" ");
    }

    if (!formData.get("pw")) {
      setPwHelper("비밀번호를 입력해주세요");
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

    const rt = await validate(userId, userPw);
    if (rt === "성공") {
      store.dispatch(signIn({ id: userId }));

      const sessionStorage = window.sessionStorage;
      sessionStorage.setItem("userState", "isLoggedIn");
      sessionStorage.setItem("userId", userId);

      navigate("/Home/RoomList");
      console.log("로그인 성공");
    } else {
      console.log("로그인 실패");
      setidValue("");
      setpwValue("");
      setIdHelper("ID를 확인해주세요");
      setPwHelper("비밀번호를 확인해주세요");
    }

    // 로그인 성공시
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
                  value={idValue}
                  onChange={(e) => {
                    setidValue(e.target.value);
                  }}
                  onClick={() => {
                    setIdHelper(" ");
                  }}
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
                  value={pwValue}
                  onChange={(e) => {
                    setpwValue(e.target.value);
                  }}
                  onClick={() => {
                    setPwHelper(" ");
                  }}
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
