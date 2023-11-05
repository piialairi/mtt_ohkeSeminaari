import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import '../app.css';

function EventDetail() {
 const { eventId } = useParams();
 const [event, setEvent] = useState({});
 useEffect(() => {
    fetch(`http://localhost:8080/events/${eventId}`)
      .then((response) => response.json())
      .then((data) => setEvent(data));
  }, [eventId]);

  return (
      
      <div>
        <Typography variant="h4" sx={{ color: 'black' }}>Event Details</Typography>
        <Typography variant="body1" sx={{ color: 'black' }}>{event.eventName}</Typography>
        <Typography variant="body1" sx={{ color: 'black' }}>{event.description}</Typography>
      </div>

  );
}

export default EventDetail;