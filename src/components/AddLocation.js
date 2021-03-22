import React from 'react';
import '../styles/addLocation.css';

const AddLocation = (props) => {
  return (
    <div className="add-location-container">
      <form onSubmit={props.onSubmit}>
        <div className="input-container location-name">
          <label htmlFor="name">Location Name</label>
          <input
            type="text"
            id="name"
            placeholder="E.g. Kgalagadi Wildlife Park"
            autoComplete="off"
            value={props.name}
            onChange={props.handleNameInput}
          />
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
          </div>
        </div>
        <div className="latlng-desc">
          <p>*Click on map for coordinates or type manually.</p>
        </div>
        <input className="button-submit" type="submit" value="Add" />
      </form>
    </div>
  );
};

export default AddLocation;
