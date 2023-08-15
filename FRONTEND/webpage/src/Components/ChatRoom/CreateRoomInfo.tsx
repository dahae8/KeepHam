// 이름 아이디 비밀번호 닉네임 전화번호
// - 아이디 : 중복확인 , 5~16 자리, 영어+숫자
// - 비밀번호 : 유효성검사(8~16자리, 특수문자, 대문자, 숫자 포함필수)
// - 닉네임 : 3~8 글자, 영어,한글,숫자만 가능

import { TextField, Button, Grid, Box } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";

interface forCreateRoom {
  title: string;
  store_id: number;
  box_id: number;
  extension_number: number;
  max_people_number: number;
  super_user_id: string | null;
  locked: boolean;
  password: string;
}

function Addroom() {
  const [titleHelper, settitleHelper] = useState(" ");
  const [mxpeopleHelper, setmxpeopleHelper] = useState(" ");
  const [pwHelper, setPwHelper] = useState(" ");

  const [titleValue, settitleValue] = useState("");
  const [mxpeopleValue, setmxpeopleValue] = useState("");
  const [pwValue, setPwValue] = useState("");

  const [roomMode, setroomMode] = useState(false);

  const navigate = useNavigate();

  const attNames = ["title", "maxpeopleNumber"];
  const setter = [settitleHelper, setmxpeopleValue];
  const blankMsg = ["방제목을 입력해주세요", "최대인원 수를 설정해주세요"];

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
    if (roomMode && pwValue === "") {
      setPwHelper("비빌번호를 설정해주세요");
      return;
    }
    if (retErr) {
      return;
    }

    const addRoom = async () => {
      const key = sessionStorage.getItem("AccessToken");
      const userId = sessionStorage.getItem("userId");
      const boxId = sessionStorage.getItem("selected BoxId");
      const storeId = sessionStorage.getItem("selected StoreInfo");
      const url = import.meta.env.VITE_URL_ADDRESS + "/api/rooms";
      const data: forCreateRoom = {
        title: titleValue,
        store_id: Number(storeId),
        box_id: Number(boxId),
        extension_number: 1,
        max_people_number: Number(mxpeopleValue),
        super_user_id: userId,
        locked: roomMode,
        password: pwValue,
      };
      try {
        console.log("asdfasdf", data);
        const response = await axios.post(url, data, {
          headers: {
            Authorization: `Bearer ` + key,
          },
        });
        const roomId = response.data.body.id;
        sessionStorage.setItem("roomTitle", titleValue);
        sessionStorage.setItem("superUser", userId!.toString());
        console.log(response.data.body);
        navigate("/Home/Chatroom/" + roomId);
      } catch (error) {
        console.log(error);
      }
    };
    addRoom();
  };

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
                  label="방제목"
                  variant="standard"
                  name="title"
                  error={titleHelper !== " "}
                  helperText={titleHelper}
                  value={titleValue}
                  required={true}
                  onChange={(e) => {
                    settitleValue(e.target.value);
                  }}
                  onClick={() => {
                    settitleHelper(" ");
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="최대인원"
                  variant="standard"
                  name="maxpeopleNumber"
                  error={mxpeopleHelper !== " "}
                  helperText={mxpeopleHelper}
                  value={mxpeopleValue}
                  required={true}
                  onChange={(e) => {
                    setmxpeopleValue(e.target.value);
                  }}
                  onClick={() => {
                    setmxpeopleHelper(" ");
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="공개여부"
                  value={roomMode ? "비공개" : "공개"}
                >
                  <MenuItem
                    value="비공개"
                    onClick={() => {
                      setroomMode(true);
                    }}
                  >
                    비공개
                  </MenuItem>
                  <MenuItem
                    value="공개"
                    onClick={() => {
                      setroomMode(false);
                      setPwValue("");
                    }}
                  >
                    공개
                  </MenuItem>
                </Select>
              </Grid>
              {roomMode && (
                <Grid item xs={6}>
                  <TextField
                    label="비밀번호 (최대6자리)"
                    variant="standard"
                    name="address"
                    error={pwHelper !== " "}
                    helperText={pwHelper}
                    value={pwValue}
                    onChange={(e) => {
                      if (pwValue.length < 6) setPwValue(e.target.value);
                    }}
                    onClick={() => {
                      setPwHelper(" ");
                    }}
                  />
                </Grid>
              )}
              <Grid item xs={12}>
                <div className="flex items-center justify-center w-full">
                  <Button variant="contained" type="submit" className="text-xs">
                    방만들기
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

export default Addroom;
