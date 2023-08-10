// 이름 아이디 비밀번호 닉네임 전화번호
// - 아이디 : 중복확인 , 5~16 자리, 영어+숫자
// - 비밀번호 : 유효성검사(8~16자리, 특수문자, 대문자, 숫자 포함필수)
// - 닉네임 : 3~8 글자, 영어,한글,숫자만 가능

import { TextField, Button, Grid, Box } from "@mui/material";
import { useState } from "react";
import axios from "axios";

function AddBox() {
  const [idHelper, setIdHelper] = useState(" ");
  const [pwHelper, setPwHelper] = useState(" ");
  const [nameHelper, setNameHelper] = useState(" ");

  const [idValue, setIdValue] = useState("");
  const [pwValue, setPwValue] = useState("");
  const [nameValue, setNameValue] = useState("");

  const [idConfirm, setidConfirm] = useState(null);

  // async function validate(id: string, pw: string, pw2: string, name: string, nickName: string, nuber: string) {
  //   const url = "http://i9c104.p.ssafy.io:48080/api/sign-up";
  //   const data = {
  //     user_id: id,
  //     password: pw,
  //   };
  // }

  const attNames = ["id", "pw", "name"];
  const setter = [setIdHelper, setPwHelper, setNameHelper];

  const blankMsg = [
    "ID의 길이는 5자리 이상이어야 합니다",
    "패스워드의 길이는 8자리 이상이어야 합니다",
    "이름을 입력해주세요",
  ];
  const signUpHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    // 공백 검사
    let retErr = false;

    attNames.forEach((att, idx) => {
      if (!formData.get(att)) {
        setter[idx](blankMsg[idx]);
        retErr = true;
      } else {
        setter[idx](" ");
      }
    });

    if (retErr) {
      return;
    }
    console.log(idConfirm);
  };

  async function checkIdinServer() {
    const url =
      import.meta.env.VITE_URL_ADDRESS + "/api/validation?userId=" + idValue;
    try {
      // 서버로 POST 요청 보내기
      const response = await axios.get(url);
      console.log("확인 결과 : ", response.data.body);
      setidConfirm(response.data.body);
      console.log(idConfirm);
      // 응답 데이터를 콘솔에 출력
      return "성공";
    } catch (error) {
      console.error("에러메시지 :", error);
      return "실패";
    }
  }

  return (
    <>
      <Box
        sx={{
          width: { xs: "100%", sm: "100%" },
          backgroundColor: "white",
          padding: 4,
          borderRadius: { xs: 0, sm: 12 },
          display: "flex",
          flexDirection: "column",
          justifyContent: "start",
          alignItems: "center",
          boxShadow: 3,
          mr: { xs: 0, sm: 8 },
        }}
      >
        <div className="flex items-center justify-center">
          <form onSubmit={signUpHandler}>
            <Grid container spacing={4}>
              <Grid item xs={8}>
                <TextField
                  label="Type"
                  variant="standard"
                  name="id"
                  error={idHelper !== " "}
                  helperText={idHelper}
                  value={idValue}
                  onChange={(e) => {
                    setIdValue(e.target.value);
                  }}
                  onClick={() => {
                    setIdHelper(" ");
                  }}
                />
              </Grid>
              <Grid item xs={4}>
                <Button
                  variant="outlined"
                  className="text-xs"
                  onClick={() => {
                    if (idValue !== "") checkIdinServer();
                    else setIdHelper("아이디를 입력하세요");
                  }}
                >
                  중복 체크
                </Button>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="주소"
                  variant="standard"
                  name="pw"
                  error={pwHelper !== " "}
                  helperText={pwHelper}
                  value={pwValue}
                  onChange={(e) => {
                    setPwValue(e.target.value);
                  }}
                  onClick={() => {
                    setPwHelper(" ");
                  }}
                />
              </Grid>
              <Grid item xs={4}>
                <Button variant="outlined" className="text-xs">
                  주소 검색
                </Button>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="상세주소"
                  variant="standard"
                  name="name"
                  error={nameHelper !== " "}
                  helperText={nameHelper}
                  value={nameValue}
                  onChange={(e) => {
                    setNameValue(e.target.value);
                  }}
                  onClick={() => {
                    setNameHelper(" ");
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="우편번호"
                  variant="standard"
                  name="name"
                  error={nameHelper !== " "}
                  helperText={nameHelper}
                  value={nameValue}
                  onChange={(e) => {
                    setNameValue(e.target.value);
                  }}
                  onClick={() => {
                    setNameHelper(" ");
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="위도"
                  variant="standard"
                  name="name"
                  error={nameHelper !== " "}
                  helperText={nameHelper}
                  value={nameValue}
                  onChange={(e) => {
                    setNameValue(e.target.value);
                  }}
                  onClick={() => {
                    setNameHelper(" ");
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="경도"
                  variant="standard"
                  name="name"
                  error={nameHelper !== " "}
                  helperText={nameHelper}
                  value={nameValue}
                  onChange={(e) => {
                    setNameValue(e.target.value);
                  }}
                  onClick={() => {
                    setNameHelper(" ");
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <div className="flex items-center justify-center w-full">
                  <Button variant="contained" type="submit" className="text-xs">
                    함 추가
                  </Button>
                </div>
              </Grid>
            </Grid>
          </form>
        </div>
      </Box>
    </>
  );
}

export default AddBox;
