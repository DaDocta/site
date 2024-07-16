import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import UpButton from './components/UpButton';
import DownButton from './components/DownButton';
import Home from './sections/Home';
import About from './sections/About';
import Projects from './sections/Projects';
import Partnerships from './sections/Partnerships';
import Contact from './sections/Contact';
import Loading from './sections/Loading'; // Ensure this is the correct path to Loading component
import './styles/App.css';
import './styles/Loading.css';

const App = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isPortrait, setIsPortrait] = useState(window.innerHeight > window.innerWidth);
  const [isLoading, setIsLoading] = useState(false);
  const [colorIndex, setColorIndex] = useState(0);
  const loadingTimeout = useRef(null); // Use ref to store timeout ID
  const menuItems = ['Home', 'About', 'Projects', 'Partnerships', 'Contact'];

  const handleResize = () => {
    const isPortrait = window.innerHeight > window.innerWidth;
    setIsPortrait(isPortrait);
    if (isPortrait) {
      document.body.style.overflow = 'auto';
      document.documentElement.style.overflow = 'auto';
    } else {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      window.scrollTo(0, 0); // Scroll to top when switching to landscape mode
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);
    handleResize(); // Call once to set the initial state

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        event.preventDefault(); // Prevent default scrolling behavior in portrait mode
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty('--main-color', getColor(colorIndex));
  }, [colorIndex]);

  const getColor = (index) => {
    const colors = [
      'rgb(0, 255, 0)',   // Green
      'rgb(255, 0, 255)', // Pink
      'rgb(255, 255, 0)', // Yellow
      'rgb(0, 255, 255)', // Cyan
    ];
    return colors[index];
  };

  const setNewIndex = (newIndex) => {
    if (loadingTimeout.current) {
      clearTimeout(loadingTimeout.current);
    }
    setIsLoading(true);
    setSelectedIndex(newIndex);
    loadingTimeout.current = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  const navigateToNextSection = () => {
    setNewIndex((prevIndex) => (prevIndex + 1) % menuItems.length);
  };

  const navigateToPreviousSection = () => {
    setNewIndex((prevIndex) => (prevIndex - 1 + menuItems.length) % menuItems.length);
  };

  const handleNavSelect = (index) => {
    if (index !== selectedIndex) {
      setNewIndex(index);
    }
  };

  const renderSection = () => {
    if (isLoading) {
      return <Loading />;
    }
    switch (menuItems[selectedIndex]) {
      case 'Home':
        return <Home />;
      case 'About':
        return <About />;
      case 'Projects':
        return <Projects />;
      case 'Partnerships':
        return <Partnerships />;
      case 'Contact':
        return <Contact />;
      default:
        return <Home />;
    }
  };

  const handleColorChange = (event) => {
    const newIndex = parseInt(event.target.value, 10);
    setColorIndex(newIndex);
  };

  return (
    <>
      {isPortrait ? (
        <div className='portrait'>
          <UpButton navigateToPreviousSection={navigateToPreviousSection} onClick={navigateToPreviousSection} />
          <div className="portrait-section">{renderSection()}</div>
          <DownButton navigateToNextSection={navigateToNextSection} onClick={navigateToNextSection} />
        </div>
      ) : (
        <div className='landscape'>
          <Navbar 
            selectedIndex={selectedIndex} 
            onSelect={handleNavSelect} 
            colorIndex={colorIndex} 
            onColorChange={handleColorChange}
            menuItems={menuItems}
          />
          <div className="landscape-section">{renderSection()}</div>
        </div>
      )}
    </>
  );
};

export default App;
