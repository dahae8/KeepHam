import React, { useEffect, useState } from "react";
import { Client, Message } from "@stomp/stompjs";

interface ChatMessage {
  room_id: number;
  box_id: number;
  author: string;
  content: string;
  type: string;
}

const ChatBox: React.FC = () => {
  const [client, setClient] = useState<Client | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [nname, setNickname] = useState("null");

  const roomID = 1;

  useEffect(() => {
    // WebSocket 연결 설정
    const newClient = new Client({
      brokerURL: "ws://i9c104.p.ssafy.io:48080/api/my-chat", // WebSocket 서버 주소
      debug: (str: string) => {
        console.log("디버그 : ", str);
      },
    });

    newClient.onConnect = () => {
      // 특정 채팅방의 메시지를 구독
      newClient.subscribe(
        `/subscribe/message/${roomID}`,
        (message: Message) => {
          const chatMessage: ChatMessage = JSON.parse(message.body);
          console.log("받은 메시지 : ", chatMessage);
          setMessages((prevMessages) => [...prevMessages, chatMessage]);
        }
      );
    };

    newClient.activate();
    setClient(newClient);

    setNickname(window.sessionStorage.getItem("userId")!.toString());

    return () => {
      newClient.deactivate();
    };
  }, [roomID]);

  const handleSendMessage = () => {
    if (client && inputMessage.trim() !== "") {
      const chatMessage: ChatMessage = {
        room_id: roomID,
        box_id: roomID,
        author: nname,
        content: inputMessage,
        type: "OPEN",
      };

      client.publish({
        destination: `/app/sendMessage/${roomID}`, // 채팅 메시지를 처리하는 엔드포인트
        body: JSON.stringify(chatMessage),
      });
      console.log("보낸메시지:", inputMessage);
      setInputMessage("");
    }
  };

  return (
    <div>
      <div>
        {messages.map((message, index) => (
          <div key={index}>
            <strong>{message.author}:</strong> {message.content}
          </div>
        ))}
      </div>
      <div>
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatBox;
