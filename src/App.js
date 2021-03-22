import React, { useState } from 'react';
import './styles/app.css';
import MapLeaflet from './components/MapLeaflet';
import Header from './components/Header';
import AddLocation from './components/AddLocation';

function App() {
  const [showAddComponent, setShowAddComponent] = useState(false);
  const [locationName, setLocationName] = useState('');
  const [latLng, setLatLng] = useState(['', '']);

  // Toggle AddLocation component with 'Add Location' button
  const toggleAddComponent = () => {
    setShowAddComponent(!showAddComponent);
  };

  //Handle the Location Name input field
  const handleNameInput = (event) => {
    setLocationName(event.target.value);
  };

  //Get latitude and longitude coordinates by clicking on the map and save as an array in useState
  const getLatLng = (event) => {
    setLatLng([event.latlng.lat, event.latlng.lng]);
  };

  //Handle the Latitude and Longitude input fields for manual input
  const handleLatitudeInput = (event) => {
    setLatLng([event.target.value, latLng[1]]);
  };
  const handleLongitudeInput = (event) => {
    setLatLng([latLng[0], event.target.value]);
  };

  return (
    <div className="app-container">
      <div className="sidebar">
        {/* Header */}
        <Header
          toggleAddComponent={toggleAddComponent}
          showAddComponent={showAddComponent}
        />
        {/* Add Location */}
        {showAddComponent && (
          <AddLocation
            locationName={locationName}
            latLng={latLng}
            handleNameInput={handleNameInput}
            handleLatitudeInput={handleLatitudeInput}
            handleLongitudeInput={handleLongitudeInput}
          />
        )}
      </div>
      <div className="map">
        <MapLeaflet getLatLng={getLatLng} />
      </div>
    </div>
  );
}

export default App;
