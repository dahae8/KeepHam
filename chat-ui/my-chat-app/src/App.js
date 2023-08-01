// App.js
import React, { useState, useEffect } from 'react';
import ChatRoomList from './components/ChatRoomList';
import ChatRoom from './components/ChatRoom';
import api from './services/api';

const App = () => {
  const [chatRooms, setChatRooms] = useState([]);
  const [currentChatRoom, setCurrentChatRoom] = useState(null);
  const [nickname, setNickname] = useState('');

  // Function to handle entering a chat room
  const handleEnterChatRoom = (roomId, nickname) => {
    setCurrentChatRoom({ roomId, nickname });
  };

  // Function to handle leaving the chat room
  const handleLeaveChatRoom = () => {
    setCurrentChatRoom(null);
  };

  // Function to fetch the list of chat rooms from the server
  const fetchChatRooms = async () => {
    try {
      const response = await api.get('/rooms');
      setChatRooms(response.data.body);
    } catch (error) {
      alert('Error fetching chat rooms.');
    }
  };

  // Fetch chat rooms on component mount
  useEffect(() => {
    fetchChatRooms();
  }, []);

  return (
    <div>
      <h1>Chat Rooms</h1>
      {currentChatRoom ? (
        <div>
          <ChatRoom roomId={currentChatRoom.roomId} nickname={currentChatRoom.nickname} />
          <button onClick={handleLeaveChatRoom}>Leave Chat Room</button>
        </div>
      ) : (
        <ChatRoomList chatRooms={chatRooms} onEnterChatRoom={handleEnterChatRoom} setNickname={setNickname} />
      )}
    </div>
  );
};

export default App;
