import { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { Typography } from "@mui/material";
import Weather from "./Weather";

function FrontPage() {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = () => {
    fetch("http://localhost:8080/events")
      .then((response) => response.json())
      .then((data) => setEvents(data));
  };

  return (
    <Paper sx={{ width: "100%" }}>
      <Weather/>
      <Typography variant="h5">All events</Typography>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>Event name</TableCell>
              <TableCell align="right">starts</TableCell>
              <TableCell align="right">ends</TableCell>
              <TableCell align="right">Description</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Street Address</TableCell>
              <TableCell align="right">Zipcode</TableCell>
              <TableCell align="right">City</TableCell>
              <TableCell align="right">Category</TableCell>
              <TableCell align="right">Category Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {events.map((event, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {event.eventName}
                </TableCell>
                <TableCell align="right">{event.startDate}</TableCell>
                <TableCell align="right">{event.endDate}</TableCell>
                <TableCell align="right">{event.description}</TableCell>
                <TableCell align="right">{event.price} €</TableCell>
                <TableCell align="right">{event.streetAddress}</TableCell>
                <TableCell align="right">{event.location.zipcode}</TableCell>
                <TableCell align="right">{event.location.city}</TableCell>
                <TableCell align="right">{event.category.categoryName}</TableCell>
                <TableCell align="right">{event.category.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default FrontPage;