import React, { useState, useEffect } from 'react';

const Location = (props) => {
  const [temp, setTemp] = useState('');
  const [isLoading, setisLoading] = useState(true);

  const key = 'd53799fe00bab48c01f32d17ca0aeed9';

  const lat = props.location.latLng[0];
  const lng = props.location.latLng[1];

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&appid=${key}`
    )
      .then((res) => res.json())
      .then((json) => {
        setTemp(json.main.temp);
        setisLoading(false);
      });
  }, [props.locations, lat, lng]);

  return isLoading ? (
    <h5>Loading...</h5>
  ) : (
    <div>
      <h5>
        {props.location.name} {temp}
      </h5>
    </div>
  );
};

export default Location;
