// Overlay.js
import React, { useState } from 'react';

export default function Overlay({ isOpen, onClose, onConfirm }) {
  const [username, setUsername] = useState('');
  const [startDatetime, setStartDatetime] = useState('');
  const [duration, setDuration] = useState('');
  const [title, setTitle] = useState('');

  const handleSubmit = () => {
    // Perform validation if needed

    // Call the onConfirm function to pass the collected data
    onConfirm({ username, startDatetime, duration, title });

    // Clear the input fields
    setUsername('');
    setStartDatetime('');
    setDuration('');
    setTitle('');

    // Close the overlay
    onClose();
  };

  return (
    <div className={`overlay ${isOpen ? 'open' : ''}`}>
      <div className="overlay-content">
        <h2>Enter Event Details</h2>
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label>
          UTC Start Datetime:
          <input type="datetime-local" value={startDatetime} onChange={(e) => setStartDatetime(e.target.value)} />
        </label>
        <label>
          Duration (in minutes):
          <input type="number" value={duration} onChange={(e) => setDuration(e.target.value)} />
        </label>
        <label>
          Title:
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>
        <button onClick={handleSubmit}>Confirm</button>
      </div>
    </div>
  );
}
