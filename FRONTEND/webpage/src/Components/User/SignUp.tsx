// 이름 아이디 비밀번호 닉네임 전화번호
// - 아이디 : 중복확인 , 5~16 자리, 영어+숫자
// - 비밀번호 : 유효성검사(8~16자리, 특수문자, 대문자, 숫자 포함필수)
// - 닉네임 : 3~8 글자, 영어,한글,숫자만 가능

// eslint-disable-next-line import/named
import { ActionFunctionArgs, Form } from "react-router-dom";
import { TextField, Button, Grid } from "@mui/material";

// eslint-disable-next-line react-refresh/only-export-components
export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  const formDatas = Object.fromEntries(formData);

  console.log(formDatas.name);

  return null;
}

function SignUp() {
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
              />
            </Grid>
            <Grid item xs={4}>
              <Button variant="outlined" className="text-xs">
                중복 체크
              </Button>
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="standard-basic"
                label="비밀번호"
                variant="standard"
                name="pw"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="standard-basic"
                label="비밀번호 확인"
                variant="standard"
                name="pw2"
              />
            </Grid>
            <Grid item xs={8}>
              <TextField
                id="standard-basic"
                label="이름"
                variant="standard"
                name="name"
              />
            </Grid>
            <Grid item xs={4}></Grid>
            <Grid item xs={8}>
              <TextField
                id="standard-basic"
                label="닉네임"
                variant="standard"
                name="nickName"
              />
            </Grid>
            <Grid item xs={4}></Grid>
            <Grid item xs={8}>
              <TextField
                id="standard-basic"
                label="전화번호"
                variant="standard"
                name="number"
              />
            </Grid>
            <Grid item xs={4}></Grid>
            <Grid item xs={12}>
              <div className="flex items-center justify-center w-full">
                <Button variant="contained" type="submit" className="text-xs">
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
