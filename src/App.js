import React, { useState, useRef, useEffect } from 'react';
import { nanoid } from 'nanoid';
import MapLeaflet from './components/MapLeaflet';
import Header from './components/Header';
import AddLocation from './components/AddLocation';
import Locations from './components/Locations';
import Footer from './components/Footer';
import './styles/app.css';

function App() {
  const [locations, setLocations] = useState([]);
  const [name, setName] = useState('');
  const [latLng, setLatLng] = useState(['', '']);

  const [showAddComponent, setShowAddComponent] = useState(false);

  //Error message State
  const [showNameError, setShowNameError] = useState(false);
  const [showLatError, setShowLatError] = useState(false);
  const [showLngError, setShowLngError] = useState(false);

  //Restores locations from LocalStorage (if LocalStorage contains data), when app loads.
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

  // Get latitude and longitude coordinates by clicking on the map and save as an array in useState.
  const getLatLng = (event) => {
    setLatLng([event.latlng.lat.toFixed(6), event.latlng.lng.toFixed(6)]);
  };

  // Handle the Latitude and Longitude input fields for manual input
  const handleLatitudeInput = (event) => {
    setLatLng([event.target.value, latLng[1]]);
  };
  const handleLongitudeInput = (event) => {
    setLatLng([latLng[0], event.target.value]);
  };

  // Stop onSubmit function when validation fails
  let stopVal = false;

  // Validate form (name, latitude and longitude)
  const validation = () => {
    const regex1 = /.*\S.*/;
    const regex2 = /\s+/;

    if (!regex1.test(name)) {
      setShowNameError(true);
      stopVal = true;
      return;
    } else if (
      regex2.test(latLng[0]) ||
      !regex1.test(latLng[0]) ||
      isNaN(latLng[0]) ||
      latLng[0] < -90 ||
      latLng[0] > 90
    ) {
      setShowLatError(true);
      stopVal = true;
      return;
    } else if (
      regex2.test(latLng[1]) ||
      !regex1.test(latLng[1]) ||
      isNaN(latLng[1]) ||
      latLng[1] < -180 ||
      latLng[1] > 180
    ) {
      setShowLngError(true);
      stopVal = true;
      return;
    }
  };

  // When clicking on 'Add' button
  const onSubmit = (event) => {
    // Won't submit to another page
    event.preventDefault();

    //Remove error messages
    setShowNameError(false);
    setShowLatError(false);
    setShowLngError(false);

    // Validate form
    validation();
    // If validation fails, stop onSubmit function
    if (stopVal) {
      return;
    }

    // Generate ID for locaion using Nanoid
    const id = nanoid();

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

  // Move to location on map when clicking on marker icon
  const mapRef = useRef();
  const flyToLocation = (id) => {
    const { current } = mapRef;
    const { leafletElement: leafletMap } = current;
    locations.map((location) =>
      location.id === id
        ? leafletMap.flyTo(
            [Number(location.latLng[0]), Number(location.latLng[1])],
            12,
            { duration: 2 }
          )
        : location
    );
  };

  return (
    <div className="app-container">
      <div className="sidebar">
        <div>
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
              showNameError={showNameError}
              showLatError={showLatError}
              showLngError={showLngError}
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
        <div>
          {/* Footer */}
          <Footer />
        </div>
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
