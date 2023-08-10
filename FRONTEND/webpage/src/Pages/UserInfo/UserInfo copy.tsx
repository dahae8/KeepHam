// 이름 아이디 비밀번호 닉네임 전화번호
// - 아이디 : 중복확인 , 5~16 자리, 영어+숫자
// - 비밀번호 : 유효성검사(8~16자리, 특수문자, 대문자, 숫자 포함필수)
// - 닉네임 : 3~8 글자, 영어,한글,숫자만 가능

import { useNavigate } from "react-router-dom";
import { TextField, Button, Grid, Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/Store/hooks.ts";
import axios from "axios";

function UserInfo() {
  const [editMode, setEditMode] = useState(false);

  const [idHelper, setIdHelper] = useState(" ");
  const [pwHelper, setPwHelper] = useState(" ");
  const [pw2Helper, setPw2Helper] = useState(" ");
  const [nameHelper, setNameHelper] = useState(" ");
  const [ageHelper, setAgeHelper] = useState(" ");
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

  const dispatch = useAppDispatch();

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
  const datasetter = [
    setIdValue,
    setPwValue,
    setPw2Value,
    setNameValue,
    setNickNameValue,
    setNumberValue,
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

  const navigate = useNavigate();

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
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const url =
          import.meta.env.VITE_URL_ADDRESS + "/api/boxs/" + userZipCode;
        const response = await axios.get(url);
        setBoxes(response.data.body);
        console.log("박시즈 : ", Boxes);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserInfo();

    datasetter.forEach((e) => {
      e(" dd");
    });
  }, []);

  const items = (
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
      {editMode && (
        <Grid item xs={4}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "end",
            }}
          >
            <Typography variant="body2">회원탈퇴</Typography>
          </Box>
        </Grid>
      )}
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
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            gap: 4,
          }}
        >
          {!editMode ? (
            <>
              <Button
                variant="outlined"
                className="text-xs"
                onClick={() => {
                  setEditMode(true);
                }}
              >
                회원 정보 수정
              </Button>
            </>
          ) : (
            <>
              <Button variant="contained" type="submit" className="text-xs">
                변경 확인
              </Button>
              <Button
                variant="outlined"
                className="text-xs"
                onClick={() => {
                  setEditMode(false);
                  setter.forEach((e) => {
                    e(" ");
                  });
                }}
              >
                취소
              </Button>
            </>
          )}
        </Box>
      </Grid>
    </Grid>
  );

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: 8,
            maxWidth: 500,
          }}
        >
          {editMode ? (
            <>
              <form onSubmit={signUpHandler}>{items}</form>
            </>
          ) : (
            <>{items}</>
          )}
        </Box>
      </Box>
    </>
  );
}

export default UserInfo;
