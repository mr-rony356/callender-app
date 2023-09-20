// Overlay.js
import React, { useState } from 'react';

export default function Overlay({ isOpen, onClose, onConfirm }) {
  const [title, setTitle] = useState('');

  const handleSubmit = () => {
    // Perform validation if needed

    // Call the onConfirm function to pass the collected data
    onConfirm({  title });

    setTitle('');

    // Close the overlay
    onClose();
  };

  return (
    <div className={`overlay ${isOpen ? 'open' : ''}`}>
      <div className="overlay-content">
        <label>
          Title:
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>
        <button onClick={handleSubmit}>Confirm</button>
      </div>
    </div>
  );
}
