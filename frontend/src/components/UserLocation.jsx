//import { TextField } from "@mui/material";
import { useState } from "react";
//import React from 'react';
import Button from "@mui/material/Button";

function UserLocation() {

    const [cityInfo, setCityInfo] = useState('');
    const geoApiKey = import.meta.env.VITE_WEATHER_API_KEY;

    const findMyCity = () => {
    
        const success = (position) => {
            console.log(position);
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            const geoApiUrl = `http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=5&appid=${geoApiKey}`

            fetch(geoApiUrl)
            .then(res => res.json())
            .then((data) => {
                console.log(data)
                const cityName = data[0].name || "city not found";
                setCityInfo(cityName)
                console.log(data[0].name)
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        };

        navigator.geolocation.getCurrentPosition(success, (error) => {
            console.error('Error getting geolocation:', error);
        });
    };
    return (
        <div>
            <Button className="find-city" variant="outlined" onClick={findMyCity}>
                Find My City
            </Button>
            <div className="status">
                {cityInfo && (
                    <p>City: {cityInfo}</p>
                )}
            </div>
        </div>
    );
}

export default UserLocation;
// Imported to FrontPage, line 83