// src/components/NicknameForm.js

import React, { useState } from 'react';

const NicknameForm = ({ onSubmitNickname }) => {
  const [nickname, setNickname] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmitNickname(nickname);
  };

  return (
    <div>
      <h1>Enter Your Nickname</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={nickname} onChange={(e) => setNickname(e.target.value)} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default NicknameForm;
