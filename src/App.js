import React from 'react';
import './styles/app.css';
import MapLeaflet from './components/MapLeaflet';

function App() {
  return (
    <div className={'app-container'}>
      <div className={'sidebar'}>
        <h1>Info</h1>
      </div>
      <div className={'map'}>
        <MapLeaflet />
      </div>
    </div>
  );
}

export default App;
