import { Box } from "@mui/material";

export type messageType = {
  byMe: boolean;
  sender: string;
  message: string;
};

type propsType = {
  messageList: messageType[];
  size: number;
};

function ChatInterface(props: propsType) {
  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: 800,
          backgroundColor: "blue",
        }}
      ></Box>
    </>
  );
}

export default ChatInterface;
