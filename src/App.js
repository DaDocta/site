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
  const loadingTimeout = useRef(null);
  const menuItems = ['Home', 'About', 'Projects', 'Contact'];
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const touchStartY = useRef(0);
  const touchEndY = useRef(0);
  const lastTapTime = useRef(0);

  const handleResize = () => {
    const isPortrait = window.innerHeight > window.innerWidth;
    setIsPortrait(isPortrait);
    if (isPortrait) {
      document.body.style.overflow = 'auto';
      document.documentElement.style.overflow = 'auto';
    } else {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      window.scrollTo(0, 0);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
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

  const navigateToPreviousSection = () => {
    setNewIndex((prevIndex) => (prevIndex - 1 + menuItems.length) % menuItems.length);
  };

  const handleTouchStart = (event) => {
    const now = Date.now();
    const timeSinceLastTap = now - lastTapTime.current;

    // Double-tap detection
    if (timeSinceLastTap < 300) {
      navigateToNextColor(); // Double-tap detected
    }

    lastTapTime.current = now;

    // Record start position for swipe detection
    touchStartX.current = event.touches[0].clientX;
    touchStartY.current = event.touches[0].clientY;
    touchEndX.current = touchStartX.current; // Reset end positions
    touchEndY.current = touchStartY.current;
  };

  const handleTouchMove = (event) => {
    touchEndX.current = event.touches[0].clientX;
    touchEndY.current = event.touches[0].clientY;
  };

  const handleTouchEnd = () => {
    const deltaX = touchStartX.current - touchEndX.current;
    const deltaY = touchStartY.current - touchEndY.current;
    const horizontalSwipeDistance = 100; // Minimum swipe distance horizontally
    const verticalSwipeDistance = 50;   // Maximum vertical movement for horizontal swipes

    // Swipe detection
    if (Math.abs(deltaX) > horizontalSwipeDistance && Math.abs(deltaY) < verticalSwipeDistance) {
      if (deltaX > 0) {
        navigateToNextSection(); // Swipe left
      } else {
        navigateToPreviousSection(); // Swipe right
      }
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
      case 'Contact':
        return <Contact />;
      default:
        return <Home />;
    }
  };

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {isPortrait ? (
        <div className="portrait">
          <UpButton onClick={navigateToPreviousSection} />
          <div className="portrait-section">{renderSection()}</div>
          <DownButton onClick={navigateToNextSection} />
        </div>
      ) : (
        <div className="landscape">
          <Navbar
            selectedIndex={selectedIndex}
            onSelect={setNewIndex}
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
