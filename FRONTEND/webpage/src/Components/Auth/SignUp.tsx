// 이름 아이디 비밀번호 닉네임 전화번호
// - 아이디 : 중복확인 , 5~16 자리, 영어+숫자
// - 비밀번호 : 유효성검사(8~16자리, 특수문자, 대문자, 숫자 포함필수)
// - 닉네임 : 3~8 글자, 영어,한글,숫자만 가능

import { TextField, Button, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { switchTab } from "@/Store/tabSlice.ts";
import { useAppDispatch } from "@/Store/hooks.ts";

function SignUp() {
  const [idHelper, setIdHelper] = useState(" ");
  const [pwHelper, setPwHelper] = useState(" ");
  const [pw2Helper, setPw2Helper] = useState(" ");
  const [nameHelper, setNameHelper] = useState(" ");
  const [nickNameHelper, setNickNameHelper] = useState(" ");
  const [numberHelper, setNumberHelper] = useState(" ");

  const [idValue, setIdValue] = useState("");
  const [pwValue, setPwValue] = useState("");
  const [pw2Value, setPw2Value] = useState("");
  const [nameValue, setNameValue] = useState("");
  const [nickNameValue, setNickNameValue] = useState("");
  const [numberValue, setNumberValue] = useState("");

  const [idConfirm, setidConfirm] = useState(null);
  const [pwConfirm, setpwConfirm] = useState<boolean | null>(null);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const attNames = ["id", "pw", "pw2", "name", "nickName", "number"];
  const setter = [
    setIdHelper,
    setPwHelper,
    setPw2Helper,
    setNameHelper,
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
    console.log(pwConfirm, idConfirm);

    if (pwConfirm && idConfirm) {
      const addUser = async () => {
        const url = import.meta.env.VITE_URL_ADDRESS + "/api/sign-up";
        const data = {
          user_id: idValue,
          password: pwValue,
          name: nameValue,
          nick_name: nickNameValue,
          tel: numberValue,
          email: "이건머야",
        };
        try {
          const response = await axios.post(url, data);
          console.log("가입여부:", response);

          dispatch(switchTab({ setIdx: 0 }));
          navigate("/Auth");
        } catch (error) {
          console.log(error);
        }
      };
      addUser();
    }
  };

  async function checkIdinServer() {
    const url =
      import.meta.env.VITE_URL_ADDRESS + "/api/validation?userId=" + idValue;
    try {
      const response = await axios.get(url);
      console.log("확인 결과 : ", response.data.body);
      setidConfirm(response.data.body);
      console.log(idConfirm);
      return "성공";
    } catch (error) {
      console.error("에러메시지 :", error);
      return "실패";
    }
  }
  useEffect(() => {
    if (pwValue !== pw2Value && pw2Value !== "") {
      setPw2Helper("비밀번호가 다릅니다");
      setpwConfirm(false);
    } else {
      setPw2Helper(" ");
      setpwConfirm(true);
    }
  }, [pwValue, pw2Value]);
  useEffect(() => {
    if (!idConfirm && idValue !== "") setIdHelper("중복된 아이디입니다");
  }, [idConfirm]);

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
                label="비밀번호"
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
            <Grid item xs={6}>
              <TextField
                label="비밀번호 확인"
                variant="standard"
                name="pw2"
                error={pw2Helper !== " "}
                helperText={pw2Helper}
                value={pw2Value}
                onChange={(e) => {
                  setPw2Value(e.target.value);
                }}
                onClick={() => {
                  if (pwValue === pw2Value) setPw2Helper(" ");
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="이름"
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
            <Grid item xs={8}>
              <TextField
                label="닉네임"
                variant="standard"
                name="nickName"
                error={nickNameHelper !== " "}
                helperText={nickNameHelper}
                value={nickNameValue}
                onChange={(e) => {
                  setNickNameValue(e.target.value);
                }}
                onClick={() => {
                  setNickNameHelper(" ");
                }}
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
                value={numberValue}
                onChange={(e) => {
                  setNumberValue(e.target.value);
                }}
                onClick={() => {
                  setNumberHelper(" ");
                }}
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
