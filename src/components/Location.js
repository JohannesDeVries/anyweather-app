import React, { useState, useEffect } from 'react';
import { FaTrashAlt, FaMapMarkerAlt } from 'react-icons/fa';
import { WiDayRainMix } from 'react-icons/wi';
import SevenDaysForecast from './SevenDayForecast';

import '../styles/location.css';

const Location = (props) => {
  const [temp, setTemp] = useState('');
  const [isLoading, setisLoading] = useState(true);

  const [sevenDayTemp, setSevenDayTemp] = useState([]);

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

  const sevenDayApiCall = () => {
    fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&exclude=current,minutely,hourly,alerts&units=metric&appid=${key}`
    )
      .then((res) => res.json())
      .then((json) => {
        // setIsLoaded(true);
        setSevenDayTemp(json.daily);
        console.log(json.daily);
      });
  };

  return isLoading ? (
    <div className="loading"></div>
  ) : (
    <>
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
          <button onClick={sevenDayApiCall}>7 day forecast</button>
        </div>
        <div className="icon-container">
          <h4 onClick={() => props.flyToLocation(props.location.id)}>
            <FaMapMarkerAlt />
          </h4>
          <h4 onClick={() => props.deleteLocation(props.location.id)}>
            <FaTrashAlt />
          </h4>
        </div>
      </div>
      <SevenDaysForecast
        location={props.location}
        sevenDayTemp={sevenDayTemp}
      />
    </>
  );
};

export default Location;
