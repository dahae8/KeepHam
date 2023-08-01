// src/components/CreateChatRoomForm.js
import React, { useState } from 'react';
import api from '../services/api';

const CreateChatRoomForm = ({ onRoomCreated }) => {
  const [title, setTitle] = useState('');
  const [maxPeopleNumber, setMaxPeopleNumber] = useState(10);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/rooms/create', {
        title,
        max_people_number:maxPeopleNumber,
      });
      onRoomCreated(response.data.body); // Notify parent component that a new room is created
      setTitle('');
      setMaxPeopleNumber(10);
    } catch (error) {
      alert('Error creating chat room.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      </label>
      <label>
        Max People Number:
        <input
          type="number"
          value={maxPeopleNumber}
          onChange={(e) => setMaxPeopleNumber(parseInt(e.target.value))}
        />
      </label>
      <button type="submit">Create Room</button>
    </form>
  );
};

export default CreateChatRoomForm;
