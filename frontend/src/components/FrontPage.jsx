import { Typography } from '@mui/material';
import { useEffect, useState } from 'react'

function FrontPage() {

    const [events, setEvents] = useState([])
    useEffect(() => {
        fetchEvents();
      }, []);
    
      const fetchEvents = () => {
        fetch("http://localhost:8080/events")
          .then((response) => response.json())
          .then((data) => setEvents(data));
      };
    return (
        <>
            <Typography>All events</Typography>
                
            <h1 style={{ fontSize: '15px' }}>
                {events.map(event => (
                    <div key={event.eventId}>
                        <p>Event Name: {event.eventName}</p>
                        <p>Start Date: {event.startDate}</p>
                        <p>End Date: {event.endDate}</p>
                        <p>Description: {event.description}</p>
                        <p>Price: {event.price}€</p>
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
        </>
    )
}
export default FrontPage;