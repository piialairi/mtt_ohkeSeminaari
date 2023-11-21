import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import '../app.css';
import { Paper } from "@mui/material";
import axios from "axios";

function EventDetails() {
  const { eventId } = useParams();
  const [event, setEvent] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:8080/events/${eventId}`)
      .then((response) => {
        setEvent(response.data);
        setLoading(false); // Set loading to false when data is available
      })
      .catch((error) => console.error("Error fetching data: ", error));
  }, [eventId]);

  return (
    <div>
      <div className="event-details-container">
        <Paper sx={{ padding: 2, marginBottom: 2, flex: 2, marginRight: 2, }}>
          <Typography variant="h4" sx={{ color: 'black' }}>{event.eventName}</Typography>
        </Paper>
        <div style={{ display: 'flex' }}>
          <Paper sx={{ padding: 2, flex: 2, marginRight: 2, minHeight: '50vh' }}>
            <Typography variant="body1" sx={{ color: 'black' }}>{event.description}</Typography>
          </Paper>
          <Paper sx={{ padding: 2, flex: 1, flexDirection: 'column', display: 'flex', alignItems: 'flex-start', minHeight: '50vh' }}>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <>
                <Typography variant="body1" sx={{ color: 'black' }}>Price: {event.price}€</Typography>
                <Typography variant="body1" sx={{ color: 'black' }}>Start Date: {event.startDate}</Typography>
                <Typography variant="body1" sx={{ color: 'black' }}>End Date: {event.endDate}</Typography>
                <Typography variant="body1" sx={{ color: 'black' }}>Street address: {event.streetAddress}</Typography>
                {event.location && (
                  <Typography variant="body1" sx={{ color: 'black' }}>Location {event.location.city}</Typography>
                )}
                <Typography variant="body1" sx={{ color: 'black' }}>Category: {event.category.categoryName}</Typography>
              </>
            )}
          </Paper>
        </div>
      </div>
    </div>
  );
}

export default EventDetails;
