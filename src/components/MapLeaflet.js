import React from 'react';
import '../styles/mapLeaflet.css';
import { Map, TileLayer } from 'react-leaflet';

const MapLeaflet = (props) => {
  return (
    <Map center={[-30.559483, 22.937506]} zoom={6} onClick={props.getLatLng}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </Map>
  );
};

export default MapLeaflet;
