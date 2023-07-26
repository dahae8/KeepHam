// src/components/Chat.js

import React, { useState, useEffect } from 'react';
import MessageList from './MessageList';
import SendMessageForm from './SendMessageForm';
import NicknameForm from './NicknameForm';
import { initWebSocket, disconnectWebSocket, sendMessage } from '../services/websocket';
import '../App.css';

const Chat = () => {
  const [nickname, setNickname] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    initWebSocket((newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => {
      disconnectWebSocket();
    };
  }, []);

  const handleSendMessage = (content) => {
    if (nickname) {
      const author = nickname;
      const timestamp = new Date().toISOString();
      sendMessage({ author, content, timestamp });
    }
  };

  return (
    <div className="container">
      {nickname ? (
        <div className="chat-box">
          <h1 className="welcome-header">Welcome, {nickname}!</h1>
          <MessageList messages={messages} currentAuthor={nickname} />
          <SendMessageForm onSendMessage={handleSendMessage} />
        </div>
      ) : (
        <NicknameForm onSubmitNickname={setNickname} />
      )}
    </div>
  );
};

export default Chat;
