// src/components/MessageList.js

import React from 'react';

const MessageList = ({ messages, currentAuthor }) => {
  return (
    <div className="message-list">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`message-item ${message.author === currentAuthor ? 'mine' : 'theirs'}`}
        >
          <div className="message-header">
            <strong>{message.author}</strong>
            <span className="timestamp">{formatTimestamp(message.timestamp)}</span>
          </div>
          <div className="message-content">{message.content}</div>
        </div>
      ))}
    </div>
  );
};

export default MessageList;

const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp);
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
};
