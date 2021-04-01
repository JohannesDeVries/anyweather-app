import React, { useState, useEffect } from 'react';
import timeStampConvert from 'timestampconvertjs';
import '../styles/forecastDay.css';

const ForecastDay = (props) => {
  const [date, setDate] = useState({});
  const [icon, setIcon] = useState();

  // Get todays date
  const d = new Date();
  const today = d.getDate();

  // Convert UNIX datestamp from OpenWeather to an object using the timestampconvertjs library.
  const convertTimeStamp = (timeStamp) => {
    // Convert seconds to milliseconds
    const timeStampMilli = timeStamp * 1000;
    const convertedDate = timeStampConvert.convert(timeStampMilli, false);
    setDate(convertedDate);
  };

  // Call convertTimeStamp function and set weather icon for that certain day
  useEffect(() => {
    convertTimeStamp(props.forecast.dt);

    setIcon(
      `http://openweathermap.org/img/wn/${props.forecast.weather[0].icon}.png`
    );
  }, [props.forecast]);

  return (
    <div className="forecast-day-container">
      <div className="date-container">
        {/* If the date from the OpenWeather = today's date then display 'Today' otherwise display the date. */}
        {date.day === today ? (
          <p>Today</p>
        ) : (
          <p>
            {date.day} {date.monthName}
          </p>
        )}
      </div>
      <div className="weather-container">
        <div className="weather-icon-container">
          <img src={icon} alt="icon" />
        </div>
        <div className="temp-forecast-container">
          {/* Display min and max temperatures for certain day */}
          <p>{Math.round(props.forecast.temp.max)}°</p>
          <p>{Math.round(props.forecast.temp.min)}°</p>
        </div>
      </div>
    </div>
  );
};

export default ForecastDay;
