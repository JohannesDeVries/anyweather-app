import React, { useState, useEffect } from 'react';
import { FaTrashAlt, FaMapMarkerAlt } from 'react-icons/fa';
import SevenDaysForecast from './SevenDayForecast';
import '../styles/location.css';
import spinner from '../spinner/spinner.gif';

const Location = (props) => {
  const [temp, setTemp] = useState();
  const [icon, setIcon] = useState();
  const [isLoading, setisLoading] = useState(true);

  const [showForecastComponent, setShowForecastComponent] = useState(false);

  const key = '8b0b4714473daa2492c872207003b04b';
  const lat = props.location.latLng[0];
  const lng = props.location.latLng[1];

  // API call to get current and 8-day weather info
  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&exclude=minutely,hourly,alerts&units=metric&appid=${key}`
    )
      .then((res) => res.json())
      .then((json) => {
        setTemp(json);

        // Get weather icon
        setIcon(
          `http://openweathermap.org/img/wn/${json.current.weather[0].icon}.png`
        );

        setisLoading(false);
      });
  }, [props.locations, lat, lng, key]);

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
            <h2>{Math.round(temp.current.temp)}°C</h2>
          </div>
        </div>
        <div className="days-button-container">
          {/* If ForecastDay component is visible(true) change button text to 'Close', otherwise(false) show '8 days' */}
          <button onClick={sevenDayApiButton}>
            {showForecastComponent ? 'Close' : '8 days'}
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
        <SevenDaysForecast location={props.location} temp={temp} />
      )}
    </>
  );
};

export default Location;
