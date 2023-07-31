import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ChatRoomList = () => {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([
    { id: 1, name: '채팅방 1' },
    { id: 2, name: '채팅방 2' },
    { id: 3, name: '채팅방 3' },
  ]);
  const [newRoomName, setNewRoomName] = useState('');

  const handleEnterChatRoom = (room_id) => {
    navigate(`/chat/${room_id}`);
  };

  const handleCreateRoom = () => {
    // 임시로 새 채팅방을 생성하여 rooms 상태에 추가
    if (newRoomName) {
      const newRoom = { id: rooms.length + 1, name: newRoomName };
      setRooms([...rooms, newRoom]);
      setNewRoomName('');
    }
  };

  return (
    <div>
      <h2>채팅방 목록</h2>
      <ul>
        {rooms.map((room) => (
          <li key={room.id} onClick={() => handleEnterChatRoom(room.id)}>
            {room.name}
          </li>
        ))}
      </ul>
      <div>
        <input
          type="text"
          value={newRoomName}
          onChange={(e) => setNewRoomName(e.target.value)}
        />
        <button onClick={handleCreateRoom}>채팅방 생성</button>
      </div>
    </div>
  );
};

export default ChatRoomList;
