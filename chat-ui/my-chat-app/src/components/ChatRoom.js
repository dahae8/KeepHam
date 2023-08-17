import React, { useState, useEffect } from "react";
import Stomp from "stompjs";
import SockJS from "sockjs-client";

const ChatRoom = ({ roomId, nickname }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [stompClient, setStompClient] = useState(null);

  // 메세지 전송 로직
  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    try {
      const message = {
        room_id: roomId,
        author: nickname,
        content: inputMessage,
        type: "TALK",
      };
      stompClient.send(`/app/sendMessage/${roomId}`, {}, JSON.stringify(message));
      setInputMessage("");
    } catch (error) {
      alert("Error sending message.");
    }
  };

  // 웹소켓 연결
  useEffect(() => {
    const socket = new SockJS("http://localhost:8080/api/my-chat");
    const stomp = Stomp.over(socket);
    stomp.connect({}, () => {
      setStompClient(stomp);

      
      const enterMessage = {
        room_id: roomId,
        author: nickname,
        content: nickname + "님이 입장하셨습니다.",
        type: "ENTER",
      };
      stomp.send(`/app/joinUser/${roomId}`, {}, JSON.stringify(enterMessage));

      
      stomp.subscribe(`/subscribe/message/${roomId}`, (message) => {
        const newMessage = JSON.parse(message.body);
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      });
    });
    return () => {
      if (stompClient) {
        stompClient.disconnect();
      }
    };
  }, [roomId, nickname]);

  return (
    <div>
      <h2>Chat Room {roomId}</h2>
      <ul>
        {messages.map((message) => (
          <li key={message.id}>
            {message.author}: {message.content}
          </li>
        ))}
      </ul>
      <input
        type="text"
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
        placeholder="Type your message"
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default ChatRoom;
