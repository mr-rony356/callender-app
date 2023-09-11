// Left.js
import React from 'react';

export default class Left extends React.Component {
    state = {
        eventData: this.props.eventData, // Initialize the state with eventData prop
      };

  componentDidMount() {
    // Load data from local storage when the component mounts
    const loadedData = this.loadDataFromLocalStorage();
    this.setState({ eventData: loadedData });
  }

  loadDataFromLocalStorage = () => {
    try {
      // Retrieve data from local storage
      const data = JSON.parse(localStorage.getItem('eventData')) || [];
      return data;
    } catch (error) {
      console.error('Error loading data from local storage:', error);
      return [];
    }
  };

  render() {
    const { eventData } = this.props; // Use eventData from props

    return (
      <div className='demo-app-sidebar'>
        <div className='demo-app-sidebar-section'>
          <div className="left">
            <div className="card">
              {eventData.map((event, index) => (
                <div key={index}>
                  <b>{event.username}</b>
                  <span>{event.startDatetime}</span>
                  <i>{event.title}</i>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* ...other content in your Left component */}
      </div>
    );
  }
}