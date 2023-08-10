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
import { useState } from "react";
import { LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import BoxSettings from "@/Components/ChatRoom/BoxSettings.tsx";
import ChatInterface, {
  messageType,
} from "@/Components/ChatRoom/ChatInterface.tsx";
import SelectItems from "@/Components/ChatRoom/SelectItems.tsx";
import UserSelect from "@/Components/ChatRoom/UserSelect.tsx";
import UserList from "@/Components/ChatRoom/UserList.tsx";

type roomInfoType = {
  roomId: number;
  roomTitle: string;
  store: string;
  step: number;
  remainTime: string;
};

export async function loader({ params }: LoaderFunctionArgs) {
  const info: roomInfoType = {
    roomId: Number(params.roomId),
    roomTitle: "커피 마실 사람 구해요!",
    store: "컴포즈커피 수완점",
    step: 1,
    remainTime: "15:00",
  };

  return info;
}

function ChatRoom() {
  const theme = useTheme();
  const bigSize = useMediaQuery(theme.breakpoints.up("xl"));
  const [navIdx, setNavIdx] = useState(1);
  const [showUsers, setShowUsers] = useState(false);
  const [msgText, setMsgText] = useState("");

  const roomInfo = useLoaderData() as roomInfoType;

  const [messages, setMessages] = useState<messageType[]>([]);

  function navDisplay() {
    if (navIdx === 1) {
      return <BoxSettings />;
    } else if (navIdx === 2) {
      return <SelectItems />;
    } else if (navIdx === 3) {
      return <UserSelect />;
    } else {
      return <></>;
    }
  }

  const sendHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const message = formData.get("message");

    const now = new Date();

    if (message) {
      if (message.length > 50) {
        alert("문자열의 길이가 너무 깁니다");
      } else {
        setMessages([
          ...messages,
          {
            byMe: true,
            sender: "나",
            message: message.toString(),
            time: now.getHours().toString() + ":" + now.getMinutes().toString(),
          },
        ]);

        setMsgText("");
      }
    }
  };

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
              <Typography variant="h6" noWrap>
                채팅방 종료
              </Typography>
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
              justifyContent: "end",
              alignItems: "center",
            }}
          >
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
              <UserList />
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default ChatRoom;
