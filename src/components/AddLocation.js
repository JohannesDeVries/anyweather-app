import React from 'react';
import '../styles/addLocation.css';

const AddLocation = (props) => {
  return (
    <div className="add-location-container">
      <form onSubmit={props.onSubmit}>
        <div className="input-container location-name">
          <label htmlFor="locName">Custom Location Name</label>
          <input
            type="text"
            id="locName"
            placeholder="Enter name for custom location"
            autoComplete="off"
            value={props.name}
            onChange={props.handleNameInput}
          />
          {/* Name validation error message */}
          {props.showNameError && <p>Please enter a name for the location</p>}
        </div>
        <div className="latlng_container">
          <div className="input-container lat lat-lng">
            <label htmlFor="lat">Latitude*</label>
            <input
              type="text"
              id="lat"
              placeholder="E.g. -25.2645684"
              autoComplete="off"
              value={props.latLng[0]}
              onChange={props.handleLatitudeInput}
            />
            {/* Latitude validation error message */}
            {props.showLatError && <p>Please enter a valid Latitude</p>}
          </div>
          <div className="input-container lat-lng">
            <label htmlFor="lng">Longitude*</label>
            <input
              type="text"
              id="lng"
              placeholder="E.g. 20.3202437"
              autoComplete="off"
              value={props.latLng[1]}
              onChange={props.handleLongitudeInput}
            />
            {/* Longitude validation error message */}
            {props.showLngError && <p>Please enter a valid Longitude</p>}
          </div>
        </div>
        <div className="latlng-desc">
          <p>*Click on map for coordinates or type manually.</p>
        </div>
        <div className="buttons-container">
          <input className="button-submit" type="submit" value="Add" />
          {/* Scroll down to map when clicked. Only visable under 1000px width */}
          <button
            className="button-show-map"
            type="button"
            onClick={() =>
              window.scrollTo({
                top: document.body.scrollHeight,
                behavior: 'smooth',
              })
            }
          >
            Map
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddLocation;
