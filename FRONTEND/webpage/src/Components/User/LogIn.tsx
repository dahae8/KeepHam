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


//import { useState } from "react";
// import Modal from "@mui/material/Modal";
// import Box from "@mui/material/Box";
// import Typography from "@mui/material/Typography";
// import React from "react";

// const style = {
//   position: "absolute" as "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 400,
//   bgcolor: "background.paper",
//   border: "2px solid #000",
//   boxShadow: 24,
//   p: 4,
// };

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
  } catch (error) {
    // console.error("Error sending request:", error.response.data.result);
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
  const error = useActionData();
  // const [open, setOpen] = React.useState(false);
  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);
  console.log(error);

  if (error === "로그인실패") {
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
