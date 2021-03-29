import React, { useState, useRef, useEffect } from 'react';
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

  //Saves locations from LocalStorage (if LocalStorage contains data), when app loads.
  useEffect(() => {
    if (localStorage.getItem('locations')) {
      setLocations(JSON.parse(localStorage.getItem('locations')));
    }
  }, []);

  //Runs every time locations state changes and stores locations array in LocalStorage.
  useEffect(() => {
    localStorage.setItem('locations', JSON.stringify(locations));
  }, [locations]);

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

  // Variable to stop onSubmit function
  var stopVal = false;

  // Validate form
  const validation = () => {
    const regex1 = /.*\S.*/;
    const regex2 = /\s+/;
    ///\s+/g
    if (!regex1.test(name)) {
      alert('Please enter a name for the location.');
      stopVal = true;
      return;
    } else if (
      regex2.test(latLng[0]) ||
      !regex1.test(latLng[0]) ||
      isNaN(latLng[0]) ||
      latLng[0] < -90 ||
      latLng[0] > 90
    ) {
      alert('Please enter a valid Latitude.');
      stopVal = true;
      return;
    } else if (
      regex2.test(latLng[1]) ||
      !regex1.test(latLng[1]) ||
      isNaN(latLng[1]) ||
      latLng[1] < -180 ||
      latLng[1] > 180
    ) {
      alert('Please enter a valid Longitude.');
      stopVal = true;
      return;
    }
  };

  // When clicking on 'Add' button
  const onSubmit = (event) => {
    // Won't submit to another page
    event.preventDefault();

    validation();
    // If validation fails, stop onSubmit function
    if (stopVal) {
      return;
    }

    const id = Math.floor(Math.random() * 10000) + 1;

    //Save current locations and all info of new location as an object in the locations array
    setLocations([...locations, { id, name, latLng }]);

    // Clear form
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
