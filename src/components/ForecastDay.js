import React, { useState, useEffect } from 'react';
import timeStampConvert from 'timestampconvertjs';
import '../styles/forecastDay.css';

const ForecastDay = (props) => {
  const [date, setDate] = useState({});
  const [icon, setIcon] = useState();

  // Get todays date
  const d = new Date();
  const today = d.getDate();

  // Convert UNIX datestamp from OpenWeather to a readable object using the timestampconvertjs library
  useEffect(() => {
    const convertTimeStamp = (timeStamp) => {
      // Convert seconds to milliseconds
      var timeStampMilli = timeStamp * 1000;
      var convertedDate = timeStampConvert.convert(timeStampMilli, false);
      setDate(convertedDate);
    };
    convertTimeStamp(props.forecast.dt);
    setIcon(
      `http://openweathermap.org/img/wn/${props.forecast.weather[0].icon}.png`
    );
  }, [props.forecast]);

  // Wait for API call to complete and then display info.
  return props.isLoadingForecast ? (
    <div className="forecast-loading"></div>
  ) : (
    <div className="forecast-day-container">
      <div className="date-container">
        {/* If the date from the OpenWeather = today's date the display 'Today' otherwise display the date. */}
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
          <p>{Math.round(props.forecast.temp.max)}°</p>
          <p>{Math.round(props.forecast.temp.min)}°</p>
        </div>
      </div>
    </div>
  );
};

export default ForecastDay;
