/* eslint-disable react-hooks/exhaustive-deps */
import {
  FoodBank,
  Group,
  Send,
  ShoppingCart,
  SportsEsports,
} from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  LoaderFunctionArgs,
  useNavigate,
  useLoaderData,
  redirect,
} from "react-router-dom";
import BoxSettings from "@/Components/ChatRoom/BoxSettings.tsx";
import ChatInterface, {
  messageType,
} from "@/Components/ChatRoom/ChatInterface.tsx";
import SelectMenus, { menuInfo } from "@/Components/ChatRoom/SelectMenus.tsx";
import UserSelect from "@/Components/ChatRoom/UserSelect.tsx";
import UserList from "@/Components/ChatRoom/UserList.tsx";
import { Client, Message } from "@stomp/stompjs";
import axios from "axios";


type roomInfoType = {
  boxId: number;
  roomId: number;
  storeId: number;
  roomTitle: string;
  store: string;
  step: number;
  remainTime: string;
  superNick: string;
  address: string;
  maxPeople: number;
};

const key = "Bearer " + sessionStorage.getItem("AccessToken");

export async function loader({ params }: LoaderFunctionArgs) {
  const url =
    import.meta.env.VITE_URL_ADDRESS +
    "/api/rooms/" +
    params.roomId +
    "?status=OPEN";
  try {
    const response = await axios({
      method: "get",
      url: url,
      headers: {
        Authorization: key,
      },
    });

    // console.log(response);

    const info: roomInfoType = {
      boxId: response.data.body.box.box_id,
      roomId: Number(params.roomId),
      storeId: response.data.body.store_id,
      roomTitle: response.data.body.title,
      store: response.data.body.store_name,
      step: response.data.body.step,
      remainTime: response.data.body.closed_at,
      superNick: response.data.body.super_user_id,
      address: response.data.body.box.detailed_address,
      maxPeople: response.data.body.max_people_number,
    };

    return info;
  } catch (error) {
    console.log(error);
    alert("방 정보를 조회할 수 없습니다! ");
    return redirect("/Home/RoomList");
  }
}

interface ChatMessage {
  room_id: number;
  author: string;
  content: string;
  type: string;
  timestamp: string;
  users: Set<string>
}
interface ChatMessage_timestamp {
  room_id: number;
  box_id: number;
  author: string;
  content: string;
  type: string;
}

function ChatRoom() {
  const theme = useTheme();
  const bigSize = useMediaQuery(theme.breakpoints.up("xl"));
  const [navIdx, setNavIdx] = useState(0);
  const [showUsers, setShowUsers] = useState(false);
  const [msgText, setMsgText] = useState("");

  const [messages, setMessages] = useState<messageType[]>([]);

  const [client, setClient] = useState<Client | null>(null);

  // const [inputMessage, setInputMessage] = useState("");
  const [sockmessages, setsockMessages] = useState<ChatMessage[]>([]);
  const [roomPassword, setRoomPw] = useState<number>(-1);
  const [userSet, setUserSet] = useState<Set<string>>(new Set());

  const [storeMenu, setMenu] = useState<menuInfo[]>([]);
  const [open, setOpen] = useState<boolean>(false);

  const roomInfo = useLoaderData() as roomInfoType;

  const roomId = roomInfo.roomId;
  const superUser = roomInfo.superNick;
  const boxId = roomInfo.boxId;
  const storeId = roomInfo.storeId;
  const nname = sessionStorage.getItem("userNick")!.toString();

  const navigate = useNavigate();

  function getPassword(params: number) {
    setRoomPw(params);
  }

  function setCount(id: number, count: number): void {
    const tempMenu: menuInfo[] = storeMenu.map((menu) => {
      if (menu.id == id) menu.count = count;
      return menu;
    });

    setMenu(tempMenu);
  }

  function openBox() {
    setOpen(true);
  }

  function navDisplay() {
    if (navIdx === 1) {
      return (
        <BoxSettings
          getPassword={getPassword}
          roomPw={roomPassword}
          openBox={openBox}
        />
      );
    } else if (navIdx === 2) {
      return (
        <SelectMenus
          menuList={storeMenu}
          setCount={setCount}
          roomId={roomInfo.roomId}
          storeName={roomInfo.store}
          superUser={roomInfo.superNick}
          step={roomInfo.step}
        />
      );
    } else if (navIdx === 3) {
      return <UserSelect roomId={roomId} />;
    } else {
      return <></>;
    }
  }

  const sendHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const message = formData.get("message");

    if (client && message) {
      const chatMessage: ChatMessage_timestamp = {
        room_id: roomId,
        box_id: boxId,
        author: nname,
        content: message.toString(),
        type: "TALK",
      };
      client.publish({
        destination: `/app/sendMessage/${roomId}`, // 채팅 메시지를 처리하는 엔드포인트
        body: JSON.stringify(chatMessage),
      });
      console.log("보낸메시지:", chatMessage);
      setMsgText("");
    }
  };

  function closeRoom() {
    const deleteRoom = async () => {
      const url = import.meta.env.VITE_URL_ADDRESS + "/api/rooms/" + roomId;
      try {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const response = await axios.put(
          url,
          {},
          {
            headers: {
              Authorization: key,
            },
          }
        );
        console.log(response);
        navigate("/Home/RoomList");
      } catch (error) {
        console.log(error);
      }
    };
    deleteRoom();
  }
  function goingOutRoom() {
    if (client) {
      const enterMessage: ChatMessage_timestamp = {
        room_id: roomId,
        box_id: boxId,
        author: nname,
        content: nname + " 님이 퇴장하셧습니다",
        type: "EXIT",
      };
      client.publish({
        destination: `/app/joinUser/${roomId}`,
        body: JSON.stringify(enterMessage),
      });
    }
    navigate("/Home/RoomList");
  }

  // 함 비밀번호 설정시 실행
  useEffect(() => {
    if (client && roomPassword) {
      const chatMessage: ChatMessage_timestamp = {
        room_id: roomId,
        box_id: boxId,
        author: nname,
        content: roomPassword.toString(),
        type: "PASSWORD",
      };

      client.publish({
        destination: `/app/sendMessage/${roomId}`, // 채팅 메시지를 처리하는 엔드포인트
        body: JSON.stringify(chatMessage),
      });
      // console.log("비밀번호:", chatMessage);
      setMsgText("");
    }
  }, [roomPassword]);

  // 함 개방시 실행
  useEffect(() => {
    if (client && open) {
      const chatMessage: ChatMessage_timestamp = {
        room_id: roomId,
        box_id: boxId,
        author: nname,
        content: "",
        type: "OPEN",
      };

      client.publish({
        destination: `/app/sendMessage/${roomId}`, // 채팅 메시지를 처리하는 엔드포인트
        body: JSON.stringify(chatMessage),
      });
      // console.log("함 개방:", chatMessage);
      setMsgText("");
    }
  }, [open]);

  //입장 실행
  useEffect(() => {
    // setNickname();

    // WebSocket 연결 설정
    const newClient = new Client({
      brokerURL: "wss://i9c104.p.ssafy.io/api/my-chat", // WebSocket 서버 주소
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      debug: (str: string) => {
        console.log("디버그 : ", str);
      },
    });

    newClient.onConnect = () => {
      // 특정 채팅방의 메시지를 구독
      newClient.subscribe(
        `/subscribe/message/${roomId}`,
        (message: Message) => {
          const chatMessage: ChatMessage = JSON.parse(message.body);
          // console.log("받은 메시지 : ", chatMessage);
          setUserSet(chatMessage.users);
          setsockMessages((prevMessages) => [...prevMessages, chatMessage]);
        }
      );

      //등장메시지
      const enterMessage: ChatMessage_timestamp = {
        room_id: roomId,
        box_id: boxId,
        author: nname,
        content: nname + " 등장!",
        type: "ENTER",
      };
      newClient.publish({
        destination: `/app/joinUser/${roomId}`,
        body: JSON.stringify(enterMessage),
      });
    };

    const fetchMessages = async () => {
      try {
        const url =
          import.meta.env.VITE_URL_ADDRESS +
          "/api/chat-rooms/" +
          roomId +
          "/messages";
        const response = await axios.get(url);
        setsockMessages(response.data.body);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMessages();

    newClient.activate();
    setClient(newClient);

    //가게메뉴정보 불러오기
    const addRoom = async () => {
      const url = import.meta.env.VITE_URL_ADDRESS + "/api/store/" + storeId;
      try {
        const response = await axios.get(url);
        const tempMenu: menuInfo[] = response.data.data;
        const filteredMenu: menuInfo[] = [];
        const idList: number[] = [];

        tempMenu.forEach((menu) => {
          if (!idList.includes(menu.id)) {
            idList.push(menu.id);
            menu.count = 0;
            filteredMenu.push(menu);
          }
        });

        setMenu(filteredMenu);
        // console.log(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    addRoom();

    return () => {
      if (client) {
        const enterMessage: ChatMessage_timestamp = {
          room_id: roomId,
          box_id: boxId,
          author: nname,
          content: nname + " 님이 퇴장하셧습니다",
          type: "EXIT",
        };
        client.publish({
          destination: `/app/joinUser/${roomId}`,
          body: JSON.stringify(enterMessage),
        });
        // console.log("퇴장!!!");
      }

      newClient.deactivate();
    };
  }, []);

  useEffect(() => {
    // const userId = sessionStorage.getItem("userId");
    const messageFormchange: messageType[] = sockmessages.map((e) => {
      let byMee = true;
      if (e.author !== nname) byMee = false;
      return {
        byMe: byMee,
        sender: e.author,
        message: e.content,
        time: e.timestamp,
      };
    });
    setMessages(messageFormchange);
  }, [sockmessages]);

  const [totalPoint, setTotalPoint] = useState([]);

  useEffect(() => {
    const AccessToken = sessionStorage.getItem("AccessToken");
    console.log("AccessToken", AccessToken);

    const fetchTotalPoint = async () => {
      try {
        const url =
          import.meta.env.VITE_URL_ADDRESS + "/api/payment/totalPoint";
        const response = await axios.post(
          url,
          {},
          {
            headers: {
              Authorization: `Bearer ` + AccessToken,
            },
          }
        );
        // console.log("포인트조회:",response.data.body.totalPoint);

        // console.log("포인트조회2:",response);
        setTotalPoint(response.data.body.totalPoint);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTotalPoint();
    // console.log("totalPoint:", totalPoint);
  }, [totalPoint]);


  // 창 종료 시 퇴장처리
  const handleBeforeUnload = (event: BeforeUnloadEvent) => {
    event.preventDefault();
    event.returnValue = "떠나지마"
    goingOutRoom();
  }

  useEffect(() => {
    window.onpopstate = function(event) {
      if (event) {
        goingOutRoom()
      }
    }
  })

  useEffect(() => {
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);

    }
  }, [handleBeforeUnload])



  return (
    <>
      <Box
        sx={{
          padding: { xs: 0, md: 4 },
          minHeight: 650,
          height: "calc(100vh - 320px)",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            width: "100%",
            minHeight: 100,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              minWidth: 300,
              width: "60%",
              height: 80,
              display: "flex",
              gap: 2,
              margin: 1,
            }}
          >
            <Box component="img" width={80} height={80} src="/shop.png" />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "start",
                width: "calc(100% - 96px)",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "start",
                  alignItems: "center",
                  gap: 4,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  width: "100%",
                }}
              >
                <Typography noWrap>{roomInfo.store}</Typography>
                <Button variant="outlined" size="small" color="gray">
                  변경
                </Button>
              </Box>
              <Box
                sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  width: "100%",
                }}
              >
                <Typography variant="h6" noWrap>
                  {roomInfo.roomTitle}
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              width: "40%",
              height: 80,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              margin: 1,
            }}
          >
            <Box
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                width: "100%",
                display: "flex",
                justifyContent: "end",
              }}
            >
              {nname === superUser && (
                <Button
                  onClick={() => {
                    closeRoom();
                  }}
                >
                  <Typography variant="h6" noWrap>
                    채팅방 종료
                  </Typography>
                </Button>
              )}

              <button
                onClick={() => {
                  goingOutRoom();
                }}
              >
                <Typography variant="h6" noWrap>
                  채팅방 나가기
                </Typography>
              </button>
            </Box>
            <Box
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                width: "100%",
                display: "flex",
                justifyContent: "end",
                gap: 1,
              }}
            >
              <Typography variant="h6" noWrap>
                🕙{roomInfo.remainTime}
              </Typography>
              <Button variant="outlined" size="small" color="gray">
                연장
              </Button>
            </Box>
          </Box>
        </Box>
        {/* Controller */}
        <Box
          overflow={"clip"}
          borderRadius={{ xs: 0, md: 2 }}
          height={"calc(100% - 100px)"}
          sx={{
            minHeight: 450,
          }}
        >
          <Box
            sx={{
              height: 40,
              width: "100%",
              backgroundColor: "#4A4E5A",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                padding: "1px",
                color: "white",
              }}
            >
              <Typography>보유 포인트:{totalPoint}원</Typography>
            </Box>
            <IconButton
              sx={{
                color: "white",
              }}
              onClick={() => {
                showUsers ? setShowUsers(false) : setShowUsers(true);
              }}
            >
              <Group />
            </IconButton>
          </Box>
          {/* Body */}
          <Box
            sx={{
              width: "100%",
              height: "calc(100% - 40px)",
              display: "flex",
              position: "relative",
              justifyContent: "space-between",
            }}
          >
            {/* Nav */}
            <Box
              sx={{
                backgroundColor: "#5B616E",
                width: 80,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "start",
                alignItems: "end",
              }}
            >
              {/* Nav Icons */}
              <Box
                sx={{
                  backgroundColor: navIdx === 1 ? "#8F95A1" : "#5B616E",
                  width: 74,
                  height: 68,
                  marginY: 0.25,
                  display: "flex",
                  justifyContent: "start",
                  alignItems: "center",
                  borderTopLeftRadius: 8,
                  borderBottomLeftRadius: 8,
                }}
              >
                <Box
                  sx={{
                    backgroundColor: "white",
                    width: 50,
                    height: 50,
                    margin: 1,
                    borderRadius: 2,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <IconButton
                    onClick={() => {
                      if (navIdx !== 1) {
                        setNavIdx(1);
                      } else {
                        setNavIdx(0);
                      }
                    }}
                    // size="large"
                  >
                    <FoodBank
                      sx={{
                        width: 40,
                        height: 40,
                      }}
                    />
                  </IconButton>
                </Box>
              </Box>
              <Box
                sx={{
                  backgroundColor: navIdx === 2 ? "#8F95A1" : "#5B616E",
                  width: 74,
                  height: 68,
                  marginY: 0.25,
                  display: "flex",
                  justifyContent: "start",
                  alignItems: "center",
                  borderTopLeftRadius: 8,
                  borderBottomLeftRadius: 8,
                }}
              >
                <Box
                  sx={{
                    backgroundColor: "white",
                    width: 50,
                    height: 50,
                    margin: 1,
                    borderRadius: 2,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <IconButton
                    onClick={() => {
                      if (navIdx !== 2) {
                        setNavIdx(2);
                      } else {
                        setNavIdx(0);
                      }
                    }}
                  >
                    <ShoppingCart
                      sx={{
                        width: 40,
                        height: 40,
                      }}
                    />
                  </IconButton>
                </Box>
              </Box>
              <Box
                sx={{
                  backgroundColor: navIdx === 3 ? "#8F95A1" : "#5B616E",
                  width: 74,
                  height: 68,
                  marginY: 0.25,
                  display: "flex",
                  justifyContent: "start",
                  alignItems: "center",
                  borderTopLeftRadius: 8,
                  borderBottomLeftRadius: 8,
                }}
              >
                <Box
                  sx={{
                    backgroundColor: "white",
                    width: 50,
                    height: 50,
                    margin: 1,
                    borderRadius: 2,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <IconButton
                    onClick={() => {
                      if (navIdx !== 3) {
                        setNavIdx(3);
                      } else {
                        setNavIdx(0);
                      }
                    }}
                  >
                    <SportsEsports
                      sx={{
                        width: 40,
                        height: 40,
                      }}
                    />
                  </IconButton>
                </Box>
              </Box>
            </Box>
            {/* Section 1 */}
            <Box
              sx={{
                display: navIdx !== 0 ? "inline" : "none",
                backgroundColor: "#8F95A1",
                width: 400,
                height: "100%",
                position: "absolute",
                left: 80,
                zIndex: 1,
              }}
            >
              {navDisplay()}
            </Box>
            {/* message */}
            <Box
              sx={{
                backgroundColor: "#EEEEF0",
                width:
                  bigSize && navIdx !== 0
                    ? "calc(100% - 480px)"
                    : "calc(100% - 80px)",
                // width: "calc(100% - 80px)",
                height: "100%",
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  height: "calc(100% - 80px)",
                  overflow: "auto",
                }}
              >
                {
                  <ChatInterface
                    messageList={messages}
                    size={messages.length}
                  />
                }
              </Box>
              {/* Message Input */}
              <form onSubmit={sendHandler}>
                <Box
                  sx={{
                    width: "100%",
                    height: 80,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#F7F8F8",
                    boxShadow: 8,
                  }}
                >
                  <TextField
                    value={msgText}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      setMsgText(event.target.value);
                    }}
                    name="message"
                    sx={{
                      width: "calc(100% - 96px)",
                      height: 72,
                      padding: 1,
                    }}
                  />
                  <Box
                    sx={{
                      borderRadius: 4,
                      width: 80,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "#CCFBF1",
                      marginX: 2,
                      boxShadow: 2,
                    }}
                  >
                    <IconButton type="submit">
                      <Send
                        sx={{
                          width: 40,
                          height: 40,
                        }}
                      />
                    </IconButton>
                  </Box>
                </Box>
              </form>
            </Box>
            {/* User List */}
            <Box
              sx={{
                display: showUsers ? "inline" : "none",
                backgroundColor: "white",
                width: 280,
                height: "80%",
                position: "absolute",
                right: 0,
                borderTopLeftRadius: 8,
                borderBottomLeftRadius: 8,
              }}
            >
              <UserList roomId={roomId} boxId={boxId} userSet={userSet}/>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default ChatRoom;
