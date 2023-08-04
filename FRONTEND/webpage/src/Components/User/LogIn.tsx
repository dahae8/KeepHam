// eslint-disable-next-line import/named
import {
  ActionFunctionArgs,
  Form,
  redirect,
  useActionData,
} from "react-router-dom";
import { TextField, Button, Grid } from "@mui/material";
import { store } from "@/Store/store.ts";
import { signIn } from "@/Store/userSlice.ts";
import axios from "axios";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { useEffect, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  const formDatas = Object.fromEntries(formData);

  // 로그인 버튼 눌렀을 경우

  const userId = formDatas.id.toString();
  const userPw = formDatas.pw.toString();

  const url = "http://i9c104.p.ssafy.io:48080/api/sign-in";
  const data = {
    user_id: userId,
    password: userPw,
  };

  try {
    // 서버로 POST 요청 보내기
    const response = await axios.post(url, data);

    // 응답 데이터를 콘솔에 출력
    localStorage.setItem("AccessToken", response.data.body.access_token);
  } catch (error: any) {
    console.error("Error sending request:", error.response.data.result);
    return "로그인실패";
  }
  //TODO: 검증코드 작성 필요!

  store.dispatch(signIn({ id: userId }));

  const sessionStorage = window.sessionStorage;
  sessionStorage.setItem("loginState", "isLoggedIn");
  sessionStorage.setItem("loginId", userId);

  return redirect("/");
}

function LogIn() {
  let showalert = null;
  const [pwvalue, changepw] = useState("");
  const error = useActionData();
  if (error === "로그인실패") {
    showalert = (
      <Stack sx={{ width: "50%" }} spacing={2}>
        <Alert severity="error">로그인 실패</Alert>
      </Stack>
    );
  }

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
                  type="password"
                  value={pwvalue}
                  onChange={(e) => {
                    console.log(e.target.value);
                    changepw(e.target.value);
                  }}
                />
              </div>
            </Grid>
            {showalert}
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
