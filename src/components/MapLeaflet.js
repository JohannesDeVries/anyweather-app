import React from 'react';
import '../styles/mapLeaflet.css';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
// import Leaflet from 'leaflet';

const MapLeaflet = (props) => {
  // const corner1 = Leaflet.latLng(-90, -180);
  // const corner2 = Leaflet.latLng(90, 180);
  // const bounds = Leaflet.latLngBounds(corner1, corner2);
  const bounds = [
    [-85.05112878, -180],
    [85.05112878, 180],
  ];

  return (
    <>
      <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        To the Top
      </button>
      <Map
        id="down"
        center={[-28.7863, 24.514]}
        zoom={6}
        onClick={props.getLatLng}
        ref={props.mapRef}
        maxBoundsViscosity={1.0}
        // maxBounds={bounds}
        maxBounds={bounds}
        minZoom={3}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          noWrap="true"
          bounds={bounds}
          // maxBoundsViscosity={1.0}
          // maxBounds={bounds}
          // continuousWorld="true"
          // maxNativeZoom={7}
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
            <Popup>{location.name}</Popup>
          </Marker>
        ))}
      </Map>
    </>
  );
};

export default MapLeaflet;
