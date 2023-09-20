// Sample JSON data

// Left.js Component
import React, { useState, useEffect } from 'react';
import './index.css';

const Left = ({ eventData }) => {
  const [sortedEvents, setSortedEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    const now = new Date();
    const sorted = [...eventData];

    sorted.sort((a, b) => {
      const timeDiffA = Math.abs(new Date(a.startDateTime) - now);
      const timeDiffB = Math.abs(new Date(b.startDateTime) - now);
      return timeDiffA - timeDiffB;
    });

    setSortedEvents(sorted);
    setSelectedEvent(sorted[0] ? sorted[0].type : null);
  }, [eventData]);

  const handleEventClick = (index) => {
    setSelectedEvent(sortedEvents[index].type);
  };

  return (
    <div className="left-panel">
      <div className="event">
        <h2>Event List</h2>
      </div>
      <div className="event-list">
        {eventData.map((event, index) => {
          const startTime = new Date(event.startDateTime);
          const endTime = new Date(startTime.getTime() + parseFloat(event.duration) * 60 * 60 * 1000);
          const formattedStartTime = startTime.toLocaleTimeString([], {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
          });
          const formattedEndTime = endTime.toLocaleTimeString([], {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
          });

          const isSelected = selectedEvent === event.type;
          let borderStyle = '';

          if (index === 0) {
            borderStyle = '10px solid green'; // Closest event
          } else if (index === 1) {
            borderStyle = '10px solid orange'; // Less closest event
          } else {
            borderStyle = '10px solid blue'; // All other events
          }

          return (
            <div
              key={index}
              className={`card ${isSelected ? 'selected' : ''}`}
              style={{ borderLeft: borderStyle }}
              onClick={() => handleEventClick(index)}
            >
              <div className="bd-left">
                <span>{formattedStartTime}</span> - <span> {formattedEndTime}</span>
              </div>
              <span>{event.title}</span> <span> {event.duration} hours</span>
            </div>
          );
        })}
      </div>
      {selectedEvent !== null && (
        <div className="selected-event">
          <h3>{eventData.find((event) => event.type === selectedEvent).title}</h3>
          <p>Start Time: {eventData.find((event) => event.type === selectedEvent).startDateTime}</p>
          <p>Duration: {eventData.find((event) => event.type === selectedEvent).duration} hours</p>
        </div>
      )}
    </div>
  );
};

export default Left;
