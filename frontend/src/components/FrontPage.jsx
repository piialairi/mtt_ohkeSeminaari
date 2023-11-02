import React, { useState, useEffect } from "react";
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

function FrontPage() {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);

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

  const handleSearch = (searchTerm) => {
    const filtered = events.filter((event) =>
      event.eventName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredEvents(filtered);
  };

  const searchCity = (keyword) => {
    const filtered = events.filter((event) =>
      event.location.city.toLowerCase().includes(keyword.toLowerCase())
    );
    setFilteredEvents(filtered);
  };


  return (
    <Paper sx={{ width: "100%" }}>
      <Weather />
      <Box>
        <TextField
          type="text"
          placeholder="Search by event name"
          onChange={(e) => handleSearch(e.target.value)}
        />
        <TextField
          type="text"
          placeholder="Search by city"
          onChange={(e) => searchCity(e.target.value)}
        />
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
