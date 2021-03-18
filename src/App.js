import React from 'react';
import './styles/app.css';
import MapLeaflet from './components/MapLeaflet';
import Header from './components/Header';

function App() {
  return (
    <div className="app-container">
      <div className="sidebar">
        <Header />
      </div>
      <div className="map">
        <MapLeaflet />
      </div>
    </div>
  );
}

export default App;
