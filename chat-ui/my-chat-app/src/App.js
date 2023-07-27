import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ChatRoomList from './components/ChatRoomList';
import ChatRoom from './components/ChatRoom';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ChatRoomList />} />
        <Route path="/chat/:room_id" element={<ChatRoom />} />
      </Routes>
    </Router>
  );
};

export default App;
