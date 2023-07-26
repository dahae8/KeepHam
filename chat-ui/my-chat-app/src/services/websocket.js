// src/services/websocket.js

import Stomp from 'stompjs';
import SockJS from 'sockjs-client';

const WS_URL = 'http://localhost:8080/my-chat'; // WebSocket 서버 주소

let stompClient;

export const initWebSocket = (onMessageReceived) => {
  const socket = new SockJS(WS_URL);

  stompClient = Stomp.over(socket);

  stompClient.connect({}, () => {
    stompClient.subscribe('/topic/group', (message) => {
      const newMessage = JSON.parse(message.body);
      onMessageReceived(newMessage);
    });
  });
};

export const disconnectWebSocket = () => {
  if (stompClient) {
    stompClient.disconnect();
  }
};

export const sendMessage = (message) => {
  if (stompClient && stompClient.connected) {
    stompClient.send('/app/sendMessage', {}, JSON.stringify(message));
  } else {
    console.log('WebSocket not connected yet. Message not sent.');
  }
};
