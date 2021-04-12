import React, { useState, useEffect } from 'react';
import unixtimestamp from 'unix-timestamp';
import '../styles/forecastDay.css';

const ForecastDay = (props) => {
  const [day, setDay] = useState();
  const [month, setMonth] = useState();
  const [icon, setIcon] = useState();

  // Get todays date
  const d = new Date();
  const today = d.getDate();

  //Convert UNIX datestamp from OpenWeather to an object using the unix-timestamp library.
  const convertTimeStampsssss = (timeStamp) => {
    const date = unixtimestamp.toDate(timeStamp);
    setDay(date.getDate());
    //use toLocaleString() to convert date object to string and only pull the full name of Month
    setMonth(date.toLocaleString('default', { month: 'long' }));
  };

  // Call convertTimeStamp function and set weather icon for that certain day
  useEffect(() => {
    convertTimeStampsssss(props.forecast.dt);

    setIcon(
      `https://openweathermap.org/img/wn/${props.forecast.weather[0].icon}.png`
    );
  }, [props.forecast]);

  return (
    <div className="forecast-day-container">
      <div className="date-container">
        {/* If the date from the OpenWeather = today's date then display 'Today' otherwise display the date. */}
        {day === today ? (
          <p>Today</p>
        ) : (
          <p>
            {day} {month}
          </p>
        )}
      </div>
      <div className="weather-container">
        <div className="weather-icon-container">
          <img src={icon} alt="icon" />
        </div>
        <div className="temp-forecast-container">
          {/* Display min and max temperatures for a certain day */}
          <p>{Math.round(props.forecast.temp.max)}°</p>
          <p>{Math.round(props.forecast.temp.min)}°</p>
        </div>
      </div>
    </div>
  );
};

export default ForecastDay;
