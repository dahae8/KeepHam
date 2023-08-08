import { FoodBank } from "@mui/icons-material";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { useState } from "react";
import { LoaderFunctionArgs, useLoaderData } from "react-router-dom";

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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [navIdx, setNavIdx] = useState(1);

  const roomInfo = useLoaderData() as roomInfoType;

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
        >
          <Box
            sx={{
              height: 40,
              width: "100%",
              backgroundColor: "#4A4E5A",
            }}
          ></Box>
          {/* Body */}
          <Box
            sx={{
              backgroundColor: "lightgrey",
              width: "100%",
              minHeight: 450,
              height: "100%",
              display: "flex",
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
                  }}
                >
                  <IconButton
                    sx={{
                      width: "100%",
                      height: "100%",
                    }}
                  >
                    <FoodBank />
                  </IconButton>
                </Box>
              </Box>
            </Box>
            {/* Section 1 */}
            <Box
              sx={{
                backgroundColor: { xs: "#EEEEF0", md: "#8F95A1" },
                width: { xs: "calc(100% - 80px)", md: 400 },
                height: "100%",
              }}
            ></Box>
            {/* Section 2 */}
            <Box
              sx={{
                display: { xs: "none", md: "inline" },
                backgroundColor: "#EEEEF0",
                width: "calc(100% - 480px)",
                height: "100%",
              }}
            ></Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default ChatRoom;
