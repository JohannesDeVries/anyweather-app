import React, { useState, useRef } from 'react';
import './styles/app.css';
import MapLeaflet from './components/MapLeaflet';
import Header from './components/Header';
import AddLocation from './components/AddLocation';
import Locations from './components/Locations';

function App() {
  const [locations, setLocations] = useState([]);
  const [showAddComponent, setShowAddComponent] = useState(false);
  const [name, setName] = useState('');
  const [latLng, setLatLng] = useState(['', '']);

  // Toggle AddLocation component with 'Add Location' button
  const toggleAddComponent = () => {
    setShowAddComponent(!showAddComponent);
  };

  // Handle the Location Name input field
  const handleNameInput = (event) => {
    setName(event.target.value);
  };

  // Get latitude and longitude coordinates by clicking on the map and save as an array in useState
  const getLatLng = (event) => {
    setLatLng([event.latlng.lat, event.latlng.lng]);
  };

  // Handle the Latitude and Longitude input fields for manual input
  const handleLatitudeInput = (event) => {
    setLatLng([event.target.value, latLng[1]]);
  };
  const handleLongitudeInput = (event) => {
    setLatLng([latLng[0], event.target.value]);
  };

  // When clicking on 'Add' button
  const onSubmit = (event) => {
    event.preventDefault();

    const id = Math.floor(Math.random() * 10000) + 1;

    setLocations([...locations, { id, name, latLng }]);

    setName('');
    setLatLng(['', '']);
  };

  // Delete location
  const deleteLocation = (id) => {
    setLocations(locations.filter((location) => id !== location.id));
  };

  // Move to location when clicking on marker icon
  const mapRef = useRef();
  const flyToLocation = (id) => {
    const { current } = mapRef;
    const { leafletElement: map } = current;
    locations.map((location) =>
      location.id === id
        ? map.flyTo(
            [Number(location.latLng[0]), Number(location.latLng[1])],
            9,
            { duration: 2 }
          )
        : location
    );
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
            name={name}
            latLng={latLng}
            handleNameInput={handleNameInput}
            handleLatitudeInput={handleLatitudeInput}
            handleLongitudeInput={handleLongitudeInput}
            onSubmit={onSubmit}
          />
        )}
        {/* Locations */}
        <Locations
          locations={locations}
          onSubmit={onSubmit}
          deleteLocation={deleteLocation}
          flyToLocation={flyToLocation}
        />
      </div>
      <div className="map">
        {/* Map */}
        <MapLeaflet
          getLatLng={getLatLng}
          locations={locations}
          mapRef={mapRef}
        />
      </div>
    </div>
  );
}

export default App;
