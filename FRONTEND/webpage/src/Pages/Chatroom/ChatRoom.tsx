import { Typography } from "@mui/material";
import { useState } from "react";
import StoreInfo from "@/Components/Chatt/StoreInfo";
import BoxInfo from "@/Components/Chatt/BoxInfo";
import RoomInfo from "@/Components/Chatt/RoomInfo";
// import ChattingBox from "@/Components/Chatt/Chatt";
import Chattbox from "@/Components/Chatt/ChattTEST.js";

export default function ChatRoom() {
  const [mode, setMode] = useState("함정보");
  let content = null;
  const changeModetoBox = () => {
    setMode("함정보");
  };
  const changeModetoStore = () => {
    setMode("가게정보");
  };
  const changeModetoInfo = () => {
    setMode("채팅방정보");
  };
  if (mode === "가게정보") {
    content = <StoreInfo />;
  } else if (mode === "함정보") {
    content = <BoxInfo />;
  } else if (mode === "채팅방정보") {
    content = <RoomInfo />;
  }

  return (
    <div>
      <Typography variant="h3" gutterBottom>
        채팅방 입장후
      </Typography>
      <div>
        <div>
          정보창
          <ul>
            <li>
              <button onClick={changeModetoBox}>함정보</button>
            </li>
            <li>
              <button onClick={changeModetoStore}>가게,메뉴정보</button>
            </li>
            <li>
              <button onClick={changeModetoInfo}>주문픽업</button>
            </li>
          </ul>
          <div>{content}</div>
        </div>
        <div>
          <Chattbox />
        </div>
      </div>
    </div>
  );
}
