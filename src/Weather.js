import React, {useState} from 'react';
import axios from 'axios';

function Weather (){
    const [citysearch, setCitySearch] = useState("");
    const [rendered, setRendered] = useState(false);
    const [displayweather, setDisplayWeather] = useState({});
  
    function showWeather(response) {
      setRendered(true);
      setDisplayWeather({
        temperature: response.data.main.temp,
        humidity: response.data.main.humidity,
        wind: response.data.wind.speed,
        description: response.data.weather[0].description,
      });
    }
  
    function handleSubmit(event) {
      event.preventDefault();
      let apiKey = "3bc520cc14bbdedfd7e45158f2ef0439";
      let units = "metric";
      let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${citysearch}&appid=${apiKey}&units=${units}`;
      axios.get(apiUrl).then(showWeather);
    }
  
    function handleSearch(event) {
      setCitySearch(event.target.value);
    }
  
    let form = (
      <div className="Form">
        <h1>Search Engine</h1>
        <h2>Find the weather in your city</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="search"
            placeholder="Search for your city"
            onChange={handleSearch}
          />
          <input type="submit" />
        </form>
      </div>
    );
  
    if (rendered) {
      return (
        <div>
          {form}
          <ul>
            <li>Temperature: {Math.round(displayweather.temperature)} C </li>
            <li>Description: {displayweather.description}</li>
            <li>Humidity: {displayweather.humidity}%</li>
            <li>Wind: {displayweather.wind}km/h</li>
          </ul>
        </div>
      );
    } else {
      return form;
    }
  }
  

export default Weather;