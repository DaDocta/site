// src/App.js
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './sections/Home';
import About from './sections/About';
import './styles/App.css';

const App = () => {
  const [selectedSection, setSelectedSection] = useState('Home');

  const renderSection = () => {
    switch (selectedSection) {
      case 'Home':
        return <Home />;
      case 'About':
        return <About />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="app">
      <Navbar onSelect={setSelectedSection} />
      <div className="content">
        {renderSection()}
      </div>
    </div>
  );
};

export default App;
