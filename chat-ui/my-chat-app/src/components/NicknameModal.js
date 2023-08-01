import React, { useState } from 'react';

const NicknameModal = ({ show, onClose, onEnterChatRoom }) => {
  const [nickname, setNickname] = useState('');

  const handleNicknameChange = (event) => {
    setNickname(event.target.value);
  };

  const handleEnterChatRoom = () => {
    if (!nickname.trim()) {
      alert('Please enter a nickname.');
      return;
    }
    onEnterChatRoom(nickname);
  };

  if (!show) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Enter Nickname</h2>
        <input type="text" placeholder="Enter your nickname" value={nickname} onChange={handleNicknameChange} />
        <button onClick={handleEnterChatRoom}>Enter Chat Room</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default NicknameModal;
