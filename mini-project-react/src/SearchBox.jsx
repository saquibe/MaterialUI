import "./SearchBox.css";
import TextField from "@mui/material/TextField";
import { Button, Card, CardContent, Typography } from "@mui/material";
import { useState } from "react";

function SearchBox() {
  const [city, setCity] = useState("");
  const [weatherInfo, setWeatherInfo] = useState(null);
  const [error, setError] = useState("");

  const API_URL = "https://api.openweathermap.org/data/2.5/weather";
  const API_KEY = "8f0c2d0b88b133607d0963c85db8687b";

  const getWeatherInfo = async () => {
    try {
      let response = await fetch(
        `${API_URL}?q=${city}&appid=${API_KEY}&units=metric`
      );

      if (!response.ok) {
        throw new Error("City not found or API error");
      }

      let jsonResponse = await response.json();
      let result = {
        cityName: jsonResponse.name,
        temp: jsonResponse.main.temp,
        tempMax: jsonResponse.main.temp_max,
        tempMin: jsonResponse.main.temp_min,
        humidity: jsonResponse.main.humidity,
        feelsLike: jsonResponse.main.feels_like,
        weather: jsonResponse.weather[0].description,
      };
      setWeatherInfo(result);
      setError(""); // Clear any previous error
    } catch (error) {
      setWeatherInfo(null); // Clear any previous weather info
      setError(error.message);
    }
  };

  const handleChange = (event) => {
    setCity(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setCity("");
    getWeatherInfo();
  };

  return (
    <div className="SearchBox">
      <h4>Search for the weather</h4>
      <form onSubmit={handleSubmit}>
        <TextField
          id="city"
          label="City Name"
          variant="outlined"
          required
          value={city}
          onChange={handleChange}
        />
        <br />
        <br />
        <Button variant="contained" type="submit">
          Search
        </Button>
      </form>

      {error && (
        <Typography color="error" variant="body2" style={{ marginTop: "10px" }}>
          {error}
        </Typography>
      )}

      {weatherInfo && (
        <Card style={{ marginTop: "20px", padding: "16px", maxWidth: "400px" }}>
          <CardContent>
            <Typography variant="h6">{`Weather in ${weatherInfo.cityName}`}</Typography>
            <Typography variant="body1">{`Temperature: ${weatherInfo.temp} °C`}</Typography>
            <Typography variant="body2">{`Max Temp: ${weatherInfo.tempMax} °C`}</Typography>
            <Typography variant="body2">{`Min Temp: ${weatherInfo.tempMin} °C`}</Typography>
            <Typography variant="body2">{`Feels Like: ${weatherInfo.feelsLike} °C`}</Typography>
            <Typography variant="body2">{`Humidity: ${weatherInfo.humidity}%`}</Typography>
            <Typography variant="body2">{`Description: ${weatherInfo.weather}`}</Typography>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default SearchBox;
