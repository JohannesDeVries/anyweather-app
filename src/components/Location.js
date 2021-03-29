import React, { useState, useEffect } from 'react';
import { FaTrashAlt, FaMapMarkerAlt } from 'react-icons/fa';
import SevenDaysForecast from './SevenDayForecast';
import '../styles/location.css';

const Location = (props) => {
  const [temp, setTemp] = useState();
  const [icon, setIcon] = useState();
  const [isLoading, setisLoading] = useState(true);

  const [showForecastComponent, setShowForecastComponent] = useState(false);

  const [sevenDayTemp, setSevenDayTemp] = useState([]);
  const [isLoadingForecast, setIsLoadingForecast] = useState(true);

  const key = process.env.REACT_APP_WEATHER_API_KEY;
  const lat = props.location.latLng[0];
  const lng = props.location.latLng[1];

  // .replace(/\s\s+/g, '');

  // Current Weather API call and getting weather icon.
  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&appid=${key}`
    )
      .then((res) => res.json())
      .then((json) => {
        setTemp(json.main.temp);
        setIcon(`http://openweathermap.org/img/wn/${json.weather[0].icon}.png`);
        setisLoading(false);
      });
  }, [props.locations, lat, lng, key]);

  // 7 Day forecast API call
  const sevenDayApiCall = () => {
    setShowForecastComponent(!showForecastComponent);
    fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&exclude=current,minutely,hourly,alerts&units=metric&appid=${key}`
    )
      .then((res) => res.json())
      .then((json) => {
        setSevenDayTemp(json.daily);
        setIsLoadingForecast(false);
      });
  };

  // Wait for API call to complete and then display info.
  return isLoading ? (
    <div className="loading"></div>
  ) : (
    <>
      <div className="location-container">
        <div className="name-temp-container">
          <h5>{props.location.name}</h5>
          <div className="temp-container">
            <img src={icon} alt="icon" />
            <h2>{Math.round(temp)}°C</h2>
          </div>
        </div>
        <div className="days-button-container">
          <button onClick={sevenDayApiCall}>
            {showForecastComponent ? 'Close' : '7 day forecast'}
          </button>
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
      {showForecastComponent && (
        <SevenDaysForecast
          location={props.location}
          sevenDayTemp={sevenDayTemp}
          isLoadingForecast={isLoadingForecast}
        />
      )}
    </>
  );
};

export default Location;
