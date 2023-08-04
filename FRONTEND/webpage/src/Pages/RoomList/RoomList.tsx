import * as React from "react";
import ListIcon from "@mui/icons-material/List";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Box,
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

const drawerWidth = 300;

export async function loader({ params }: LoaderFunctionArgs) {
  const boxId = params.boxId;
  // 서버정보 필요
  const boxName = "다농 오피스텔";
  const boxAddress = "광주 장덕동";
  const boxStatus = "정상";

  return { boxId, boxName, boxAddress, boxStatus };
}

type boxInfoType = {
  boxId: number;
  boxName: string;
  boxAddress: string;
  boxStatus: string;
};

export default function RoomList() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [albumMode, setAlbumMode] = React.useState(false);

  const boxInfo = useLoaderData() as boxInfoType;

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
        <Typography variant="h5">{boxInfo.boxName}</Typography>
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
              <AlbumList boxId={boxInfo.boxId} />
            ) : (
              <TableList boxId={boxInfo.boxId} />
            )}
          </Box>
        </div>
      </div>
    </>
  );
}
