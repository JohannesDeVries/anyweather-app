import React from 'react';
import { nanoid } from 'nanoid';
import ForecastDay from './ForecastDay';
import '../styles/sevenDayForecast.css';

const SevenDaysForecast = (props) => {
  return (
    <div className="seven-day-forecast-container">
      {/* Display each element in sevenDayTemp array */}
      {props.sevenDayTemp.map((forecast) => (
        <ForecastDay
          key={nanoid()}
          forecast={forecast}
          location={props.location}
        />
      ))}
    </div>
  );
};

export default SevenDaysForecast;
