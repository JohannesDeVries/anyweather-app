import React from 'react';

const Locations = (props) => {
  return (
    <>
      {/* Display each element in list array */}
      {props.locations.map((location) => (
        <div key={location.id}>
          <h5>{location.name}</h5>
        </div>
      ))}
    </>
  );
};

export default Locations;
