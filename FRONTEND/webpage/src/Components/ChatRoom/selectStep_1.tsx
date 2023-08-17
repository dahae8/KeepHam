/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, ReactNode, SyntheticEvent, useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { Box, Button, IconButton, Tab, Tabs } from "@mui/material";
import { AddBox, IndeterminateCheckBox } from "@mui/icons-material";
import axios from "axios";
import { menuInfo, propsType } from "@/Components/ChatRoom/SelectMenus.tsx";
import { Client } from "@stomp/stompjs";

interface TabPanelProps {
  children?: ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Typography component={"div"}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

interface simpleMenuInfo {
  menu: string;
  count: number;
  price: number;
}

interface menuSelection {
  room_id: number;
  store_name: string;
  menus: simpleMenuInfo[];
}

function menuListItems(
  menuArray: menuInfo[],
  userPoint: number,
  selectable: boolean,
  setCount: (id: number, count: number) => void
) {
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
              <IconButton
                disabled={!selectable}
                onClick={() => {
                  if (userPoint > menu.price) setCount(menu.id, menu.count + 1);
                }}
              >
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

              <IconButton
                disabled={!selectable || menu.count == 0}
                onClick={() => {
                  setCount(menu.id, menu.count - 1);
                }}
              >
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

function SelectStep1(props: propsType) {
  const [isInitial, setIsInitial] = useState(true);
  const [tabIdx, setTabIdx] = useState(0);
  const [selected, setSelected] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const [userCnt, setUserCnt] = useState(0);
  const [selectedCnt, setSelectedCnt] = useState(0);

  const userNick = sessionStorage.getItem("userNick")!;
  const superUser = props.superUser;

  const [stompClient, setStompClient] = useState<Client | null>(null);

  const tabHandler = (_event: SyntheticEvent, newTabIdx: number) => {
    setTabIdx(newTabIdx);
  };

  const selectedMenuList: menuInfo[] = props.menuList.filter(
    (menu) => menu.count > 0
  );

  const totalPrice = selectedMenuList.reduce((prev, cur) => {
    return prev + cur.price * cur.count;
  }, 0);

  useEffect(() => {
    const newStompClient = new Client({
      brokerURL: "wss://i9c104.p.ssafy.io/api/my-chat"
    });

    newStompClient.activate();
    console.log("client 연결")
    newStompClient.onConnect = () => {
      newStompClient.subscribe(`/subscribe/users/${props.roomId}`, (message) => {
        setSelectedCnt(Number(message.body))
      })
      newStompClient.subscribe(`/subscribe/step/${props.roomId}` , (message) => {
        props.updatePoint()
        props.setStep(1);
        console.log(message);
      })
    }
    console.log("구독완료")
    setStompClient(newStompClient);

    return () => {
      newStompClient.deactivate();
    }
  }, [selectedCnt])

  function switchSelectButton() {
    if (isInitial) setIsInitial(false);
    // setSelected(!selected);
    setSelected(prevSelected => !prevSelected);
  }

  // useEffect(() => {
  //   if (selected) {
  //     const roomId = props.roomId;
  //     if (stompClient) {
  //       stompClient.publish({
  //         destination: `/app/users/${roomId}`,
  //         body: JSON.stringify({ roomId }),
  //       });
  //     }
  //   }
  // }, [selected, stompClient, props.roomId]);


  function confirmMenuSelection() {
    setConfirmed(true);
  }

  useEffect(() => {
    let users: string[] = [];
    let selectedUsers: string[] = [];

    // 유저목록 불러오기
    const loadState = async () => {
      const roomId = props.roomId;
      const url =
        import.meta.env.VITE_URL_ADDRESS + "/api/rooms/" + roomId + "/users";
      try {
        const response = await axios.get(url);
        users = response.data.body;
      } catch (error) {
        console.log(error);
      }

      setUserCnt(users.length);

      // 선택 유저 목록 불러오기
      const url2 =
        import.meta.env.VITE_URL_ADDRESS +
        "/api/payment/storeMenu/user/" +
        roomId;
      try {
        const response = await axios.get(url2);
        selectedUsers = response.data.body;
      } catch (error) {
        console.log(error);
      }

      console.log(users);
      console.log(selectedUsers);

      if (selectedUsers.includes(userNick)) {
        setSelected(true);
      }

      setSelectedCnt(selectedUsers.length);
    };
    loadState();
  }, []);

  useEffect(() => {
    // 메뉴 선택 완료
    const key = "Bearer " + sessionStorage.getItem("AccessToken");

    const confirmSelected = async () => {
      const simpleMenuList: simpleMenuInfo[] = selectedMenuList.map((menu) => {
        return {
          menu: menu.name,
          count: menu.count,
          price: menu.price,
        };
      });
      const userSelection: menuSelection = {
        room_id: props.roomId,
        store_name: props.storeName,
        menus: simpleMenuList,
      };

      const url =
        import.meta.env.VITE_URL_ADDRESS + "/api/payment/storeMenu/user";
      try {
        const response = await axios({
          method: "post",
          url: url,
          data: userSelection,
          headers: {
            Authorization: key,
          },
        });
        const roomId = props.roomId;
        if (stompClient) {
          console.log("선택완료 메세지ㅣㅣㅣ")
          stompClient.publish({
            destination: `/app/users/${roomId}`,
            body: JSON.stringify({ roomId }),
          });
        }

        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };

    // 메뉴 선택 취소
    const revertSelected = async () => {
      const url =
        import.meta.env.VITE_URL_ADDRESS + "/api/payment/storeMenu/user";
      try {
        const response = await axios({
          method: "delete",
          url: url,
          headers: {
            Authorization: key,
          },
        });
        const roomId = props.roomId;
        if (stompClient) {
          console.log("선택취소 메세지ㅣㅣㅣ")
          stompClient.publish({
            destination: `/app/users/${roomId}`,
            body: JSON.stringify({ roomId }),
          });
        }

        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };

    if (isInitial) return;
    if (selected) confirmSelected();
    else revertSelected();
  }, [isInitial, selected]);

  useEffect(() => {
    // 전체 인원 메뉴 확정
    const key = "Bearer " + sessionStorage.getItem("AccessToken");

    const confirmAll = async () => {
      const roomData = {
        roomId: props.roomId,
        dividedDeliveryfee: 0,
      };

      const url =
        import.meta.env.VITE_URL_ADDRESS + "/api/payment/storeMenu/manger";
      try {
        const response = await axios({
          method: "post",
          url: url,
          data: roomData,
          headers: {
            Authorization: key,
          },
        });

        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };

    const nextStep = async () => {
      const url =
        import.meta.env.VITE_URL_ADDRESS +
        "/api/rooms/" +
        props.roomId.toString() +
        "/1";
      try {
        const response = await axios({
          method: "put",
          url: url,
          headers: {
            Authorization: key,
          },
        });
        const roomId = props.roomId;
        if (stompClient) {
          console.log("주문확정 메세지ㅣㅣㅣ")
          stompClient.publish({
            destination: `/app/step/${roomId}`,
            body: JSON.stringify({ roomId }),
          });
        }        

        console.log(response);
        props.setStep(1);
      } catch (error) {
        console.log(error);
      }
    };

    if (confirmed) {
      confirmAll();
      nextStep();
    }
  }, [confirmed]);

  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "calc(100% - 160px)",
          overflow: "auto",
          backgroundColor: "#D8DADF",
        }}
      >
        <List sx={{ width: "100%" }}>
          <CustomTabPanel value={tabIdx} index={0}>
            {menuListItems(
              props.menuList,
              props.totalPoint,
              !selected,
              props.setCount
            )}
          </CustomTabPanel>
          <CustomTabPanel value={tabIdx} index={1}>
            {menuListItems(
              selectedMenuList,
              props.totalPoint,
              !selected,
              props.setCount
            )}
          </CustomTabPanel>
        </List>
      </Box>

      <Box
        sx={{
          width: "100%",
          height: 160,
          backgroundColor: "#B6BAC3",
          padding: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "start",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Tabs value={tabIdx} onChange={tabHandler}>
          <Tab label="전체 메뉴" id="0" />
          <Tab label="선택한 메뉴" id="1" />
        </Tabs>
        <Box
          sx={{
            width: "60%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "start",
            gap: 1,
          }}
        >
          <Box
            sx={{
              width: "60%",
              overflow: "hidden",
            }}
          >
            <Typography variant="body1">총 금액 : {totalPrice}원</Typography>
          </Box>
          <Button
            variant={!selected ? "contained" : "outlined"}
            onClick={switchSelectButton}
          >
            {!selected ? "선택 확인" : "다시 선택"}
          </Button>
        </Box>

        <Box
          sx={{
            width: "60%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "start",
            gap: 1,
          }}
        >
          <Box
            sx={{
              width: "60%",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="body1">선택완료 / 전체인원</Typography>
            <Typography variant="body1">
              {selectedCnt} / {userCnt}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {userNick === superUser ? (
              <Button
                variant="contained"
                disabled={selectedCnt !== userCnt}
                onClick={confirmMenuSelection}
              >
                주문 확정
              </Button>
            ) : (
              <Box
                sx={{
                  width: 84,
                  height: 40,
                  backgroundColor: "#D8DADF",
                  borderRadius: 1,
                  boxShadow: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography>주문 확정 전</Typography>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default SelectStep1;
