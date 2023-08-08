// 이름 아이디 비밀번호 닉네임 전화번호
// - 아이디 : 중복확인 , 5~16 자리, 영어+숫자
// - 비밀번호 : 유효성검사(8~16자리, 특수문자, 대문자, 숫자 포함필수)
// - 닉네임 : 3~8 글자, 영어,한글,숫자만 가능

import { useNavigate } from "react-router-dom";
import { TextField, Button, Grid, Box, Typography } from "@mui/material";
import { useState } from "react";

function UserInfo() {
  const [editMode, setEditMode] = useState(false);

  const [idHelper, setIdHelper] = useState(" ");
  const [pwHelper, setPwHelper] = useState(" ");
  const [pw2Helper, setPw2Helper] = useState(" ");
  const [nameHelper, setNameHelper] = useState(" ");
  const [ageHelper, setAgeHelper] = useState(" ");
  const [nickNameHelper, setNickNameHelper] = useState(" ");
  const [numberHelper, setNumberHelper] = useState(" ");

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

  function ages() {
    const arr = [];
    for (let i = 0; i < 120; i++) {
      arr.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }
    return arr;
  }

  const items = (
    <Grid container spacing={4}>
      <Grid item xs={8}>
        <TextField
          label="ID"
          variant="standard"
          name="id"
          error={idHelper !== " "}
          helperText={idHelper}
          InputProps={{
            readOnly: !editMode,
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
          InputProps={{
            readOnly: !editMode,
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
          InputProps={{
            readOnly: !editMode,
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
          InputProps={{
            readOnly: !editMode,
          }}
        />
      </Grid>
      <Grid item xs={3}>
        <TextField
          select={editMode}
          label="나이"
          variant="standard"
          name="age"
          error={ageHelper !== " "}
          helperText={ageHelper}
          InputProps={{
            readOnly: !editMode,
          }}
          SelectProps={{
            readOnly: !editMode,
            native: true,
          }}
        >
          {ages()}
        </TextField>
      </Grid>
      <Grid item xs={8}>
        <TextField
          label="닉네임"
          variant="standard"
          name="nickName"
          error={nickNameHelper !== " "}
          helperText={nickNameHelper}
          InputProps={{
            readOnly: !editMode,
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
          InputProps={{
            readOnly: !editMode,
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
