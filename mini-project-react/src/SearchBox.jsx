import "./SearchBox.css";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { useState } from "react";

function SearchBox() {
  let [city, setCity] = useState("");

	const API_URL = "https://api.openweathermap.org/data/2.5/weather";
	const API_KEY = "8f0c2d0b88b133607d0963c85db8687b";

	let getWeatherInfo = async () => {
		let response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`)
		let jsonResponse = await response.json();
		let result = {
			cityName: jsonResponse.name,
			temp: jsonResponse.main.temp,
			tempMax: jsonResponse.main.temp_max,
			tempMin: jsonResponse.main.temp_min,
			humidity: jsonResponse.main.humidity,
			feelsLike: jsonResponse.main.feels_like,
			weather: jsonResponse.weather[0].description
		}
		console.log(result);
	};

  let handleChange = (event) => {
    setCity(event.target.value)
  };

	let handleSubmit = (event) =>{
		event.preventDefault();
		setCity("");
		getWeatherInfo();
	}

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
    </div>
  );
}

export default SearchBox;
