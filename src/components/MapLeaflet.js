import React from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import '../styles/mapLeaflet.css';

const MapLeaflet = (props) => {
  const bounds = [
    [-85.05112878, -180],
    [85.05112878, 180],
  ];

  return (
    <>
      {/* Scroll to the top of app when clicked. Only visable under 1000px width */}
      <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        Back
      </button>
      <Map
        center={[-28.7863, 24.514]}
        zoom={6}
        onClick={props.getLatLng}
        ref={props.mapRef}
        maxBoundsViscosity={1.0}
        maxBounds={bounds}
        minZoom={3}
      >
        {/* Displays map tile images */}
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          noWrap="true"
          bounds={bounds}
        />

        {/* Display Markers on map for each location */}
        {props.locations.map((location) => (
          <Marker
            key={location.id}
            position={[Number(location.latLng[0]), Number(location.latLng[1])]}
            onMouseOver={(event) => {
              event.target.openPopup();
            }}
            onMouseOut={(event) => {
              event.target.closePopup();
            }}
          >
            {/* Shows location name when hovering over marker */}
            <Popup>{location.name}</Popup>
          </Marker>
        ))}
      </Map>
    </>
  );
};

export default MapLeaflet;
