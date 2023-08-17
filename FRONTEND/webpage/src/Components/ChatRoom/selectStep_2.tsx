/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { Box, Button, IconButton } from "@mui/material";
import { AddBox, IndeterminateCheckBox } from "@mui/icons-material";
import axios from "axios";
import { menuInfo, propsType } from "@/Components/ChatRoom/SelectMenus.tsx";

interface simpleMenuInfo {
  menu: string;
  count: number;
  price: number;
}

interface menuSelection {
  room_id: number;
  user_nick_name: string;
  menus: simpleMenuInfo[];
}

interface menuInfoByUsers {
  user: string;
  menuInfo: menuInfo[];
}

function menuListItems(menuArray: menuInfo[]) {
  return menuArray.map((menu) => {
    return (
      <Box key={menu.id}>
        <ListItem alignItems="flex-start">
          <Box
            sx={{
              width: 80,
              height: 80,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "white",
              overflow: "clip",
              borderRadius: 4,
              boxShadow: 1,
            }}
          >
            <Box
              sx={{
                width: 100,
                height: 60,
                backgroundSize: "cover",
                backgroundImage: `url("${menu.image}")`,
              }}
            ></Box>
          </Box>
          <Box
            sx={{
              width: 252,
              overflow: "clip",
              marginX: 1,
            }}
          >
            <ListItemText primary={menu.name} secondary={<>{menu.price}원</>} />
            <Box
              sx={{
                display: "flex",
                justifyContent: "end",
                alignItems: "center",
              }}
            >
              <IconButton>
                <AddBox />
              </IconButton>
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="h6"
                color="text.primary"
              >
                {menu.count}
              </Typography>

              <IconButton>
                <IndeterminateCheckBox />
              </IconButton>
            </Box>
          </Box>
        </ListItem>
        <Divider variant="inset" component="li" />
      </Box>
    );
  });
}

function usersMenuListItems(usersMenuInfo: menuInfoByUsers[]) {
  return usersMenuInfo.map((usersMenu, idx) => {
    return (
      <Box key={idx}>
        <Typography>{usersMenu.user}</Typography>
        {menuListItems(usersMenu.menuInfo)}
        <Divider />
      </Box>
    );
  });
}

function SelectStep2(props: propsType) {
  const [detailMenuList, setDetailMenuList] = useState<menuInfoByUsers[]>([]);
  const [confirm, setConfirm] = useState(false);
  const roomId = props.roomId;

  const userNick = sessionStorage.getItem("userNick")!;

  useEffect(() => {
    // 선택메뉴 불러오기
    const loadSelections = async () => {
      // 선택 유저 목록 불러오기
      const url =
        import.meta.env.VITE_URL_ADDRESS +
        "/api/payment/storeMenu/user/menu/" +
        roomId;
      try {
        const response = await axios.get(url);
        const simpleMenuList: menuSelection[] = response.data.body;

        const tempDetailMenuList: menuInfoByUsers[] = simpleMenuList.map(
          (simpleMenu) => {
            const menuNameList = simpleMenu.menus.map((menu) => menu.menu);

            const filteredDetailMenuList = props.menuList.filter((menu) =>
              menuNameList.includes(menu.name)
            );

            const tempMenuInfo: menuInfo[] = filteredDetailMenuList.map(
              (menu) => {
                const userCount = simpleMenu.menus.filter(
                  (smenu) => menu.name == smenu.menu
                )[0].count;

                const bufMenu: menuInfo = {
                  item: menu.item,
                  store_id: menu.store_id,
                  original_image: menu.original_image,
                  review_count: menu.review_count,
                  subtitle: menu.subtitle,
                  description: menu.description,
                  price: menu.price,
                  slug: menu.slug,
                  image: menu.image,
                  section: menu.section,
                  top_displayed_item_order: menu.top_displayed_item_order,
                  reorder_rate_message: "",
                  menu_set_id: menu.menu_set_id,
                  id: menu.id,
                  name: menu.name,
                  count: userCount,
                };

                return bufMenu;
              }
            );

            return {
              user: simpleMenu.user_nick_name,
              menuInfo: tempMenuInfo,
            };
          }
        );

        setDetailMenuList(tempDetailMenuList);
      } catch (error) {
        console.log(error);
      }
    };
    loadSelections();
  }, []);

  useEffect(() => {
    const key = "Bearer " + sessionStorage.getItem("AccessToken");

    const confirmMenus = async () => {
      const url =
        import.meta.env.VITE_URL_ADDRESS +
        "/api/payment/storeMenu/user/" +
        roomId;
      try {
        const response = await axios({
          method: "post",
          url: url,
          data: {},
          headers: {
            Authorization: key,
          },
        });

        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };
    if (confirm) confirmMenus();
  }, [confirm]);

  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "calc(100% - 80px)",
          overflow: "auto",
          backgroundColor: "#D8DADF",
        }}
      >
        <List sx={{ width: "100%" }}>{usersMenuListItems(detailMenuList)}</List>
      </Box>

      <Box
        sx={{
          width: "100%",
          height: 80,
          backgroundColor: "#B6BAC3",
          padding: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "start",
          alignItems: "center",
          gap: 1,
        }}
      >
        {userNick === props.superUser ? (
          <Typography variant="h6">
            모든 인원이 구매확정을 하면 포인트가 지급됩니다
          </Typography>
        ) : (
          <Button
            variant="contained"
            onClick={() => {
              setConfirm(true);
            }}
          >
            구매확정
          </Button>
        )}
      </Box>
    </>
  );
}

export default SelectStep2;
