import React, { useState } from 'react';
import LoginForm from './components/LoginForm';
import ChatRoomList from './components/ChatRoomList'

const App = () => {
  const [token, setToken] = useState('');

  const handleSetToken = (newToken) => {
    setToken(newToken);
  };

  return (
    <div>
      {token ? (
        <ChatRoomList token={token} />
      ) : (
        <LoginForm onSetToken={handleSetToken} />
      )}
    </div>
  );
};

export default App;
