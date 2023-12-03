import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { TextField, Select, MenuItem, Button, FormControl, InputLabel } from "@mui/material";
import { useNavigate } from "react-router-dom";


function AddEvent() {
  const navigate = useNavigate();
  const [event, setEvent] = useState({
    eventName: "",
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0],
    description: "",
    price: "",
    streetAddress: "",
    location: {
      locationId: "",
      zipcode: "",
      city: "",
    },
    category: {
      categoryName: "",
      description: "",
    }
  });

  const [locations, setLocations] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {

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
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEvent({
      ...event,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    console.log(event);
    e.preventDefault();

    try {

      const response = await axios.post("http://localhost:8080/events", event);
      console.log("Event saved:", response.data);
      navigate("/myEvents");

    } catch (error) {
      console.error("Error saving event:", error);
    }

  };

  return (
    <div>
      <h2>Add Event</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Event Name"
          type="text"
          name="eventName"
          value={event.eventName}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          inputProps={{
            "data-testid": "event-label"
          }}
        />

        <TextField
          label="Start Date"
          type="date"
          name="startDate"
          value={event.startDate}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          inputProps={{
            "data-testid": "start-date-label"
          }}
        />

        <TextField
          label="End Date"
          type="date"
          name="endDate"
          value={event.endDate}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          inputProps={{
            "data-testid": "end-date-label"
          }}
        />

        <TextField
          label="Description"
          type="text"
          name="description"
          value={event.description}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          inputProps={{
            "data-testid": "description-label"
          }}
        />

        <TextField
          label="Price"
          type="text"
          name="price"
          value={event.price}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          inputProps={{
            "data-testid": "price-label"
          }}
        />

        <TextField
          label="Street Address"
          type="text"
          name="streetAddress"
          value={event.streetAddress}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          inputProps={{
            "data-testid": "street-address-label"
          }}
        />

        <FormControl fullWidth margin="normal">
          <InputLabel>Location</InputLabel>
          <Select
            name="location"
            defaultValue=''
            onChange={handleInputChange}
            inputProps={{
              "data-testid": "location-label"
            }}
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
            inputProps={{
              "data-testid": "category-label"
            }}
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
          Submit
        </Button>
      </form>
    </div>
  );
}

export default AddEvent;
