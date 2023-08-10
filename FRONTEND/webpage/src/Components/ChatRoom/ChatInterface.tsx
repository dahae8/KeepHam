import { Person } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { useEffect, useRef } from "react";

export type messageType = {
  byMe: boolean;
  sender: string;
  message: string;
  time: string;
};

type propsType = {
  messageList: messageType[];
  size: number;
};

function LeftMsg(props: messageType) {
  return (
    <>
      <Box
        sx={{
          width: "calc(100% - 32px)",
          margin: 2,
        }}
      >
        <Box
          sx={{
            width: 380,
            height: 104,
            display: "flex",
            justifyContent: "start",
            alignItems: "start",
          }}
        >
          <Box
            sx={{
              width: 60,
              height: 60,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#D8DADF",
              borderRadius: 4,
            }}
          >
            <Person
              sx={{
                color: "#B6BAC3",
                width: 52,
                height: 52,
              }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
              height: "100%",
            }}
          >
            <Typography
              variant="body1"
              sx={{
                marginLeft: 2,
              }}
            >
              {props.sender}
            </Typography>
            <Box
              sx={{
                width: 280,
                height: 80,
                backgroundImage: "url('/msgLeft.svg')",
                backgroundSize: "cover",
                paddingY: 1,
                paddingLeft: 4,
                paddingRight: 1,
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              <Typography>{props.message}</Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "end",
              height: "100%",
            }}
          >
            <Typography
              variant="body2"
              sx={{
                marginBottom: 1,
                marginLeft: 1,
              }}
            >
              {props.time}
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
}
function RightMsg(props: messageType) {
  return (
    <>
      <Box
        sx={{
          width: "calc(100% - 32px)",
          margin: 2,
          display: "flex",
          justifyContent: "end",
        }}
      >
        <Box
          sx={{
            width: 380,
            height: 104,
            display: "flex",
            justifyContent: "end",
            alignItems: "start",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "end",
              height: "100%",
            }}
          >
            <Typography
              variant="body2"
              sx={{
                marginBottom: 1,
                marginRight: 1,
              }}
            >
              {props.time}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "end",
              height: "100%",
            }}
          >
            <Typography
              variant="body1"
              sx={{
                marginRight: 2,
              }}
            >
              {props.sender}
            </Typography>
            <Box
              sx={{
                width: 280,
                height: 80,
                backgroundImage: "url('/msgRight.svg')",
                backgroundSize: "cover",
                paddingY: 1,
                paddingLeft: 1,
                paddingRight: 4,
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              <Typography>{props.message}</Typography>
            </Box>
          </Box>
          <Box
            sx={{
              width: 60,
              height: 60,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#D8DADF",
              borderRadius: 4,
            }}
          >
            <Person
              sx={{
                color: "#B6BAC3",
                width: 52,
                height: 52,
              }}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
}

function Message(props: messageType) {
  return (
    <>
      {props.byMe ? (
        <RightMsg
          byMe={props.byMe}
          sender={props.sender}
          message={props.message}
          time={props.time}
        />
      ) : (
        <LeftMsg
          byMe={props.byMe}
          sender={props.sender}
          message={props.message}
          time={props.time}
        />
      )}
    </>
  );
}

function ChatInterface(props: propsType) {
  const chatRef = useRef<HTMLElement | null>(null);

  const messageList = props.messageList;

  function Messages() {
    return messageList.map((message, idx) => {
      return (
        <Message
          key={idx}
          byMe={message.byMe}
          sender={message.sender}
          message={message.message}
          time={message.time}
        />
      );
    });
  }

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollIntoView(false);
      // console.log(chatRef.current.scrollTop);
    }
  }, [messageList]);

  return (
    <>
      <Box
        ref={chatRef}
        sx={{
          width: "100%",
          height: messageList.length * 120 + 16,
        }}
      >
        <Messages />
      </Box>
    </>
  );
}

export default ChatInterface;
