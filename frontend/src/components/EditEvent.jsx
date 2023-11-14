import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { TextField, Select, MenuItem, Button, FormControl, InputLabel } from "@mui/material";

function EditEvent() {
    const navigate = useNavigate();
    const { eventId } = useParams();

  const [event, setEvent] = useState({
    eventName: "",
    startDate: "",
    endDate: "",
    description: "",
    price: "",
    streetAddress: "",
    location: {
        locationId: 0, 
        zipcode: "",
        city: "",
      },
      category: {
        categoryName: "",
        description: "",
      },
  });

  const [locations, setLocations] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch event data for editing
    axios.get(`http://localhost:8080/events/${eventId}`)
      .then((response) => {
        const eventData = response.data;

        // Update the event state with the fetched data
        setEvent({
          eventName: eventData.eventName,
          startDate: eventData.startDate,
          endDate: eventData.endDate,
          description: eventData.description,
          price: eventData.price,
          streetAddress: eventData.streetAddress,
          location: eventData.location.locationId, // Assuming you want to set locationId
          category: eventData.category.categoryName, // Assuming you want to set categoryName
        });

      })
      .catch((error) => {
        console.error("Error fetching event data: ", error);
      });

    // Fetch location and category data for dropdowns
    axios.get("http://localhost:8080/locations")
      .then((response) => {
        setLocations(response.data);
      })
      .catch((error) => {
        console.error("Error fetching locations: ", error);
      });

    axios.get("http://localhost:8080/categories")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories: ", error);
      });
  }, [eventId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEvent({
      ...event,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a PUT request to update the event data
      await axios.put(`http://localhost:8080/events/${eventId}`, event);
      console.log("Event updated successfully");
      navigate("/myEvents");
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };

  return (
    <div>
      <h2>Edit Event</h2>
      <form onSubmit={handleSubmit}>
        <TextField
            label="Event Name"
            type="text"
            name="eventName"
            value={event.eventName}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
        />

        <TextField
            label="Start Date"
            type="date"
            name="startDate"
            value={event.startDate}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
        />

        <TextField
            label="End Date"
            type="date"
            name="endDate"
            value={event.endDate}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
        />

        <TextField
            label="Description"
            type="text"
            name="description"
            value={event.description}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
        />

        <TextField
            label="Price"
            type="text"
            name="price"
            value={event.price}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
        />

        <TextField
            label="Street Address"
            type="text"
            name="streetAddress"
            value={event.streetAddress}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
        />

        <FormControl fullWidth margin="normal">
            <InputLabel>Location</InputLabel>
            <Select
                name="location"
                defaultValue=''
                onChange={handleInputChange}
            >
                <MenuItem value="">Select a location</MenuItem>
                {locations.map((location) => (
                <MenuItem key={location.locationId} value={location}>
                    {location.city} {" "}
                    {location.zipcode}
                </MenuItem>
                ))}
            </Select>
            </FormControl>

            <FormControl fullWidth margin="normal">
            <InputLabel>Category</InputLabel>
            <Select
                name="category"
                defaultValue=''
                onChange={handleInputChange}
            >
                <MenuItem value="">Select a category</MenuItem>
                {categories.map((category) => (
                <MenuItem key={category.categoryName} value={category}>
                    {category.categoryName}
                </MenuItem>
                ))}
            </Select>
        </FormControl>

        <Button type="submit" variant="contained" color="primary">
          Update
        </Button>
      </form>
    </div>
  );
}

export default EditEvent;