import { useState } from "react";
import { Box } from "@mui/material";

type propsType = {
  getPassword: (e: number) => void;
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
      <input
        type="text"
        onChange={(e) => {
          setPwValue(Number(e.target.value));
        }}
      ></input>
      <button
        onClick={() => {
          if (pwValue !== null) props.getPassword(pwValue);
        }}
      >
        비밀번호 설정
      </button>
    </>
  );
}

export default BoxSettings;
