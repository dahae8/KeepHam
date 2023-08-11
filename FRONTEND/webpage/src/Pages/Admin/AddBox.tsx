// 이름 아이디 비밀번호 닉네임 전화번호
// - 아이디 : 중복확인 , 5~16 자리, 영어+숫자
// - 비밀번호 : 유효성검사(8~16자리, 특수문자, 대문자, 숫자 포함필수)
// - 닉네임 : 3~8 글자, 영어,한글,숫자만 가능

import { TextField, Button, Grid, Box } from "@mui/material";
import { useState } from "react";
import axios from "axios";

function AddBox() {
  const [typeHelper, setTypeHelper] = useState(" ");
  const [addHelper, setAddHelper] = useState(" ");
  const [detailHelper, setDetailHelper] = useState(" ");
  const [zipHelper, setZipHelper] = useState(" ");
  const [latiHelper, setLatiHelper] = useState(" ");
  const [hardHelper, setHardHelper] = useState(" ");

  const [typeValue, setTypeValue] = useState("");
  const [addValue, setAddValue] = useState("");
  const [detailValue, setDetaileValue] = useState("");
  const [zipValue, setZipValue] = useState(" ");
  const [latiValue, setLatiValue] = useState<number>(0);
  const [hardValue, setHardValue] = useState<number>(0);

  const attNames = [
    "type",
    "address",
    "detail",
    "zipcode",
    "latitude",
    "hardness",
  ];
  const setter = [
    setTypeHelper,
    setAddValue,
    setDetaileValue,
    setZipHelper,
    setLatiHelper,
    setHardHelper,
  ];

  const blankMsg = [
    "Type을 입력해주세요",
    "주소를 입력해주세요",
    "상세주소를 입력해주세요",
    "우편번호를 입력해주세요",
    "위도를 입력해주세요",
    "경도를 입력해주세요",
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
    if (typeValue !== ("공용" || "개인")) {
      setTypeHelper("Type은 공용 또는 개인 이어야합니다");
      return;
    }

    const addBox = async () => {
      const url = import.meta.env.VITE_URL_ADDRESS + "/api/admin/boxs";
      const data = {
        type: typeValue,
        address: addValue,
        detailedAddress: detailValue,
        zipCode: zipValue,
        latitude: latiValue,
        hardness: hardValue,
      };
      try {
        const response = await axios.post(url, data);
        console.log("추가여부:", response);
      } catch (error) {
        console.log(error);
      }
    };
    addBox();
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
                  label="Type"
                  variant="standard"
                  name="type"
                  error={typeHelper !== " "}
                  helperText={typeHelper}
                  value={typeValue}
                  onChange={(e) => {
                    setTypeValue(e.target.value);
                  }}
                  onClick={() => {
                    setTypeHelper(" ");
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="주소"
                  variant="standard"
                  name="address"
                  error={addHelper !== " "}
                  helperText={addHelper}
                  value={addValue}
                  onChange={(e) => {
                    setAddValue(e.target.value);
                  }}
                  onClick={() => {
                    setAddHelper(" ");
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="상세주소"
                  variant="standard"
                  name="detail"
                  error={detailHelper !== " "}
                  helperText={detailHelper}
                  value={detailValue}
                  onChange={(e) => {
                    setDetaileValue(e.target.value);
                  }}
                  onClick={() => {
                    setDetailHelper(" ");
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="우편번호"
                  variant="standard"
                  name="zipcode"
                  error={zipHelper !== " "}
                  helperText={zipHelper}
                  value={zipValue}
                  onChange={(e) => {
                    setZipValue(e.target.value);
                  }}
                  onClick={() => {
                    setZipHelper(" ");
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="위도"
                  variant="standard"
                  name="latitude"
                  error={latiHelper !== " "}
                  helperText={latiHelper}
                  value={latiValue}
                  onChange={(e) => {
                    const Lv = e.target.value;
                    if (Lv !== null) setLatiValue(Number(e.target.value));
                  }}
                  onClick={() => {
                    setLatiHelper(" ");
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="경도"
                  variant="standard"
                  name="hardness"
                  error={hardHelper !== " "}
                  helperText={hardHelper}
                  value={hardValue}
                  onChange={(e) => {
                    const Hd = e.target.value;
                    if (Hd !== null) setHardValue(Number(e.target.value));
                  }}
                  onClick={() => {
                    setHardHelper(" ");
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
