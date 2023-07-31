// 이름 아이디 비밀번호 닉네임 전화번호
// - 아이디 : 중복확인 , 5~16 자리, 영어+숫자
// - 비밀번호 : 유효성검사(8~16자리, 특수문자, 대문자, 숫자 포함필수)
// - 닉네임 : 3~8 글자, 영어,한글,숫자만 가능

import { Form } from "react-router-dom";
import { TextField, Button } from "@mui/material";

export async function action({ request }) {
  console.log("test");

  const formData = await request.formData();

  const formDatas = Object.fromEntries(formData);

  console.log(formDatas.firstName);
  console.log("test");

  return null;
}

function signUp() {
  return (
    <>
      <div>가입페이지</div>

      <div>
        <Form method="post">
          <div>
            <TextField
              id="standard-basic"
              label="성"
              variant="standard"
              name="lastName"
            />
            <TextField
              id="standard-basic"
              label="이름"
              variant="standard"
              name="firstName"
            />
          </div>
          <div>
            <Button variant="outlined" type="submit">
              회원가입
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
}

export default signUp;
