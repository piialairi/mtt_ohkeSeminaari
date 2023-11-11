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
//import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import UserLocation from "./UserLocation";

function FrontPage() {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);


  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = () => {
    fetch("http://localhost:8080/events")
      .then((response) => response.json())
      .then((data) => {
        setEvents(data);
        setFilteredEvents(data); // Aseta suodatetut tapahtumat alkuperäisiksi
      });
  };
  const handleDrawerOpen = () => {
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  const searchByEventName = (keyword) => {
    const filtered = events.filter((event) =>
      event.eventName.toLowerCase().includes(keyword.toLowerCase())
    );
    setFilteredEvents(filtered);
  };

  const searchByCity = (keyword) => {
    const filtered = events.filter((event) =>
      event.location.city.toLowerCase().includes(keyword.toLowerCase())
    );
    setFilteredEvents(filtered);
  };

  const searchByCategory = (keyword) => {
    const filtered = events.filter((event) =>
      event.category.categoryName.toLowerCase().includes(keyword.toLowerCase())
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
      <UserLocation />
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
              <TableCell align="right">starts</TableCell>
              <TableCell align="right">ends</TableCell>
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
                <TableCell align="right">{event.location.city}</TableCell>
                <TableCell align="right">{event.category.categoryName}</TableCell>
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
