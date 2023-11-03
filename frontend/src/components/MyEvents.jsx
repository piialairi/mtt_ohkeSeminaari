import { Typography } from '@mui/material';
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Divider from '@mui/material/Divider';
import { Link } from 'react-router-dom';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Avatar from '@mui/material/Avatar';
import IconButton from "@mui/material/IconButton";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


function MyEvents() {
    const [events, setEvents] = useState([]);


  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = () => {
    fetch("http://localhost:8080/events")
      .then((response) => response.json())
      .then((data) => {
        setEvents(data);
      });
    };

    const deleteEvent = async (eventId) => {
        try { 
            await deleteEvent(eventId)
        }
        catch{console.error(`Couldn't delete event id:${eventId}`);}
    }
    
    return (
        <>
            <Typography>My events page, now rendering all events from db</Typography>
            <Box sx={{ marginBottom: 5 }}>

                <Box sx={{ display: 'flex', justifyContent: 'center', padding: 10 }}>
                    <Button          
                        component={Link} to='/addEvent'
                        variant='contained'
                        sx={{ marginRight: 3 }}
                    >Create new event</Button>
                </Box>
            
                <Grid container rowSpacing={5} columnSpacing={5} style={{ display: 'flex', justifyContent: 'center', paddingTop: 10 }}>
                    {events.map((event, index) => {
                        return (
                            <Grid item key={index}>
                                <Card sx={{ width: 400, boxShadow: 5}} >            
                                    <CardContent sx={{ display: 'flex', justifyContent: 'center' }} title={event.startDate}>
                                        <Avatar
                                            sx={{ width: 100, height: 100 }}
                                            alt={event.category.categoryName[0]}
                                            src="/broken-image.jpg"
                                        />
                                    </CardContent>
                                    <Divider variant="fullWidth"></Divider>
                                    <CardHeader
                                        title={event.eventName}    
                                    />
                                    <CardContent>                                
                                        <Typography><b>Starts:</b> {event.startDate} <b>Ends:</b> {event.endDate}</Typography>
                                        <Typography><b>Description:</b> {event.description}</Typography>
                                        <Typography><b>Price</b>: {event.price} €</Typography>
                                        <Typography><b>Location:</b> {event.streetAddress}, {event.location.city} {event.location.zipcode}</Typography>
                                        <Typography><b>Category:</b> {event.category.categoryName}</Typography>
                                    </CardContent>  
                                    <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
                                        <IconButton component={Link} to={'/edit/' + event.eventId + '/'+event.eventName }><EditIcon /></IconButton>
                                        <IconButton onClick={() => deleteEvent(event.eventId)}><DeleteIcon/></IconButton>
                                    </CardActions>
                                </Card>
                            </Grid>
                        )
                    })
                    }
                </Grid>
            </Box>
        </>
    )
}

export default MyEvents;