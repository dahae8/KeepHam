import userSrc from "@/Assets/icons/user.svg";
import {
  Container,
  Box,
  AppBar,
  Typography,
  Toolbar,
  Tooltip,
  Menu,
  MenuItem,
  IconButton,
  Avatar,
} from "@mui/material";
import * as React from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAppSelector, useAppDispatch } from "@/Store/hooks.ts";
import { signIn, signOut } from "@/Store/userSlice.ts";
import { switchTab } from "@/Store/tabSlice.ts";
import { useState, useEffect } from "react";

// const pages = ["서비스 소개", "관리자 페이지"];
const setting1 = [
  "🪪사용자명",
  "🔔알림",
  "📝사용자 정보",
  "🛒포인트내역",
  "🗝️로그아웃",
];

const setting2 = [
  "🪪사용자명",
  "🔔알림",
  "📝사용자 정보",
  "🛒포인트내역",
  "🗝️로그아웃",
  "🛒함 관리",
];

function HeaderCopy() {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const dispatch = useAppDispatch();

  function checkSession() {
    const loginState = sessionStorage.getItem("userState");

    if (loginState === "isLoggedIn") {
      const loginId: string = sessionStorage.getItem("userId")!;

      dispatch(signIn({ id: loginId }));
    }
  }

  checkSession();

  const isLoggedIn: boolean = useAppSelector((state) => state.user.isLoggedIn);

  const navigate = useNavigate();

  const [settings, changeSetting] = useState<string[]>([]);
  const userRole = window.sessionStorage.getItem("userRole");
  useEffect(() => {
    if (userRole === "USER") changeSetting(setting1);
    else changeSetting(setting2);
  }, [userRole]);

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* 로고 */}
          <Link to="/" className="flex flex-row">
            <img src="/logoImage.svg" className="h-24" />
            <img src="/logoText.svg" className="h-24" />
          </Link>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "end",
            }}
          >
            {/* 사용자 아이콘 */}
            {isLoggedIn ? (
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="프로필" src={userSrc} variant="rounded" />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting, idx) => (
                    <MenuItem
                      key={setting}
                      onClick={() => {
                        handleCloseUserMenu();

                        if (idx === 2) {
                          navigate("/Home/UserInfo");
                        }

                        if (idx === 3) {
                          navigate("/Home/Payment");
                        }

                        if (idx === 4) {
                          sessionStorage.setItem("userState", "isLoggedOut");
                          sessionStorage.removeItem("AccessToken");
                          sessionStorage.removeItem("userId");
                          sessionStorage.removeItem("userRole");
                          dispatch(signOut());
                          navigate("/Home/RoomList");
                        }
                        if (idx == 5) {
                          navigate("/Home/Admin");
                        }
                      }}
                    >
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            ) : (
              <>
                <button
                  className="mx-10"
                  onClick={() => {
                    dispatch(switchTab({ setIdx: 0 }));
                    navigate("/Auth");
                  }}
                >
                  <Typography>로그인</Typography>
                </button>
                <button
                  className="mx-10"
                  onClick={() => {
                    dispatch(switchTab({ setIdx: 1 }));
                    navigate("/Auth");
                  }}
                >
                  <Typography>회원가입</Typography>
                </button>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default HeaderCopy;
