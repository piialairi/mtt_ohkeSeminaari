import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { TextField, Select, MenuItem, Button, FormControl, InputLabel } from "@mui/material";

function EditEvent() {
    const { eventId } = useParams();

  const [event, setEvent] = useState({
    eventName: "",
    startDate: "",
    endDate: "",
    description: "",
    price: "",
    streetAddress: "",
    location: "",
    category: "",
  });

  const [locations, setLocations] = useState([]);
  const [categories, setCategories] = useState([]);
  

  useEffect(() => {
    
    axios.get(`http://localhost:8080/events/${eventId}`)
      .then((response) => {
        const eventData = response.data;

        
        setEvent({
          eventName: eventData.eventName,
          startDate: eventData.startDate,
          endDate: eventData.endDate,
          description: eventData.description,
          price: eventData.price,
          streetAddress: eventData.streetAddress,
          location: eventData.location, 
          category: eventData.category, 
        });
      })
      .catch((error) => {
        console.error("Error fetching event data: ", error);
      });

    
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
      
      await axios.put(`http://localhost:8080/events/${eventId}`, event);
      console.log("Event updated successfully");
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
                value={event.location}
                onChange={handleInputChange}
            >
                <MenuItem value="">Select a location</MenuItem>
                {locations.map((location) => (
                <MenuItem key={location.locationId} value={location}>
                    {location.city} 
                    {location.zipcode}
                </MenuItem>
                ))}
            </Select>
            </FormControl>

            <FormControl fullWidth margin="normal">
            <InputLabel>Category</InputLabel>
            <Select
                name="category"
                value={event.category}
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