import { useState } from "react";
import { Box,TextField  } from "@mui/material";
import Button from '@mui/material/Button';


type propsType = {
  getPassword: (e: number) => void;
  allow:()=>void;
};

function BoxSettings(props: propsType) {
  const [pwValue, setPwValue] = useState<number>(0);

  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: 3,
          padding: 3,
        }}
      ></Box>
      <TextField
          id="standard-password-input"
          label="Password"
          autoComplete="current-password"
          variant="filled"
          onChange={(e) => {
            setPwValue(Number(e.target.value));
          }}
        />
      <Button variant="contained"
        onClick={() => {
          if (pwValue !== null) props.getPassword(pwValue);
        }}
      >
        비밀번호 설정
      </Button>
      <Button variant="contained"
        onClick={() => {
          props.allow();
        }}
      >
        메뉴선택잠그기
      </Button>
    </>
  );
}

export default BoxSettings;
