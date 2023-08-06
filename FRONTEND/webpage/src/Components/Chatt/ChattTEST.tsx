import { useState, useEffect } from "react";
import Stomp from "stompjs";
import SockJS from "sockjs-client";

export default function Chattbox() {
  const [publicChats, setPublicChats] = useState<any>([]);
  const [nowMessage, setnowMessage] = useState("");
  const [stompClient, setStompClient] = useState<any>(null);

  const roomId = 1;
  const nickname = "yeon";

  useEffect(() => {
    const socket = new SockJS("http://i9c104.p.ssafy.io:48080/api/my-chat");
    const stomp = Stomp.over(socket);
    setStompClient(stomp);
    stomp.connect({}, () => {
      const enterMessage = {
        room_id: roomId,
        author: nickname,
        content: nickname + "님이 입장하셨습니다.",
        type: "ENTER",
      };
      const url = "/subscribe/message/" + roomId;
      stomp.subscribe(url, onMessageReceived);
      stomp.send(`/app/joinUser/${roomId}`, {}, JSON.stringify(enterMessage));

      console.log("연결성공");
    });
    // return()=>{
    //   stomp.disconnect({},()=>{

    //   });
    // }
  }, []);

  const onMessageReceived = (data: any) => {
    var loaddata = JSON.parse(data.body);
    publicChats.push(loaddata);
    setPublicChats(publicChats);
  };

  const sendMessage = () => {
    // const message = {
    //   room_id: roomId,
    //   author: nickname,
    //   content: nowMessage,
    //   type: "TALK",
    // };
    // stomp.send(`/app/sendMessage/${roomId}`,JSON.stringify(message));
    // setnowMessage("");
    if (!nowMessage.trim()) return;
    try {
      const message = {
        room_id: roomId,
        author: nickname,
        content: nowMessage,
        type: "TALK",
      };
      stompClient.send(`/app/sendMessage/${roomId}`, {}, JSON.stringify(message));
      setnowMessage("");
    } catch (error) {
      alert("Error sending message.");
    }
  };

  return (
    <div>
      <input
        placeholder="채팅을 입력하세요"
        onChange={(e) => {
          setnowMessage(e.target.value);
        }}
        value={nowMessage}
      ></input>
      <button onClick={sendMessage}>입력</button>
    </div>
  );
}
