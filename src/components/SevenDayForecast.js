import React from 'react';

const SevenDaysForecast = (props) => {
  return (
    <div>
      {props.sevenDayTemp.map((day) => (
        <div key={day.dt}>
          {Math.round(day.temp.max)} {Math.round(day.temp.min)}
        </div>
      ))}
    </div>
  );
};

export default SevenDaysForecast;
