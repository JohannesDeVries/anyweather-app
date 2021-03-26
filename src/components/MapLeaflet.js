import React from 'react';
import '../styles/mapLeaflet.css';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

const MapLeaflet = (props) => {
  return (
    <Map center={[-30.559483, 22.937506]} zoom={6} onClick={props.getLatLng}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
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
  );
};

export default MapLeaflet;
