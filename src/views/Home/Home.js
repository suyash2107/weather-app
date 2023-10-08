import React, { useEffect, useState } from "react";
import axios from 'axios';
import './Home.css';

function Home() {
    const [city, setCity] = useState('pune');
    const [temperature, setTemperature] = useState(0);
    const [message, setMessage] = useState('');

    async function loadWeatherInfo() {
        try {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=7a40ee4e19c67f336205e23c905428ed`);
            const kelvinTemperature = response.data.main.temp;
            const celsiusTemperature = (kelvinTemperature - 273.15).toFixed(2);
            setTemperature(celsiusTemperature);
            setMessage('');
        } catch (error) {
            console.error("Error fetching weather data:", error);
            setMessage('City Not Found');
        }
    }

    useEffect(() => {
        loadWeatherInfo();
    }, [city]); // Re-fetch weather data when the city changes

    return (
        <div>
            <h1 className="app-title">Weather For {city}</h1>
            <input
                className="search-bar"
                type="text"
                placeholder="Enter city..."
                value={city}
                onChange={(e) => {
                    setCity(e.target.value);
                }}
            />
            <p className="message-text">{message}</p>
            <h2 className="temp-text">Temperature: {temperature}°C</h2>
        </div>
    );
}

export default Home;
