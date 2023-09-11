import React from 'react';
import { formatDate } from '@fullcalendar/core';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { INITIAL_EVENTS, createEventId } from './event-utils';
import Left from './Left'; // Import the Left component
import Overlay from './Overlay'; // Import the Overlay component

export default class Right extends React.Component {
  state = {
    weekendsVisible: true,
    currentEvents: [],
    isOverlayOpen: false,
    selectedCellInfo: null,
    eventData: [], // Store the data from local storage
  };

  componentDidMount() {
    // Load data from local storage when the component mounts
    const loadedData = this.loadDataFromLocalStorage();
    this.setState({ eventData: loadedData });
  }

  // Function to handle date selection in the calendar
  handleDateSelect = (selectInfo) => {
    // Log the selected range to the console
    console.log('Selected Range:', selectInfo);

    // Set the selected cell info and open the overlay
    this.setState({
      selectedCellInfo: selectInfo,
      isOverlayOpen: true,
    });
  };

  // Function to close the overlay
  closeOverlay = () => {
    this.setState({ isOverlayOpen: false });
  };

  // Function to handle confirmation in the overlay and save data
  handleOverlayConfirm = (data) => {
    // Log the collected data
    console.log('Collected Data:', data);

    // Save the collected data to local storage
    this.saveDataToLocalStorage(data);

    // Reload data from local storage and update the state
    const loadedData = this.loadDataFromLocalStorage();
    const updatedEventData = [...this.state.eventData, data];
    this.setState({ eventData: updatedEventData, isOverlayOpen: false });
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

      console.log('Data saved to local storage successfully');
    } catch (error) {
      console.error('Error saving data to local storage:', error);
    }
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
    const { eventData } = this.state;
    return (
      <div className='demo-app'>
        {/* Render the Left component */}
        <Left currentEvents={this.state.currentEvents} eventData={this.state.eventData} />
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
          />
          {/* Render the Overlay component */}
          <Overlay
            isOpen={this.state.isOverlayOpen}
            onClose={this.closeOverlay}
            onConfirm={this.handleOverlayConfirm}
          />
        </div>
      </div>
    );
  }

  // Function to toggle weekends visibility
  handleWeekendsToggle = () => {
    this.setState({
      weekendsVisible: !this.state.weekendsVisible,
    });
  };

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
