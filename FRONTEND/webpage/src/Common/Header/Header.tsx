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

// const pages = ["서비스 소개", "관리자 페이지"];
const settings = [
  "🪪사용자명",
  "🔔알림",
  "📝사용자 정보",
  "🛒주문내역",
  "🗝️로그아웃",
];

function Header() {
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
    const loginState = sessionStorage.getItem("loginState");

    if (loginState === "isLoggedIn") {
      const loginId: string = sessionStorage.getItem("loginId")!;

      dispatch(signIn({ id: loginId }));
    }
  }

  checkSession();

  const isLoggedIn: boolean = useAppSelector((state) => state.user.isLoggedIn);

  const navigate = useNavigate();

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

                        if (idx === 4) {
                          sessionStorage.setItem("loginState", "isLoggedOut");
                          dispatch(signOut());
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
                    navigate("User/LogIn");
                  }}
                >
                  <Typography>로그인</Typography>
                </button>
                <button
                  className="mx-10"
                  onClick={() => {
                    dispatch(switchTab({ setIdx: 1 }));
                    navigate("User/SignUp");
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
export default Header;
