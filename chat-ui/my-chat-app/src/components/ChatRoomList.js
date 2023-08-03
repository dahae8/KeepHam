import React, { useEffect, useState } from 'react';
import api from '../services/api';
import ChatRoom from './ChatRoom';

const ChatRoomList = ({ token }) => {
  const [rooms, setRooms] = useState([]);
  const [selectedRoomId, setSelectedRoomId] = useState(null); // 선택한 채팅방의 ID를 저장하는 상태 추가
  const [nickname, setNickname] = useState(""); // 사용자의 닉네임을 저장하는 상태 추가

  useEffect(() => {
    const fetchChatRooms = async () => {
      try {
        const response = await api.get('/rooms?status=OPEN', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setRooms(response.data.body);
      } catch (error) {
        console.error('Error fetching chat rooms:', error);
      }
    };
    fetchChatRooms();
  }, [token]);

  const handleRoomClick = async (roomId) => {
    setSelectedRoomId(roomId); // 클릭한 채팅방의 ID를 저장합니다.
    try {
      const response = await api.get(`/${roomId}/enter`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const userNickname = response.data.body.userId;
      setNickname(userNickname); // 사용자의 닉네임을 설정합니다.
    } catch (error) {
      console.error('Error entering chat room:', error);
    }
  };

  return (
    <div>
      {selectedRoomId ? ( // 선택한 채팅방이 있다면 해당 채팅방으로 렌더링
        <ChatRoom roomId={selectedRoomId} nickname={nickname} />
      ) : (
        <div>
          <h1>Chat Room List</h1>
          <ul>
            {rooms.map((room) => (
              <li key={room.id} onClick={() => handleRoomClick(room.id)}> {/* 클릭 이벤트 추가 */}
                {room.title}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ChatRoomList;
