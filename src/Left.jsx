import React from 'react';
import './index.css';
import { EVENT_HEIGHT_MULTIPLIER, EVENT_TOP_MULTIPLIER } from './constants'; // Import constants

// Function to categorize events based on duration
const categorizeEvents = (events) => {
  const categories = {
    type1: [],
    type2: [],
    type3: [],
  };
  console.log(categories);

  events.forEach((event) => {
    if (event.type == 1) {
      categories.type1.push(event);
    } else if (event.type ==2) {
      categories.type2.push(event);
    } else if (event.type == 3) {
      categories.type3.push(event);
    }
  });

  return categories;
};

const Left = ({ demoData }) => {
  // Additional events to be added
  const additionalEvents = [
    {
      type: "1",
      category: "Tech",
      startDateTime: "2023-09-12T19:30:00Z",
      duration: '1',
      title: "Tech Seminar",
      meta1: "Location: Virtual",
      meta2: "Speaker: Jane Doe",
    },
    {
      type: "2",
      category: "Design",
      startDateTime: "2023-09-15T19:45:00Z",
      duration: '.75',
      title: "Design Discussion",
      meta1: "Location: Studio Y",
      meta2: "Instructor: John Smith",
    },
  ];

  // Combine existing demoData with additional events
  const allEvents = [...demoData, ...additionalEvents];

  // Sort all events by duration in descending order to find the longest event
  const sortedAllEvents = [...allEvents].sort((a, b) => b.duration - a.duration);
  console.log(sortedAllEvents);

  // Categorize all events based on duration
  const categorizedEvents = categorizeEvents(sortedAllEvents);
  console.log(categorizedEvents);
  const longestEvents = sortedAllEvents.filter((event) => event.duration >= 1);
  return (
    <div className="left-panel">
      {/* Timeline for displaying hours */}
      <div className="timeline">
        {Array.from({ length: 24 }, (_,hour) => (
          <div key={hour} className="timeline-hour">
            {hour < 10 ? `0${hour}:00` : `${hour}:00`}
          </div>
        ))}
      </div>

      {/* Container for events */}
      <div className="events">
        {Object.keys(categorizedEvents).map((category) => (
          <div key={category} className={`event-category event-${category}`}>
            {categorizedEvents[category].map((event) => (
              <div
                key={event.title}
                className={`event ${longestEvents.includes(event) ? 'longest-event' : 'hover'}  event-${category}`} // Add different class names for each event and category
                style={{
                  height: `${event.duration * EVENT_HEIGHT_MULTIPLIER}px`,
                  top: `${(new Date(event.startDateTime).getHours() + new Date(event.startDateTime).getMinutes() / 60) * EVENT_TOP_MULTIPLIER}px`,
                }}
              >
                {/* Display event time */}
                

                <div className="event-time">
                  {longestEvents.includes(event) ? (
                    <p className="event-title">{event.title}</p>

                  ) : null}

                  {longestEvents.includes(event)
                    ? `
                    ${new Date(event.startDateTime).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })} - ${new Date(
                      new Date(event.startDateTime).getTime() + event.duration * 60 * 60 * 1000
                    ).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })} `
                    : (<div className="event-info">

                      <h4 className="event-title">{event.title}</h4>

                      {new Date(event.startDateTime).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })} - {new Date(
                        new Date(event.startDateTime).getTime() + event.duration * 60 * 60 * 1000
                      ).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}


                    </div>)
                  }
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Left;
