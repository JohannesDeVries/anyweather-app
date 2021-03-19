import React from 'react';
import './styles/app.css';
import MapLeaflet from './components/MapLeaflet';
import Header from './components/Header';
import AddLocation from './components/AddLocation';

function App() {
  return (
    <div className="app-container">
      <div className="sidebar">
        <Header />
        <AddLocation />
      </div>
      <div className="map">
        <MapLeaflet />
      </div>
    </div>
  );
}

export default App;
