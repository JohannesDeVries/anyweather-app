import React, { useState, useEffect } from 'react';
import { FaTrashAlt, FaMapMarkerAlt } from 'react-icons/fa';
import { WiDayRainMix } from 'react-icons/wi';

import '../styles/location.css';

const Location = (props) => {
  const [temp, setTemp] = useState('');
  const [isLoading, setisLoading] = useState(true);

  const key = process.env.REACT_APP_WEATHER_API_KEY;
  const lat = props.location.latLng[0];
  const lng = props.location.latLng[1];

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&appid=${key}`
    )
      .then((res) => res.json())
      .then((json) => {
        setTemp(json.main.temp);
        setisLoading(false);
        console.log('update');
      });
  }, [props.locations, lat, lng, key]);

  return isLoading ? (
    <div className="loading"></div>
  ) : (
    <div className="location-container">
      <div className="name-temp-container">
        <h1>{props.location.name}</h1>
        <div className="temp-container">
          <h3>
            <WiDayRainMix />
          </h3>
          <h2>{Math.round(temp)}°C</h2>
        </div>
      </div>
      <div className="days-button-container">
        <button>10 day forecast</button>
      </div>
      <div className="icon-container">
        <h4>
          <FaMapMarkerAlt />
        </h4>
        <h4 onClick={() => props.deleteLocation(props.location.id)}>
          <FaTrashAlt />
        </h4>
      </div>
    </div>
  );
};

export default Location;
