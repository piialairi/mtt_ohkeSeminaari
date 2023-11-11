import { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { Typography, TextField } from "@mui/material";
import Weather from "./Weather";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

function FrontPage() {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);


  useEffect(() => {
    fetchEvents();
    fetchHelsinkiEventDataFromApi();
    fetchEspooEventDataFromApi();
  }, []);

  const fetchEvents = () => {
    fetch("http://localhost:8080/events")
      .then((response) => response.json())
      .then((data) => {
        if (data && data.length > 0) {
          const dbEvents = data.map((event) => {
            return {
              eventId: event.eventId,
              eventName: event.eventName,
              startDate: event.startDate,
              endDate: event.endDate,
              price:event.price,
              description: event.description,
              location: event.location,
              category: event.category,
            }
          })
          console.log('Events from H2: ', dbEvents);
          setEvents(()=>[...dbEvents]);
          setFilteredEvents(()=>[...dbEvents]); // Aseta suodatetut tapahtumat alkuperäisiksi
        }
        });
  };

  const fetchHelsinkiEventDataFromApi = () => {
    fetch("https://api.hel.fi/linkedevents/v1/event/?start=now&end=today ") //    fetch("https://api.hel.fi/linkedevents/v1/event/?all_ongoing")
      .then((response) => response.json())
      .then((apiData) => {
        if (apiData.data && apiData.data.length > 0) {
          const apiHelsinkiEvents = apiData.data.map((eventData) => {
            return {
              eventName: eventData.name.fi,
              startDate: eventData.start_time,
              endDate: eventData.end_time,
              description: eventData.description.fi,
              location: { city: "Hesa", },  //väliaikainen ratkaisu
              category: {categoryName: "Ei tietoa"} //väliaikainen ratkaisu
          }
          })
          setEvents((prevEvents)=>[...prevEvents, ...apiHelsinkiEvents])
          setFilteredEvents((prevEvents)=>[...prevEvents, ...apiHelsinkiEvents]);
      }
      })
      .catch((error) => {
        console.error('Couldnt fetch data: ', error);
    })
  }

  const fetchEspooEventDataFromApi = () => {
    fetch("http://api.espoo.fi/events/v1/event/")
      .then((response) => response.json())
      .then((apiData) => {
        if (apiData.data && apiData.data.length > 0) {
          const apiEspooEvents = apiData.data.map((eventData) => {
            return {
              eventName: eventData.name.fi,
              startDate: eventData.start_time,
              endDate: eventData.end_time,
              description: eventData.description.fi,
              location: { city: "Espoo", },  //väliaikainen ratkaisu
              category: {categoryName: "Ei tietoa"} //väliaikainen ratkaisu
          }
          })
          setEvents((prevEvents)=>[...prevEvents, ...apiEspooEvents])
          setFilteredEvents((prevEvents)=>[...prevEvents, ...apiEspooEvents]);
      }
      })
      .catch((error) => {
        console.error('Couldnt fetch data: ', error);
    })
  }

  const handleDrawerOpen = () => {
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  const searchByEventName = (keyword) => {
    const filtered = events.filter((event) =>
      event.eventName && event.eventName.toLowerCase().includes(keyword.toLowerCase())
    );
    setFilteredEvents(filtered);
  };

  const searchByCity = (keyword) => {
    const filtered = events.filter((event) =>
      event.location?.city?.toLowerCase().includes(keyword.toLowerCase())
    );
    setFilteredEvents(filtered);
  };

  const searchByCategory = (keyword) => {
    const filtered = events.filter((event) =>
      event.category?.categoryName?.toLowerCase().includes(keyword.toLowerCase())
    );
    setFilteredEvents(filtered);
  };

  const searchByDate = (keyword) => {
    if (!keyword) {
      setFilteredEvents(events); // Näytä kaikki tapahtumat, jos filtteriarvo on tyhjä
    } else {
      const filtered = events.filter((event) => {
        const startDate = new Date(event.startDate); // Olettaen että event.startDate on muotoa "yyyy-MM-dd"
        const searchDate = new Date(keyword); // Olettaen että keyword on muotoa "yyyy-MM-dd"
        return startDate.toISOString().includes(searchDate.toISOString());
      });
      setFilteredEvents(filtered);
    }
  };



  return (
    <Paper sx={{ width: "100%" }}>
      <Weather />
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <TextField
          type="text"
          placeholder="Search by event name"
          onChange={(e) => searchByEventName(e.target.value)}
        />
        <IconButton onClick={handleDrawerOpen}>
          <MenuIcon fontSize="medium" />
        </IconButton>
        <Drawer
          anchor="right"
          open={isDrawerOpen}
          onClose={handleDrawerClose}
        >
          <Box
            sx={{ width: 250 }}
            role="presentation"
          >
            <Typography variant="h6">Filter by:</Typography>
            <TextField
              type="text"
              placeholder="City"
              onChange={(e) => searchByCity(e.target.value)}
            />
            <TextField
              type="text"
              placeholder="Category"
              onChange={(e) => searchByCategory(e.target.value)}
            />
            <TextField
              type="date"
              placeholder="Date"
              onChange={(e) => searchByDate(e.target.value)}
            />
            <Box>
              <IconButton onClick={handleDrawerClose}>
                <CloseIcon fontSize="medium" />
              </IconButton>
            </Box>
          </Box>
        </Drawer>
      </Box>
      <Typography variant="h5">All events</Typography>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>Event name</TableCell>
              <TableCell align="right">Starts</TableCell>
              <TableCell align="right">Ends</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">City</TableCell>
              <TableCell align="right">Category</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredEvents.map((event, index) => (
              <TableRow key={index} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {event.eventName}
                </TableCell>
                <TableCell align="right">{event.startDate}</TableCell>
                <TableCell align="right">{event.endDate}</TableCell>
                <TableCell align="right">{event.price} €</TableCell>
                <TableCell align="right">{event.location?.city||'N/A'}</TableCell>
                <TableCell align="right">{event.category?.categoryName||'N/A'}</TableCell>
                <TableCell align="right">
                  <Link to={`/event/${event.eventId}`}>
                    <button>View Details</button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default FrontPage;
