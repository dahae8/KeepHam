import { Link } from "react-router-dom";
import { Box, Tab, Tabs } from "@mui/material";
import React, { useState } from "react";
import { useAppSelector, useAppDispatch } from "@/Store/hooks.ts";
import { switchTab } from "@/Store/tabSlice.ts";
import LogIn from "@/Components/Auth/LogIn.tsx";
import SignUp from "@/Components/Auth/SignUp.tsx";

function Auth() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const receivedIdx: number = useAppSelector((state) => state.tab.idx);

  if (currentIdx !== receivedIdx) {
    setCurrentIdx(receivedIdx);
  }

  const dispatch = useAppDispatch();

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    dispatch(switchTab({ setIdx: newValue }));
    setCurrentIdx(newValue);
  };

  return (
    <>
      <Box
        component="div"
        sx={{
          height: "100vh",
          minWidth: 480,
          backgroundImage: "url('/user_bg.jpg')",
          backgroundSize: "cover",
          display: "flex",
          flexDirection: "column",
          justifyContent: { xs: "start", sm: "center" },
          alignItems: { xs: "center", sm: "end" },
        }}
      >
        <Link to={"/"}>
          <Box
            sx={{
              backgroundImage: "url('/logoImageWithText_white.svg')",
              backgroundSize: "cover",
              width: 300,
              height: 147,
              position: { xs: "static", sm: "absolute" },
              top: { xs: 0, sm: 80 },
              left: { xs: 0, sm: 160 },
            }}
          ></Box>
        </Link>
        <Box
          sx={{
            width: { xs: "100%", sm: 480 },
            backgroundColor: "white",
            padding: 4,
            marginY: { xs: 0, sm: 8 },
            borderRadius: { xs: 0, sm: 12 },
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
            alignItems: "center",
            boxShadow: 3,
            mr: { xs: 0, sm: 8 },
          }}
        >
          <Tabs
            value={currentIdx}
            onChange={handleChange}
            sx={{
              mb: 4,
            }}
          >
            <Tab label="로그인" />
            <Tab label="회원가입" />
          </Tabs>
          {currentIdx === 0 ? <LogIn /> : <SignUp />}
        </Box>
      </Box>
    </>
  );
}

export default Auth;
