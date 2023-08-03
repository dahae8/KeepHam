import { Link, Outlet, useNavigate } from "react-router-dom";
import { Tab, Tabs } from "@mui/material";
import React from "react";
import { useAppSelector, useAppDispatch } from "@/Store/hooks.ts";
import { switchTab } from "@/Store/tabSlice.ts";

function User() {
  const currentTab: number = useAppSelector((state) => state.tab.idx);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    dispatch(switchTab({ setIdx: newValue }));

    if (newValue === 0) {
      navigate("/User/LogIn");
    } else if (newValue === 1) {
      navigate("/User/SignUp");
    }
  };

  return (
    <>
      <div className="h-screen w-screen bg-[url('/user_bg.jpg')] bg-cover flex items-center justify-end relative">
        <Link to={"/"}>
          <div className="absolute top-40 left-40 w-[300px]">
            <img src="/logoImageWithText_white.svg" />
          </div>
        </Link>
        <div className="w-[500px] h-[600px] bg-white rounded-[48px] mr-56 drop-shadow-xl py-14 px-28 flex items-center justify-start flex-col">
          <Tabs value={currentTab} onChange={handleChange} className="mb-4">
            <Tab label="로그인" />
            <Tab label="회원가입" />
          </Tabs>
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default User;
