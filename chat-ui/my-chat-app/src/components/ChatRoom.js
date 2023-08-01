// components/ChatRoom.js
import React, { useState, useEffect } from 'react';
import api from '../services/api';
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';

const ChatRoom = ({ roomId, nickname }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [stompClient, setStompClient] = useState(null); // Declare stompClient in the component's state

  // Function to fetch chat messages for the current chat room
  const fetchMessages = async () => {
    try {
      const response = await api.get(`/chat-rooms/${roomId}/messages`);
      setMessages(response.data.body);
    } catch (error) {
      alert('Error fetching chat messages.');
    }
  };

  // Function to handle sending a new message
  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;
    try {
      const message = {
        room_id: roomId,
        author: nickname,
        content: inputMessage,
        type: 'TALK',
      };
      // Use stompClient.send() to send the chat message
      stompClient.send('/app/sendMessage/' + roomId, {}, JSON.stringify(message));
      setInputMessage('');
    } catch (error) {
      alert('Error sending message.');
    }
  };

  // Subscribe to the chat room WebSocket topic for real-time updates
  useEffect(() => {
    const socket = new SockJS('http://localhost:8080/my-chat');
    const stomp = Stomp.over(socket);
    stomp.connect({}, () => {
      setStompClient(stomp); // Store stompClient in the state
      stomp.subscribe(`/topic/group/${roomId}`, (message) => {
        const newMessage = JSON.parse(message.body);
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      });

      const enterMessage = {
        room_id:roomId,
        author: nickname,
        content: nickname + '님이 입장하셨습니다.',
        type: 'ENTER',
      };
      stomp.send('/app/joinUser/' + roomId, {}, JSON.stringify(enterMessage));
    });

    return () => {
      const exitMessage = {
        room_id:roomId,
        author: nickname,
        content: nickname + '님이 퇴장하셨습니다.',
        type: 'EXIT',
      };
      stomp.send('/app/joinUser/' + roomId, {}, JSON.stringify(exitMessage));
      stomp.disconnect();
    };
  }, [roomId, nickname]);

  // Fetch chat messages on component mount
  useEffect(() => {
    fetchMessages();
  }, [roomId]);

  return (
    <div>
      <h2>Chat Room {roomId}</h2>
      <div className="message-list">
        {messages.map((message) => (
          <div key={message.id} className="message">
            <strong>{message.author}</strong>: {message.content}
          </div>
        ))}
      </div>
      <div className="input-box">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatRoom;
