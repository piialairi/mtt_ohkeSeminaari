import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [events, setEvents] = useState([])

  /* useEffect(() => {
     fetch("./api/hello")
       .then(response => response.text())
       .then(data => setHello(data));
   }, []);*/
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = () => {
    fetch("http://localhost:8080/events")
      .then((response) => response.json())
      .then((data) => setEvents(data));
  };

  /*useEffect(() => {
    fetch("http://localhost:8080/api/events", { mode: "no-cors" })
      .then(response => response.text())
      .then(data => setEvents(data));
  }, []);*/

  return (
    <>
      <header className="header">
        <h1>MTT</h1>
        <button title='Log in'>Log in</button>
      </header>
      <h1 style={{ fontSize: '15px' }}>
        {events.map(event => (
          <div key={event.eventId}>
            <p>Event Name: {event.eventName}</p>
            <p>Start Date: {event.startDate}</p>
            <p>End Date: {event.endDate}</p>
            <p>Description: {event.description}</p>
            <p>Price: ${event.price}</p>
            <p>Street Address: {event.streetAddress}</p>
            <p>Location ID: {event.location.locationId}</p>
            <p>Zipcode: {event.location.zipcode}</p>
            <p>City: {event.location.city}</p>
            <p>Category Name: {event.category.categoryName}</p>
            <p>Category Description: {event.category.description}</p>
            <p>-------------------------------</p>
          </div>
        ))}
      </h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )

}

export default App
