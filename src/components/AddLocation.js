import React from 'react';
import '../styles/addLocation.css';

const AddLocation = () => {
  return (
    <div className="add-location-container">
      <form>
        <div className="input-container location-name">
          <label htmlFor="name">Location Name</label>
          <input
            type="text"
            id="name"
            placeholder="E.g. Kgalagadi Wildlife Park"
            autocomplete="off"
          />
        </div>
        <div className="latlng_container">
          <div className="input-container lat lat-lng">
            <label htmlFor="lat">Latitude*</label>
            <input
              type="text"
              id="lat"
              placeholder="E.g. 12.435345345"
              autocomplete="off"
            />
          </div>
          <div className="input-container lat-lng">
            <label htmlFor="lng">Longitude*</label>
            <input
              type="text"
              id="lng"
              placeholder="E.g. 0.32342342343"
              autocomplete="off"
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
