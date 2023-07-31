import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

const ChatRoom = () => {
  const { room_id } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [nickname, setNickname] = useState('');

  // WebSocket 연결 상태를 나타내는 ref 변수
  const socketRef = useRef(null);

  useEffect(() => {
    // WebSocket 연결
    const socket = new SockJS('http://localhost:8080/my-chat');
    const stompClient = Stomp.over(socket);
    stompClient.connect({}, () => {
      // 연결 성공 시
      socketRef.current = stompClient;
      socketRef.current.subscribe(`/topic/group/${room_id}`, (message) => {
        const messageData = JSON.parse(message.body);
        setMessages((prevMessages) => [...prevMessages, messageData]);
      });
      
    });

    // 컴포넌트 언마운트 시 WebSocket 연결 해제
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [room_id]);

  useEffect(() => {
    // 서버로부터 채팅 내용을 가져오는 함수
    const fetchChatMessages = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/chat-rooms/${room_id}/messages`);
        setMessages(response.data);
      } catch (error) {
        console.log('Error fetching chat messages:', error);
      }
    };

    fetchChatMessages();
  }, [room_id]);

  const handleSendMessage = () => {
    if (socketRef.current && newMessage.trim() !== '') {
      // WebSocket을 통해 서버로 메시지를 보내는 함수
      socketRef.current.send(`/app/sendMessage/${room_id}`, {}, JSON.stringify({ room_id, author: nickname, content: newMessage }));
      setNewMessage('');
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div>
      <h2>채팅방 {room_id}</h2>
      <div>
        {messages.map((message) => (
          <div key={message.id}>
            <strong>{message.author}: </strong>
            {message.content}
          </div>
        ))}
      </div>
      <div>
        <input
          type="text"
          placeholder="닉네임을 입력하세요"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
        <input
          type="text"
          placeholder="메시지를 입력하세요"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleKeyPress} // 엔터 키 이벤트 처리
        />
        <button onClick={handleSendMessage}>전송</button>
      </div>
    </div>
  );
};

export default ChatRoom;
