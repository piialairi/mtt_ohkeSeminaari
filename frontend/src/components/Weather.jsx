import { useEffect, useState } from "react";
import { IconButton, TextField, Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

function Weather() {
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
  const [cityWeather, setCityWeather] = useState({});
  const [selectedCity, setSelectedCity] = useState("Helsinki");

  const fetchWeatherData = (city, setWeather) => {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?lang=fi&q=${city}&units=metric&APPID=${apiKey}`
    )
      .then((response) => response.json())
      .then((data) => setWeather(data))
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    fetchWeatherData(selectedCity, setCityWeather);
  }, []);

  const renderWeatherInfo = (weather) => {
    if (weather.name) {
      return (
        <Card sx={{ display: "flex" }}>
          <CardMedia
            component="img"
            sx={{ height: 100, width: 100 }}
            image={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="Weather Icon"
          />
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography component="div" variant="h5">
              {weather.name}
            </Typography>
            <Typography component="div" variant="subtitle1">
              {weather.main.temp}&#8451;
            </Typography>
          </CardContent>
        </Card>
      );
    } else {
      return <Typography>Couldn&apos;t retrieve weather</Typography>; //https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-unescaped-entities.md
    }
  };

  return (
    <Box sx={{ ml: 10, mr: 10, mt: 1, mb: 1, backgroundColor: "lightgray" }}>
      <Stack direction="row" spacing={2}>
        <Box>{renderWeatherInfo(cityWeather)}</Box>
        <Box>
          <TextField
            placeholder="Another city"
            value={selectedCity}
            onChange={(event) => setSelectedCity(event.target.value)}
          />
          <IconButton
            aria-label="search"
            size="large"
            onClick={() => fetchWeatherData(selectedCity, setCityWeather)}
          >
            <SearchSharpIcon fontSize="inherit" />
          </IconButton>
        </Box>
      </Stack>
    </Box>
  );
}

export default Weather;
