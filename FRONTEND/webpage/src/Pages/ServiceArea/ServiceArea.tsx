import * as React from "react";
import ListIcon from "@mui/icons-material/List";
import MapIcon from "@mui/icons-material/Map";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import MapList from "@/Components/SelectBox/MapList.tsx";
// import TableList from "@/Components/SelectBox/TableList.tsx";
import TableList from "@/Components/SelectBox/TableList copy.tsx";
import { MyLocation } from "@mui/icons-material";

const drawerWidth = 300;

export default function ServiceArea() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [mapMode, setMapMode] = React.useState(false);

  const [address, setAddress] = React.useState(
    sessionStorage.getItem("userLocation")!
  );
  const [zipCode, setZipCode] = React.useState(
    Number(sessionStorage.getItem("userZipCode")!)
  );

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  async function addressSearch() {
    const zoneApiPromise = new Promise((resolve) => {
      const script = document.createElement("script");
      script.src =
        "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
      document.head.appendChild(script);
      script.onload = () => {
        resolve("우편번호 서비스 로드 완료!");
      };
    });

    const result = await zoneApiPromise;

    console.log(result);

    new window.daum.Postcode({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      oncomplete: function (data: any) {
        const adr: string = data.jibunAddress;

        const idx: number = adr.indexOf("동 ");

        const shortName: string = adr.substring(0, idx + 1);

        const zipCode: number = data.zonecode;

        setAddress(shortName);
        setZipCode(zipCode);
      },
    }).open();
  }

  const drawer = (
    <div>
      <List>
        {["지도에서 보기", "목록형 보기"].map((text, index) => (
          <ListItem
            key={text}
            disablePadding
            onClick={() => {
              if (index === 0) {
                setMapMode(true);
              } else {
                setMapMode(false);
              }
            }}
          >
            <ListItemButton>
              <ListItemIcon>
                {index === 0 ? <MapIcon /> : <ListIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  const location = (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "end",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: 280,
          height: 80,
          marginBottom: 4,
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Box
          sx={{
            backgroundColor: "#E0F2FE",
            width: 48,
            height: 48,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 3,
            boxShadow: 3,
          }}
        >
          <MyLocation />
        </Box>
        <Typography variant="body1">{address}</Typography>
        <Button variant="outlined" onClick={addressSearch}>
          변경
        </Button>
      </Box>
    </Box>
  );

  return (
    <>
      {/* 상단바 */}
      <div className="h-20 w-full flex items-center justify-start">
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { lg: "none" } }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h5">배달함 서비스 이용가능 지역</Typography>
      </div>
      <Divider />
      <div className="relative w-full min-h-[600px]" id="drawer-container">
        <div className="flex">
          {/* 네비바 */}
          <Box
            component="nav"
            sx={{ width: { lg: drawerWidth }, flexShrink: { md: 0 } }}
            aria-label="mailbox folders"
          >
            <Drawer
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              PaperProps={{ style: { position: "absolute" } }}
              BackdropProps={{ style: { position: "absolute" } }}
              ModalProps={{
                container: document.getElementById("drawer-container"),
                style: { position: "absolute" },
                keepMounted: true,
              }}
              sx={{
                display: { xs: "block", lg: "none" },
                "& .MuiDrawer-paper": {
                  boxSizing: "border-box",
                  width: drawerWidth,
                },
              }}
            >
              {drawer}
              {location}
            </Drawer>
            <Drawer
              variant="permanent"
              PaperProps={{ style: { position: "absolute" } }}
              BackdropProps={{ style: { position: "absolute" } }}
              ModalProps={{
                container: document.getElementById("drawer-container"),
                style: { position: "absolute" },
                keepMounted: true,
              }}
              sx={{
                display: { xs: "none", lg: "block" },
                "& .MuiDrawer-paper": {
                  boxSizing: "border-box",
                  width: drawerWidth,
                },
              }}
              open
            >
              {drawer}
              {location}
            </Drawer>
          </Box>
          {/* 콘텐츠 */}
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              p: 3,
              width: { md: `calc(100% - ${drawerWidth}px)` },
              padding: 3,
            }}
          >
            {mapMode ? (
              <MapList zipCode={zipCode} />
            ) : (
              <TableList zipCode={zipCode} />
            )}
          </Box>
        </div>
      </div>
    </>
  );
}
