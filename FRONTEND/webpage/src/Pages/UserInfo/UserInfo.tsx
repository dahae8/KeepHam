// 이름 아이디 비밀번호 닉네임 전화번호
// - 아이디 : 중복확인 , 5~16 자리, 영어+숫자
// - 비밀번호 : 유효성검사(8~16자리, 특수문자, 대문자, 숫자 포함필수)
// - 닉네임 : 3~8 글자, 영어,한글,숫자만 가능

import { TextField, Button, Grid, Box } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";

function UserInfo() {
  const [editMode, setEditMode] = useState(false);

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

  const [pwConfirm, setpwConfirm] = useState<boolean | null>(null);
  const [NickConfirm, setNickConfirm] = useState<boolean | null>(null);
  console.log(NickConfirm);

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

    if (retErr || pwConfirm) {
      return;
    }
    const changeUserInfo = async () => {
      const url = import.meta.env.VITE_URL_ADDRESS + "/api/user/" + idValue;
      const data = {
        password: "string",
        new_password: "string",
        email: "string",
        tel: "string",
      };
      try {
        const response = await axios.put(url, data);
        console.log("가입여부:", response);
      } catch (error) {
        console.log(error);
      }
    };
    changeUserInfo();
  };
  useEffect(() => {
    const UserId = sessionStorage.getItem("userId");
    const fetchUserInfo = async () => {
      try {
        const url = import.meta.env.VITE_URL_ADDRESS + "/api/user/" + UserId;
        const response = await axios.get(url);
        const data = response.data.body;
        console.log(data);
        setIdValue(data.user_id);
        setNameValue(data.name);
        setNickNameValue(data.nick_name);
        setNumberValue(data.tel);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserInfo();
  }, []);
  useEffect(() => {
    if (pw2Value !== pwValue) {
      setpwConfirm(false);
      setPw2Helper("비밀번호가 다릅니다");
    } else {
      setpwConfirm(true);
      setPw2Helper(" ");
    }
  }, [pw2Value]);

  async function checkNickinServer() {
    const url =
      import.meta.env.VITE_URL_ADDRESS +
      "/api/validation/nickname?nickName=" +
      nickNameValue;
    try {
      const response = await axios.get(url);
      console.log("확인 결과 : ", response.data.body);
      setNickConfirm(response.data.body);
      if (response.data.body === false) {
        setNickNameHelper("중복된 닉네임입니다");
      } else setNickNameHelper("사용 가능한 닉네임입니다");
    } catch (error) {
      console.error("에러메시지 :", error);
    }
  }

  const items = (
    <Grid container spacing={4}>
      <Grid item xs={8}>
        <TextField
          disabled
          label="ID"
          variant="standard"
          name="id"
          error={idHelper !== " "}
          helperText={idHelper}
          value={idValue}
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
            <Button
              variant="outlined"
              className="text-xs"
              color="error"
              onClick={() => {
                setEditMode(true);
              }}
            >
              회원 탈퇴
            </Button>
          </Box>
        </Grid>
      )}
      {editMode && (
        <Grid item xs={6}>
          <TextField
            type="password"
            label="비밀번호"
            variant="standard"
            name="pw"
            error={pwHelper !== " "}
            helperText={pwHelper}
            value={pwValue}
            onChange={(e) => {
              if (editMode) setPwValue(e.target.value);
            }}
            onClick={() => {
              setPwHelper(" ");
            }}
          />
        </Grid>
      )}
      {editMode && (
        <Grid item xs={6}>
          <TextField
            type="password"
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
      )}
      <Grid item xs={6}>
        <TextField
          disabled
          label="이름"
          variant="standard"
          name="name"
          error={nameHelper !== " "}
          helperText={nameHelper}
          value={nameValue}
        />
      </Grid>
      <Grid item xs={8}>
        <TextField
          disabled={!editMode}
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
      <Grid item xs={4}>
        {editMode && <Button
          variant="outlined"
          className="text-xs"
          onClick={() => {
            if (idValue !== "") checkNickinServer();
            else setIdHelper("닉네임을 입력하세요");
          }}
        >
          중복 체크
        </Button>}
      </Grid>
      <Grid item xs={8}>
        <TextField
          disabled
          label="전화번호"
          variant="standard"
          name="number"
          error={numberHelper !== " "}
          helperText={numberHelper}
          value={numberValue}
          onClick={() => {
            setNumberHelper("번호는 변경할 수 없습니다.");
          }}
          onChange={() => {
            setNumberHelper("번호는 변경할 수 없습니다.");
          }}
          onMouseOut={() => {
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
