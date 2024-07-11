// src/App.js
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import UpButton from './components/UpButton';
import DownButton from './components/DownButton';
import Home from './sections/Home';
import About from './sections/About';
import Experience from './sections/Experience';
import Projects from './sections/Projects';
import './styles/App.css';

const App = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isPortrait, setIsPortrait] = useState(window.innerHeight > window.innerWidth);
  const menuItems = ['Home', 'About', 'Experience', 'Projects'];

  useEffect(() => {
    const handleResize = () => {
      setIsPortrait(window.innerHeight > window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navigateToNextSection = () => {
    setSelectedIndex(prevIndex => (prevIndex + 1) % menuItems.length);
  };

  const navigateToPreviousSection = () => {
    setSelectedIndex(prevIndex => (prevIndex - 1 + menuItems.length) % menuItems.length);
  };

  const renderSection = () => {
    switch (menuItems[selectedIndex]) {
      case 'Home':
        return <Home />;
      case 'About':
        return <About />;
      case 'Experience':
        return <Experience />;
      case 'Projects':
        return <Projects />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="app">
      {!isPortrait && <Navbar selectedIndex={selectedIndex} onSelect={setSelectedIndex} />}
      <div className={isPortrait ? 'portrait-content' : 'content'}>
        {isPortrait ? (
          <>
            <UpButton onClick={navigateToPreviousSection} navigateToPreviousSection={navigateToPreviousSection} />
            <div className="section">{renderSection()}</div>
            <DownButton onClick={navigateToNextSection} navigateToNextSection={navigateToNextSection} />
          </>
        ) : (
          renderSection()
        )}
      </div>
    </div>
  );
};

export default App;
