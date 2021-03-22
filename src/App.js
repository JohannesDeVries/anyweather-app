import React, { useState } from 'react';
import './styles/app.css';
import MapLeaflet from './components/MapLeaflet';
import Header from './components/Header';
import AddLocation from './components/AddLocation';

function App() {
  const [showAddComponent, setShowAddComponent] = useState(false);

  // Toggle AddLocation component with 'Add Location' button
  const toggleAddComponent = () => {
    setShowAddComponent(!showAddComponent);
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
        {showAddComponent && <AddLocation />}
      </div>
      <div className="map">
        <MapLeaflet />
      </div>
    </div>
  );
}

export default App;
