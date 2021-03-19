import { FaMapMarkerAlt } from 'react-icons/fa';
import React from 'react';
import '../styles/header.css';

const Header = () => {
  return (
    <div className="header-container">
      <div className="logo-name-button-container">
        <div className="logo-name-container">
          <h1 className="logo">
            <FaMapMarkerAlt />
          </h1>
          <h1 className="name">AnyWeather</h1>
        </div>
        <div>
          <button className="button-add-location">Add Location</button>
        </div>
      </div>
      <p className="description">
        Get the weather from any point in the world by clicking on the map.
      </p>
    </div>
  );
};

export default Header;
