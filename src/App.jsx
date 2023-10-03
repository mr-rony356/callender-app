import React from 'react';
import './index.css';
import Left from './Left'; // Import the Left component
import Right from './Right'; // Import the Left component
const demoData = [
 
    {
      type: 3,
      category: "Design",
      startDateTime: "2023-09-15T12:15:00Z",
      duration: " .05 ",
      title: "Design Workshop",
      meta1: "Location: Studio X",
      meta2: "Instructor: Jane Smith",
    },
    {
      type: 1,
      category: "dev",
      startDateTime: "2023-09-15T12:20:00Z",
      duration: "120",
      title: " Workshop",
      meta1: "Location: Studio X",
      meta2: "Instructor: Jane Smith",
    },
    {
      type: 2,
      category: "Tech",
      startDateTime: "2023-09-12T12:00:00Z",
      duration: "45",
      title: "Tech Conference",
      meta1: "Location: Virtual",
      meta2: "Speaker: John Doe",
    },
    {
      type: 3,
      category: "Tech",
      startDateTime: "2023-09-12T14:00:00Z",
      duration: "20",
      title: "Client meeting ",
      meta1: "Location: Virtual",
      meta2: "Speaker: John Doe",
    },
    // Add more events here
  ];
  
const App = () => {
    return (
        <div className='demo-app'>
        <Left demoData={demoData} />
            <Right></Right>

        </div>
    );
  };
  
  export default App;
  