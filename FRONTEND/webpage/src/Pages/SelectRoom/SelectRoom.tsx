import * as React from "react";
import ListIcon from "@mui/icons-material/List";
import MapIcon from "@mui/icons-material/Map";
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
import TableList from "@/Components/SelectRoom/TableList.tsx";
import MapList from "@/Components/SelectRoom/MapList.tsx";

const drawerWidth = 300;

export default function SelectRoom() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [mapMode, setMapMode] = React.useState(false);

  const address = sessionStorage.getItem("userLocation")!;

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

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
        <Typography variant="h5">{address}</Typography>
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
            {mapMode ? (
              <MapList location={address} />
            ) : (
              <TableList location={address} />
            )}
          </Box>
        </div>
      </div>
    </>
  );
}
