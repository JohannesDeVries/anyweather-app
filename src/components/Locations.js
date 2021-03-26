import React from 'react';
import Location from './Location';
import '../styles/locations.css';

const Locations = (props) => {
  return (
    <div className="locations-container">
      {/* Display each element in list array */}
      {props.locations.map((location) => (
        <Location
          key={location.id}
          location={location}
          locations={props.locations}
          onSubmit={props.onSubmit}
        />
      ))}
    </div>
  );
};

export default Locations;
