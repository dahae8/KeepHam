// eslint-disable-next-line import/named
import { ActionFunctionArgs, Form, redirect } from "react-router-dom";
import { TextField, Button, Grid } from "@mui/material";
import { store } from "@/Store/store.ts";
import { signIn } from "@/Store/userSlice.ts";
import { useEffect } from "react";
import axios from "axios";

// eslint-disable-next-line react-refresh/only-export-components
export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  const formDatas = Object.fromEntries(formData);

  // 로그인 버튼 눌렀을 경우

  const userId = formDatas.id.toString();
  const userPw = formDatas.pw.toString();
  console.log(userId);
  console.log(userPw);

  const url = "http://i9c104.p.ssafy.io:48080/api/sign-in";
  const data = {
    user_id: userId,
    password: userPw,
  };

  try {
    // 서버로 POST 요청 보내기
    const response = await axios.post(url, data);

    // 응답 데이터를 콘솔에 출력
    console.log("Response:", response.data.body);
    localStorage.setItem("AccessToken", response.data.body.access_token);
    const a = localStorage.getItem("AccessToken");
    console.log("토큰 : ", a);
  } catch (error) {
    console.error("Error sending request:", error);
  }

  //TODO: 검증코드 작성 필요!

  store.dispatch(signIn({ id: userId }));

  const sessionStorage = window.sessionStorage;
  sessionStorage.setItem("loginState", "isLoggedIn");
  sessionStorage.setItem("loginId", userId);

  return redirect("/");
}

function LogIn() {
  return (
    <>
      <div className="flex items-center justify-center">
        <Form method="post">
          <Grid container spacing={4} columns={11}>
            <Grid item xs={12}>
              <div className="flex items-center justify-center w-full">
                <TextField
                  id="standard-basic"
                  label="ID"
                  variant="standard"
                  name="id"
                />
              </div>
            </Grid>
            <Grid item xs={12}>
              <div className="flex items-center justify-center w-full">
                <TextField
                  id="standard-basic"
                  label="password"
                  variant="standard"
                  name="pw"
                />
              </div>
            </Grid>
            <Grid item xs={12}>
              <div className="flex items-center justify-center w-full h-16">
                <Button variant="contained" type="submit" className="text-xs">
                  로그인
                </Button>
              </div>
            </Grid>
          </Grid>
        </Form>
      </div>
    </>
  );
}

export default LogIn;
