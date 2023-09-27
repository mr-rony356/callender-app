
import React from 'react';
import { formatDate } from '@fullcalendar/core';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { INITIAL_EVENTS, createEventId } from './event-utils';
import Overlay from './Overlay'; // Import the Overlay component
export default class Right extends React.Component {
  
  state = {
    currentEvents: [],
    isOverlayOpen: false,
    selectedCellInfo: null,
    eventData: [], // Store the data from local storage
    collectedTitle: "", // Add a state variable for collected title
    isTitleCollected: true, // Add a flag to track title collection
  };

  componentDidMount() {
    // Load data from local storage when the component mounts
    const loadedData = this.loadDataFromLocalStorage();

    // Create a new array for INITIAL_EVENTS with the loaded data
    const initialEvents = loadedData.map((data) => ({
      id: createEventId(),
      title: data.title,
      start: data.start,
      end: data.end,
    }));

    this.setState({ eventData: loadedData });
    // Set the loaded data as INITIAL_EVENTS
    this.setState({ INITIAL_EVENTS: initialEvents });
  }
  closeOverlay = () => {
    this.setState({ isOverlayOpen: false });
  };

  // Function to handle date selection in the calendar
  // Function to handle date selection in the calendar
  handleDateSelect = (selectInfo, title) => {
    this.setState({
      selectedCellInfo: selectInfo,
      selectedStartTime: selectInfo.startStr,
      selectedEndTime: selectInfo.endStr,
      isOverlayOpen: true,
    });
    if (this.state.isTitleCollected) {
      // Title has been collected, proceed with creating the event
      let calendarApi = selectInfo.view.calendar;

      calendarApi.unselect(); // Clear date selection

      if (title) {
        calendarApi.addEvent({
          id: createEventId(),
          title,
          start: selectInfo.startStr,
          end: selectInfo.endStr,
          allDay: selectInfo.allDay,
        });

        // Save the title to local storage
        this.saveDataToLocalStorage({ title });
      }
    } else {
      // Title has not been collected, do nothing or display a message
      console.log('Title has not been collected. Cannot create an event.');
    }



  };


  // Function to handle confirmation in the overlay and save data
  handleOverlayConfirm = (data) => {
    // Log the collected data
    console.log('Collected Data:', data.title);

    // Calculate the duration between start and end times
    const startTime = new Date(this.state.selectedCellInfo.startStr);
    const endTime = new Date(this.state.selectedCellInfo.endStr);
    const durationInMilliseconds = endTime - startTime; // Duration in milliseconds

    // Calculate duration in hours and minutes
    const durationHours = Math.floor(durationInMilliseconds / (60 * 60 * 1000));
    const durationMinutes = Math.floor((durationInMilliseconds % (60 * 60 * 1000)) / (60 * 1000));

    // Create a formatted duration string (e.g., "2 hours 30 minutes")
    const formattedDuration = `${durationHours} hours ${durationMinutes} minutes`;

    // Create an object to store the event data
    const eventData = {
      id: createEventId(), // Generate a new ID using createEventId      title: data.title,
      start: startTime.toISOString(),
      end: endTime.toISOString(),
      duration: formattedDuration,
    }; console.log(eventData);

    // Save the event data to local storage
    this.saveDataToLocalStorage(eventData);

    this.setState({
      collectedTitle: data.title,
      isTitleCollected: true,
      // Update the flag to indicate title collection
    });

    // Reload data from local storage and update the state
    const loadedData = this.loadDataFromLocalStorage();
    const updatedEventData = [...this.state.eventData, eventData];
    this.setState({ eventData: updatedEventData, isOverlayOpen: false });

    // Call handleDateSelect with the collected title and selectedCellInfo
    this.handleDateSelect(this.state.selectedCellInfo, data.title);
  };

  // Function to save data to local storage
  saveDataToLocalStorage = (data) => {
    try {
      // Retrieve existing data from local storage (if any)
      const existingData = JSON.parse(localStorage.getItem('eventData')) || [];

      // Add the new data to the existing data
      existingData.push(data);
      // Save the updated data back to local storage
      localStorage.setItem('eventData', JSON.stringify(existingData));

      // console.log('Data saved to local storage successfully');
    } catch (error) {
      console.error('Error saving data to local storage:', error);
    }
  };
  handleEventChange = (eventChangeInfo) => {
    // Get the updated event
    const updatedEvent = eventChangeInfo.event;

    // Calculate the updated duration
    const startTime = new Date(updatedEvent.start);
    const endTime = new Date(updatedEvent.end);
    const durationInMilliseconds = endTime - startTime;
    const durationHours = Math.floor(durationInMilliseconds / (60 * 60 * 1000));
    const durationMinutes = Math.floor((durationInMilliseconds % (60 * 60 * 1000)) / (60 * 1000));
    const formattedDuration = `${durationHours} hours ${durationMinutes} minutes`;

    // Find the corresponding event in eventData and update it
    const updatedEventData = this.state.eventData.map((event) => {

      if (event.id === updatedEvent.id) {
        // Update the event's start, end, and duration
        event.title=event.title;
        event.start = updatedEvent.start.toISOString();
        event.end = updatedEvent.end.toISOString();
        event.duration = formattedDuration;
      }
      return event;
    });

    // Update the state with the updated eventData
    this.setState({ eventData: updatedEventData });

    // Update the event in local storage
    this.saveDataToLocalStorage(updatedEvent);

    // Log the updated event
    console.log('Updated Event:', updatedEvent);
 // Format start and end times
 const formattedStartTime = formatDate(updatedEvent.startStr, {
  hour: 'numeric',
  minute: '2-digit',
  meridiem: 'short',
});

const formattedEndTime = formatDate(updatedEvent.endStr, {
  hour: 'numeric',
  minute: '2-digit',
  meridiem: 'short',
});

console.log('Updated Start Time:', formattedStartTime);
console.log('Updated End Time:', formattedEndTime); 
 };
  // Function to load data from local storage
  loadDataFromLocalStorage = () => {
    try {
      const data = JSON.parse(localStorage.getItem('eventData')) || [];

      console.log('Data loaded from local storage:', data);

      return data;
    } catch (error) {
      console.error('Error loading data from local storage:', error);
      return [];
    }
  };

  render() {
    return (
        <div className='demo-app-main'>
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: 'prev',
              center: 'title',
              right: 'next',
            }}
            initialView='timeGridDay'
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            weekends={this.state.weekendsVisible}
            initialEvents={INITIAL_EVENTS}
            select={this.handleDateSelect}
            eventContent={renderEventContent}
            eventClick={this.handleEventClick}
            eventsSet={this.handleEvents}
            eventChange={this.handleEventChange}
          />
          {/* Render the Overlay component */}
          <Overlay
            isOpen={this.state.isOverlayOpen}
            onClose={this.closeOverlay}
            onConfirm={this.handleOverlayConfirm}
            selectedCellInfo={this.state.selectedCellInfo} // Pass the selectedCellInfo
          />
        </div>
    );
  }


  // Function to handle event click and delete
  handleEventClick = (clickInfo) => {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();
    }
  };

  // Function to handle events in the calendar
  handleEvents = (events) => {
    this.setState({
      currentEvents: events,
    });
  };
}

// Function to render custom event content
function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  );
}
