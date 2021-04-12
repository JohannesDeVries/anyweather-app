import React, { useState, useEffect } from 'react';
import { FaTrashAlt, FaMapMarkerAlt, FaArrowUp } from 'react-icons/fa';
import SevenDaysForecast from './SevenDayForecast';
import '../styles/location.css';
import spinner from '../spinner/spinner.gif';

const Location = (props) => {
  const [temp, setTemp] = useState();
  const [icon, setIcon] = useState();
  const [isLoading, setisLoading] = useState(true);
  const [sevenDayTemp, setSevenDayTemp] = useState([]);
  const [showForecastComponent, setShowForecastComponent] = useState(false);

  const key = process.env.REACT_APP_WEATHER_API_KEY;
  const lat = props.location.latLng[0];
  const lng = props.location.latLng[1];

  // Current Weather API call and getting weather icon.
  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&appid=${key}`
    )
      .then((res) => res.json())
      .then((json) => {
        setIcon(
          `https://openweathermap.org/img/wn/${json.weather[0].icon}.png`
        );
        setTemp(json.main.temp);
        setisLoading(false);
      });
  }, [props.locations, lat, lng, key]);

  // 7 Day forecast API call
  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&exclude=current,minutely,hourly,alerts&units=metric&appid=${key}`
    )
      .then((res) => res.json())
      .then((json) => {
        setSevenDayTemp(json.daily);
      });
  }, [lat, lng, key]);

  // Displays the forecast of selected location on button click
  const sevenDayApiButton = () => {
    setShowForecastComponent(!showForecastComponent);
  };

  // Wait for API call to complete and then display info.
  return isLoading ? (
    <div className="loading">
      <img src={spinner} alt="Loading" />
    </div>
  ) : (
    <>
      <div className="location-container">
        <div className="name-temp-container">
          <h5>{props.location.name}</h5>
          <div className="temp-container">
            <img src={icon} alt="icon" />
            {/* Display current temperature */}
            <h2>{Math.round(temp)}°C</h2>
          </div>
        </div>
        <div className="days-button-container">
          {/* If ForecastDay component is visible(true) change button text to 'Close', otherwise(false) show '8 days' */}
          <button onClick={sevenDayApiButton}>
            {showForecastComponent ? <FaArrowUp /> : '8 days'}
          </button>
        </div>
        <div className="icon-container">
          {/* Move to location on map when clicked */}
          <h4 onClick={() => props.flyToLocation(props.location.id)}>
            <FaMapMarkerAlt />
          </h4>
          {/* Delete location */}
          <h4 onClick={() => props.deleteLocation(props.location.id)}>
            <FaTrashAlt />
          </h4>
        </div>
      </div>
      {/* Only display when clicking on forecast button */}
      {showForecastComponent && (
        <SevenDaysForecast
          location={props.location}
          sevenDayTemp={sevenDayTemp}
        />
      )}
    </>
  );
};

export default Location;
