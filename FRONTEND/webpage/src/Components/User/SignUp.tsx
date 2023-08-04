// 이름 아이디 비밀번호 닉네임 전화번호
// - 아이디 : 중복확인 , 5~16 자리, 영어+숫자
// - 비밀번호 : 유효성검사(8~16자리, 특수문자, 대문자, 숫자 포함필수)
// - 닉네임 : 3~8 글자, 영어,한글,숫자만 가능

// eslint-disable-next-line import/named
import { ActionFunctionArgs, Form, redirect } from "react-router-dom";
import { TextField, Button, Grid, useScrollTrigger } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

// eslint-disable-next-line react-refresh/only-export-components

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  const formDatas = Object.fromEntries(formData);

  console.log(formDatas.name);

  return null;
}

async function checkIdformServer() {
  const url = "http://i9c104.p.ssafy.io:48080/api/validation";
  const userid = window.sessionStorage.getItem("id");
  console.log(userid);
  const data = {
    userId: userid,
  };
  try {
    // 서버로 POST 요청 보내기
    const response = await axios.get(url, { params: data });

    // 응답 데이터를 콘솔에 출력
    console.log("응답", response.data.body);
    window.sessionStorage.setItem("idconfirm", response.data.body);
  } catch (error: any) {
    console.error("Error sending request:", error);
  }
}

async function singUp() {
  const id = window.sessionStorage.getItem("id");
  const pw = window.sessionStorage.getItem("pw");
  const name = window.sessionStorage.getItem("name");
  const nickname = window.sessionStorage.getItem("nick");
  const email = window.sessionStorage.getItem("email");

  const url = "http://i9c104.p.ssafy.io:48080/api/sign-up";
  const data = {
    user_id: id,
    password: pw,
    name: name,
    nick_name: nickname,
    email: email,
    age: 0,
  };
  const pwc = window.sessionStorage.getItem("pwconfirm");
  const idc = window.sessionStorage.getItem("idconfirm");
  if (pwc === "true" && idc === "true") {
    try {
      // 서버로 POST 요청 보내기
      const response = await axios.post(url, data);

      // 응답 데이터를 콘솔에 출력
      console.log(response);
      window.sessionStorage.removeItem("pw");
      window.sessionStorage.removeItem("id");
      window.sessionStorage.removeItem("name");
      window.sessionStorage.removeItem("nick");
      window.sessionStorage.removeItem("mail");
      console.log("가입성공");
      return redirect("/SingIn");
    } catch (error: any) {
      console.error("Error sending request:", error.response.data.result);
    }
  } else {
    console.log("가입실패");
  }
}

function SignUp() {
  window.sessionStorage.setItem("idconfirm", "false");
  const [idvalue, setid] = useState("");
  const [pwvalue, setpw] = useState("");
  const [pwckvalue, setpwck] = useState("");
  const [nickvalue, setnick] = useState("");
  const [namevalue, setname] = useState("");
  const [mailvalue, setmail] = useState("");
  window.sessionStorage.setItem("pwconfirm", "false");

  console.log(idvalue, pwvalue, nickvalue, namevalue, mailvalue);
  let pwalert = null;
  if (pwvalue !== pwckvalue && pwckvalue != "") {
    pwalert = (
      <Stack sx={{ width: "100%" }} spacing={2}>
        <Alert severity="error">비밀번호가 다릅니다!</Alert>
      </Stack>
    );
    window.sessionStorage.setItem("pwconfirm", "false");
  } else if (pwvalue === pwckvalue) {
    window.sessionStorage.setItem("pwconfirm", "true");
  }

  return (
    <>
      <div className="flex items-center justify-center">
        <Form method="post">
          <Grid container spacing={4}>
            <Grid item xs={8}>
              <TextField
                id="standard-basic"
                label="ID"
                variant="standard"
                name="id"
                onChange={(e) => {
                  window.sessionStorage.setItem("id", e.target.value);
                  setid(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={4}>
              <Button
                variant="outlined"
                className="text-xs"
                onClick={checkIdformServer}
              >
                중복 체크
              </Button>
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="standard-basic"
                label="비밀번호"
                variant="standard"
                name="pw"
                onChange={(e) => {
                  window.sessionStorage.setItem("pw", e.target.value);
                  setpw(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="standard-basic"
                label="비밀번호 확인"
                variant="standard"
                name="pw2"
                onChange={(e) => {
                  setpwck(e.target.value);
                }}
              />
            </Grid>
            {pwalert}
            <Grid item xs={8}>
              <TextField
                id="standard-basic"
                label="이름"
                variant="standard"
                name="name"
                onChange={(e) => {
                  window.sessionStorage.setItem("name", e.target.value);
                  setname(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={4}></Grid>
            <Grid item xs={8}>
              <TextField
                id="standard-basic"
                label="닉네임"
                variant="standard"
                name="nickName"
                onChange={(e) => {
                  window.sessionStorage.setItem("nick", e.target.value);
                  setnick(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={4}></Grid>
            <Grid item xs={8}>
              <TextField
                id="standard-basic"
                label="이메일"
                variant="standard"
                name="number"
                onChange={(e) => {
                  window.sessionStorage.setItem("mail", e.target.value);
                  setmail(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={4}></Grid>
            {/* <Grid item xs={8}>
              <TextField
                id="standard-basic"
                label="나이"
                variant="standard"
                name="number"
              />
            </Grid> */}
            <Grid item xs={4}></Grid>
            <Grid item xs={12}>
              <div className="flex items-center justify-center w-full">
                <Button
                  variant="contained"
                  type="submit"
                  className="text-xs"
                  onClick={singUp}
                >
                  회원 가입
                </Button>
              </div>
            </Grid>
          </Grid>
        </Form>
      </div>
    </>
  );
}

export default SignUp;
