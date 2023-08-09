// 이름 아이디 비밀번호 닉네임 전화번호
// - 아이디 : 중복확인 , 5~16 자리, 영어+숫자
// - 비밀번호 : 유효성검사(8~16자리, 특수문자, 대문자, 숫자 포함필수)
// - 닉네임 : 3~8 글자, 영어,한글,숫자만 가능

import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  FormHelperText,
} from "@mui/material";
import { useState } from "react";

function SignUp() {
  const [idHelper, setIdHelper] = useState(" ");
  const [pwHelper, setPwHelper] = useState(" ");
  const [pw2Helper, setPw2Helper] = useState(" ");
  const [nameHelper, setNameHelper] = useState(" ");
  const [nickNameHelper, setNickNameHelper] = useState(" ");
  const [numberHelper, setNumberHelper] = useState(" ");
  const [ageHelper, setAgeHelper] = useState(" ");

  const navigate = useNavigate();

  // async function validate(id: string, pw: string, pw2: string, name: string, nickName: string, nuber: string) {
  //   const url = "http://i9c104.p.ssafy.io:48080/api/sign-up";
  //   const data = {
  //     user_id: id,
  //     password: pw,
  //   };
  // }

  const [age, setAge] = useState("");

  const handleAgeChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  const attNames = ["id", "pw", "pw2", "name", "age", "nickName", "number"];
  const setter = [
    setIdHelper,
    setPwHelper,
    setPw2Helper,
    setNameHelper,
    setAgeHelper,
    setNickNameHelper,
    setNumberHelper,
  ];

  const blankMsg = [
    "ID의 길이는 5자리 이상이어야 합니다",
    "패스워드의 길이는 8자리 이상이어야 합니다",
    "패스워드 확인란을 입력해주세요",
    "이름을 입력해주세요",
    "나이를 선택해주세요",
    "채팅방에서 사용할 닉네임을 입력해주세요",
    "전화번호를 입력해주세요",
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

    navigate("/Home");
  };

  function ages() {
    const arr = [];
    for (let i = 0; i < 120; i++) {
      arr.push(<MenuItem value={i}>{i}</MenuItem>);
    }
    return arr;
  }

  return (
    <>
      <div className="flex items-center justify-center">
        <form onSubmit={signUpHandler}>
          <Grid container spacing={4}>
            <Grid item xs={8}>
              <TextField
                label="ID"
                variant="standard"
                name="id"
                error={idHelper !== " "}
                helperText={idHelper}
              />
            </Grid>
            <Grid item xs={4}>
              <Button variant="outlined" className="text-xs">
                중복 체크
              </Button>
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="비밀번호"
                variant="standard"
                name="pw"
                error={pwHelper !== " "}
                helperText={pwHelper}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="비밀번호 확인"
                variant="standard"
                name="pw2"
                error={pw2Helper !== " "}
                helperText={pw2Helper}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="이름"
                variant="standard"
                name="name"
                error={nameHelper !== " "}
                helperText={nameHelper}
              />
            </Grid>
            <Grid item xs={3}>
              <FormControl fullWidth error={ageHelper !== " "}>
                <InputLabel>Age</InputLabel>
                <Select
                  value={age}
                  label="나이"
                  name="age"
                  onChange={handleAgeChange}
                >
                  {ages()}
                </Select>
                <FormHelperText>{ageHelper}</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={8}>
              <TextField
                label="닉네임"
                variant="standard"
                name="nickName"
                error={nickNameHelper !== " "}
                helperText={nickNameHelper}
              />
            </Grid>
            <Grid item xs={4}></Grid>
            <Grid item xs={8}>
              <TextField
                label="전화번호"
                variant="standard"
                name="number"
                error={numberHelper !== " "}
                helperText={numberHelper}
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
        </form>
      </div>
    </>
  );
}

export default SignUp;
