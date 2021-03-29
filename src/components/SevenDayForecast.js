import React from 'react';
import ForecastDay from './ForecastDay';
import '../styles/sevenDayForecast.css';

const SevenDaysForecast = (props) => {
  return (
    <div className="seven-day-forecast-container">
      {/* Display each element in sevenDayTemp array */}
      {props.sevenDayTemp.map((forecast) => (
        <ForecastDay
          key={Math.floor(Math.random() * 10000) + 1}
          forecast={forecast}
          location={props.location}
          isLoadingForecast={props.isLoadingForecast}
        />
      ))}
    </div>
  );
};

export default SevenDaysForecast;
