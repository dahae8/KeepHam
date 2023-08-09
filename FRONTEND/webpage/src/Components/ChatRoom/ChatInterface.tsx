import { Box } from "@mui/material";
import { useEffect, useRef } from "react";

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
  const chatRef = useRef<HTMLElement | null> (null);
  
  useEffect(() => {
    if(chatRef.current) {
      chatRef.current.scrollIntoView(false);
      // console.log(chatRef.current.scrollTop);
    }


    return () => {
      console.log(chatRef.current?.scrollTop);
      
    }
  })

  return (
    <>
      <Box
          ref={chatRef}
          sx={{
          width: "100%",
          height: 800,
          backgroundColor: "blue",

        }}>

        </Box>
    </>
  );
}

export default ChatInterface;
