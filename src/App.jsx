
import React, { useState } from 'react'
import './App.css'

const API_KEY = 'd4aafce71621fd6aee7c4a7b0008d2dc';

export default function App() {
  const [city, setCity] = useState("")
  const [weather, setWeather] = useState(null)
  const [error, setError] = useState("")

  const getweather = async () => {
    if (!city) {
      setError("Please enter a city name")
      return
    }

    try {
      setError("")
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      )

      if (!response.ok) {
        throw new Error("City not found")
      }

      const data = await response.json()
      setWeather(data)
    } catch (err) {
      setWeather(null)
      setError(err.message)
    }
  }

  return (
    <div className="app">
      <h1>Weather App</h1>

      <input
        type="text"
        placeholder="Enter a city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />

      <button type="button" onClick={getweather}>Search</button>

      {error && <p className="error">{error}</p>}

      {weather && (
        <div className="weather-card">
          <h2>{weather.name}</h2>
          <p>Temperature: {weather.main.temp} °C</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Weather: {weather.weather[0].description}</p>
          <p>Wind Speed: {weather.wind.speed} m/s</p>
        </div>
      )}
     <div className='footer'>
        <p>Copyright@Varshika Reddy</p>
    </div>
    </div>
  )
}