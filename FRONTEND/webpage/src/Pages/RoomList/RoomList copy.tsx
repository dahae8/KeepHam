import * as React from "react";
import ListIcon from "@mui/icons-material/List";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
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
import { LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import TableList from "@/Components/RoomList/TableList.tsx";
import AlbumList from "@/Components/RoomList/AlbumList.tsx";
import { MyLocation } from "@mui/icons-material";
import { useEffect, useState } from "react";
import axios from "axios";

const drawerWidth = 300;

export async function loader({ params }: LoaderFunctionArgs) {
  const areaId = params.areaId;
  // 서버정보 필요
  const boxName = "다농 오피스텔";
  const boxAddress = "광주 장덕동";
  const boxStatus = "정상";

  return { areaId, boxName, boxAddress, boxStatus };
}

export interface Boxes {
  address: string;
  box_id: number;
  detailed_address: string;
  hardness: number;
  latitude: number;
  status: string;
  type: string;
  used: boolean;
  valid: boolean;
  zip_code: string;
}

export interface Rooms {
  created_at: string;
  updated_at: string;
  id: number;
  title: string;
  status: string;
  store_id: number;
  box: Boxes;
  extension_number: number;
  max_people_number: number;
  current_people_number: number;
  super_user_id: string;
  locked: boolean;
}

type boxInfoType = {
  areaId: number;
  boxName: string;
  boxAddress: string;
  boxStatus: string;
};

export default function RoomList() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [albumMode, setAlbumMode] = React.useState(false);
  const boxInfo = useLoaderData() as boxInfoType;
  const [address, setAddress] = React.useState(
    sessionStorage.getItem("userLocation")!
  );
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const drawer = (
    <div>
      <List>
        {["앨범형 보기", "목록형 보기"].map((text, index) => (
          <ListItem
            key={text}
            disablePadding
            onClick={() => {
              if (index === 0) {
                setAlbumMode(true);
              } else {
                setAlbumMode(false);
              }
            }}
          >
            <ListItemButton>
              <ListItemIcon>
                {index === 0 ? <PhotoLibraryIcon /> : <ListIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
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
        sessionStorage.setItem("userLocation", shortName);
        sessionStorage.setItem("userZipCode", zipCode.toString());
      },
    }).open();
  }
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

  const [Rooms, setRooms] = useState<Rooms[]>([]);
  const [Boxes, setBoxes] = useState<Boxes[]>([]);
  const userZipCode = window.sessionStorage.getItem("userZipCode");

  useEffect(() => {
    const fetchBoxes = async () => {
      try {
        const url = "http://i9c104.p.ssafy.io:48080/api/boxs/" + userZipCode;
        const response = await axios.get(url);
        setBoxes(response.data.body);
        console.log(Boxes);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBoxes();
    const fetchRooms = async () => {
      try {
        const url =
          "http://i9c104.p.ssafy.io:48080/api/rooms/zipcode/" +
          userZipCode +
          "?status=OPEN";
        const response = await axios.get(url);
        setRooms(response.data.body);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRooms();
  }, []);

  return (
    <>
      <Box
        sx={{
          padding: { xs: 0, md: 4 },
          minHeight: 650,
          height: "calc(100vh - 320px)",
        }}
      >
        {/* 상단바 */}
        <div className="h-20 w-full flex items-center justify-start">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h5">채팅방 목록</Typography>
        </div>
        <Divider />
        <div className="relative w-full min-h-[540px]" id="drawer-container">
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
                  display: { xs: "block", md: "none" },
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
                  display: { xs: "none", md: "block" },
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
              {albumMode ? (
                <AlbumList areaId={boxInfo.areaId} />
              ) : (
                <TableList areaId={boxInfo.areaId} data={Rooms} />
              )}
            </Box>
          </div>
        </div>
      </Box>
    </>
  );
}
