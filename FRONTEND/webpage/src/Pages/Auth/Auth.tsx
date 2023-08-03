import { Link } from "react-router-dom";
import { Box, Tab, Tabs } from "@mui/material";
import React, { useState } from "react";
import { useAppSelector, useAppDispatch } from "@/Store/hooks.ts";
import { switchTab } from "@/Store/tabSlice.ts";
import LogIn from "@/Components/User/LogIn.tsx";
import SignUp from "@/Components/User/SignUp.tsx";

function Auth() {
  const [currentIdx, setCurrentIdx ] = useState(0);
  const receivedIdx: number = useAppSelector((state) => state.tab.idx);

  if(currentIdx !== receivedIdx)
  {
    setCurrentIdx(receivedIdx)
  }

  const dispatch = useAppDispatch();

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    dispatch(switchTab({ setIdx: newValue }));
    setCurrentIdx(newValue)
  };

  return (
    <>
      <div className="h-screen w-screen bg-[url('/user_bg.jpg')] bg-cover flex items-center justify-end relative">
        <Link to={"/"}>
          <div className="absolute top-20 left-40 w-[300px]">
            <img src="/logoImageWithText_white.svg" />
          </div>
        </Link>
        <Box
          sx={{
            width: { xs: "100%", sm: 500 },
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
          <Tabs value={currentIdx} onChange={handleChange} sx={{
            mb: 4,
          }}>
            <Tab label="로그인" />
            <Tab label="회원가입" />
          </Tabs>
          {currentIdx === 0 ? (<LogIn />) : (<SignUp />)}
        </Box>
      </div>
    </>
  );
}

export default Auth;
