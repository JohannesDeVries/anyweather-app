import React from 'react';
import Location from './Location';

const Locations = (props) => {
  return (
    <>
      {/* Display each element in list array */}
      {props.locations.map((location) => (
        <Location
          key={location.id}
          location={location}
          locations={props.locations}
          onSubmit={props.onSubmit}
        />
      ))}
    </>
  );
};

export default Locations;
