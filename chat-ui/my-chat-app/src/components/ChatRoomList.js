// components/ChatRoomList.js
import React from 'react';

const ChatRoomList = ({ chatRooms, onEnterChatRoom, setNickname }) => {

  const handleJoinRoom = (roomId) => {
    const nickname = prompt('Please enter your nickname:');
    if (nickname) {
      setNickname(nickname);
      onEnterChatRoom(roomId, nickname); // Pass roomId and nickname to onEnterChatRoom
    }
  };

  return (
    <div>
      <h2>Available Chat Rooms</h2>
      <ul>
        {chatRooms.map((room) => (
          <li key={room.id}>
            <button onClick={() => handleJoinRoom(room.id)}>Join Room {room.id}</button>
          </li>
        ))}
      </ul>
      
    </div>
  );
};

export default ChatRoomList;
