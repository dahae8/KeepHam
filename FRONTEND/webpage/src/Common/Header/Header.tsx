import userSrc from "@/Assets/icons/user.svg";
import MenuIcon from "@mui/icons-material/Menu";
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
  Button,
  Avatar,
} from "@mui/material";
import * as React from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAppSelector, useAppDispatch } from "@/Store/hooks.ts";
import { signIn, signOut } from "@/Store/userSlice.ts";
import { switchTab } from "@/Store/tabSlice.ts";

const pages = ["서비스 소개", "관리자 페이지"];
const settings = ["🪪사용자명", "🔔알림", "📝사용자 정보", "🛒주문내역", "🗝️로그아웃"];

function Header() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
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
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <Link to="/" className="flex flex-row">
              <img src="/logoImage.svg" className="h-24" />
              <img src="/logoText.svg" className="h-24" />
            </Link>
          </Box>
          {/* 햄버거 메뉴 */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          {/* 중앙 로고 */}
          <Box sx={{ display: { xs: "flex", md: "none" }, flexGrow: 1 }}>
            <Link to="/" className="flex flex-row">
              <img src="/logoImage.svg" className="h-24" />
              <img src="/logoText.svg" className="h-24" />
            </Link>
          </Box>
          {/* 메뉴 */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>

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
                  <MenuItem key={setting} onClick={() => {
                    handleCloseUserMenu()
                    
                    if (idx === 4) {
                      sessionStorage.setItem("loginState", "isLoggedOut");
                      dispatch(signOut());
                    }
                  }}>
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
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
