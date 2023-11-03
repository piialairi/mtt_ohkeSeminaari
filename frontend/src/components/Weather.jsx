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
  const [cityWeather, setCityWeather] = useState(null);
  const [selectedCity, setSelectedCity] = useState("Helsinki");

  const fetchWeatherData = (city, setWeather) => {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?lang=fi&q=${city}&units=metric&APPID=${apiKey}`
    )
      .then((response) => response.json())
      .then((data) => {
        setWeather(data);
        setSelectedCity("Helsinki")
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    fetchWeatherData(selectedCity, setCityWeather);
  }, []);

  const renderWeatherInfo = (weather) => {
    if (weather) {
      return (
        <Card sx={{ display: "flex", p:2  }}>
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
              {weather.main.temp > 0 ? `+${weather.main.temp.toFixed(1)}`:`${weather.main.temp.toFixed(1)}`} &#8451;
            </Typography>
          </CardContent>
        </Card>
      );
    } else {
      return <Typography>Couldn&apos;t retrieve weather</Typography>; //https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-unescaped-entities.md
    }
  };

  return (
    <Box sx={{ display:'flex', justifyContent:'center'}}>
      <Stack backgroundColor="lightgray" p={2} direction="row" spacing={2} m={3}>
        <Box>
          {renderWeatherInfo(cityWeather)}
        </Box>
        <Stack direction='column' spacing={0}>
          <TextField
            label="Another city"
            margin='normal'
            variant='filled'
            value={selectedCity === "Helsinki"?"":selectedCity}
            onChange={(event) => setSelectedCity(event.target.value)}
          />
          <IconButton
            aria-label="search"
            size='large'
            color='primary'
            onClick={() => fetchWeatherData(selectedCity, setCityWeather)}
          >
            <SearchSharpIcon fontSize='inherit' />
          </IconButton>
        </Stack>
      </Stack>
    </Box>
  );
}

export default Weather;
