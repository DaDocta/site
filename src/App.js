import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import UpButton from './components/UpButton';
import DownButton from './components/DownButton';
import Home from './sections/Home';
import About from './sections/About';
import Projects from './sections/Projects';
import Partnerships from './sections/Partnerships';
import Contact from './sections/Contact';
import Loading from './sections/Loading';
import './styles/App.css';


const App = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isPortrait, setIsPortrait] = useState(window.innerHeight > window.innerWidth);
  const [isLoading, setIsLoading] = useState(false);
  const [colorIndex, setColorIndex] = useState(0);
  const loadingTimeout = useRef(null); // Use ref to store timeout ID
  const menuItems = ['Home', 'About', 'Projects', 'Partnerships', 'Contact'];
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const touchStartY = useRef(0);
  const touchEndY = useRef(0);

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

      switch (event.key) {
        case 'ArrowUp':
          navigateToPreviousSection();
          break;
        case 'ArrowDown':
          navigateToNextSection();
          break;
        case 'ArrowRight':
          navigateToNextColor();
          break;
        case 'ArrowLeft':
          navigateToPreviousColor();
          break;
        default:
          break;
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

  const navigateToNextColor = () => {
    setColorIndex((prevIndex) => (prevIndex + 1) % 4); // 4 is the number of colors
  };

  const navigateToPreviousColor = () => {
    setColorIndex((prevIndex) => (prevIndex - 1 + 4) % 4); // 4 is the number of colors
  };

  const setNewIndex = (newIndex) => {
    if (loadingTimeout.current) {
      clearTimeout(loadingTimeout.current);
    }
    setIsLoading(true);
    setSelectedIndex(newIndex);
    loadingTimeout.current = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const navigateToNextSection = () => {
    setNewIndex((prevIndex) => (prevIndex + 1) % menuItems.length);
  };

  const navigateToSection = (sectionName) => {
    setNewIndex(menuItems.indexOf(sectionName));
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
        return <Partnerships navigateToSection={navigateToSection} />;
      case 'Contact':
        return <Contact />;
      default:
        return <Home />;
    }
  };

  

  const handleTouchStart = (event) => {
    touchStartX.current = event.touches[0].clientX;
    touchStartY.current = event.touches[0].clientY;
    touchEndX.current = touchStartX.current; // Reset touchEndX to the start position
    touchEndY.current = touchStartY.current; // Reset touchEndY to the start position
  };
  
  const handleTouchMove = (event) => {
    touchEndX.current = event.touches[0].clientX;
    touchEndY.current = event.touches[0].clientY;
  };
  
  const handleTouchEnd = () => {
    const deltaX = touchStartX.current - touchEndX.current;
    const deltaY = touchStartY.current - touchEndY.current;
    const horizontalSwipeDistance = 100; // Minimum distance for a swipe
    const verticalSwipeDistance = 50; // Maximum vertical movement allowed
  
    if (Math.abs(deltaX) > horizontalSwipeDistance && Math.abs(deltaY) < verticalSwipeDistance) {
      if (deltaX > 0) {
        navigateToNextColor();
      } else {
        navigateToPreviousColor();
      }
    }
  };
  

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
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
            menuItems={menuItems}
          />
          <div className="landscape-section">{renderSection()}</div>
        </div>
      )}
    </div>
  );
};

export default App;
