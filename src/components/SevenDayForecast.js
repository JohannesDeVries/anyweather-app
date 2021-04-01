import React from 'react';
import { nanoid } from 'nanoid';
import ForecastDay from './ForecastDay';
import '../styles/sevenDayForecast.css';

const SevenDaysForecast = (props) => {
  return (
    <div className="seven-day-forecast-container">
      {/* Create a ForecastDay component for each element in temp.daily array*/}
      {props.sevenDayTemp.map((forecast) => (
        <ForecastDay
          // Use Nanoid to generate key
          key={nanoid()}
          forecast={forecast}
          location={props.location}
        />
      ))}
    </div>
  );
};

export default SevenDaysForecast;
