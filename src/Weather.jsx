import React, { useState } from "react";
import axios from "axios";
import clear from "./images/Clear-sky.jpeg";
import clouds from "./images/Cloudy.jpeg";
import rain from "./images/Rainy.jpeg";
import snow from "./images/snowy.jpeg";
import defaultImage from "./images/Normal-weather.jpeg";


const Weather = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const getWeatherBackground = () => {
    if (!weatherData || !weatherData.weather || weatherData.weather.length === 0) {
      return defaultImage;
    }
  
    const mainWeather = weatherData.weather[0].main.toLowerCase();
  
    switch (mainWeather) {
      case "clear":
        return clear;
      case "clouds":
        return clouds;
      case "rain":
        return rain;
      case "snow":
        return snow;
      default:
        return defaultImage;
    }
  };
  

  const fetchWeather = async () => {
    if (!city) {
      setError("Please enter a city name.");
      return;
    }
  
    setIsLoading(true); // Start loading
    setError(""); // Clear previous errors
  
    try {
      const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_API_KEY}&units=metric`
      );
  
      if (!response.ok) {
        throw new Error("City not found or API error.");
      }
  
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      setError(error.message); // Show error message
      setWeatherData(null);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };
  {error && <p className="error-message">{error}</p>}


  return (
<div
  className="weather-container"
  style={{
    backgroundImage: `url(${getWeatherBackground()})`,
  }}
>
  <h1>Weather App</h1>
  <input
    type="text"
    placeholder="Enter city name"
    value={city}
    onChange={(e) => setCity(e.target.value)}
  />
  <button onClick={fetchWeather}>Get Weather</button>
  {isLoading && <p>Loading...</p>}
  {error && <p className="error">{error}</p>}
  {weatherData && (
    <div className="weather-data">
      <h2>{weatherData.name}</h2>
      <p>Temperature: {weatherData.main.temp}°C</p>
      <p>Weather: {weatherData.weather[0].description}</p>
      <p>Humidity: {weatherData.main.humidity}%</p>
    </div>
  )}
</div>



  )
  

};



export default Weather;
