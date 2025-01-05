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
  const mainContainerRef = useRef(null); // Reference to main container
  const menuItems = ['Home', 'About', 'Projects', 'Contact'];

  const handleResize = () => {
    const portrait = window.innerHeight > window.innerWidth;
    setIsPortrait(portrait);
    if (portrait) {
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

  useEffect(() => {
    const handleKeyDown = (event) => {
      const portraitNow = window.innerHeight > window.innerWidth;
      if (!portraitNow) return;

      switch (event.key) {
        case 'ArrowUp':
          navigateToPreviousSection();
          break;
        case 'ArrowDown':
          navigateToNextSection();
          break;
        case 'ArrowLeft':
          navigateToPreviousColor();
          break;
        case 'ArrowRight':
          navigateToNextColor();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Focus main container on mount
  useEffect(() => {
    if (mainContainerRef.current) {
      mainContainerRef.current.focus();
    }
  }, []);

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
    setColorIndex((prevIndex) => (prevIndex + 1) % 4);
  };

  const navigateToPreviousColor = () => {
    setColorIndex((prevIndex) => (prevIndex - 1 + 4) % 4);
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
      ref={mainContainerRef}
      tabIndex="0"
      onTouchStart={(event) => {
        const now = Date.now();
        const timeSinceLastTap = now - lastTapTime.current;

        if (timeSinceLastTap < 300) {
          navigateToNextColor(); // Double-tap detected
        }

        lastTapTime.current = now;
        touchStartX.current = event.touches[0].clientX;
        touchStartY.current = event.touches[0].clientY;
      }}
      onTouchMove={(event) => {
        touchEndX.current = event.touches[0].clientX;
        touchEndY.current = event.touches[0].clientY;
      }}
      onTouchEnd={() => {
        const deltaX = touchStartX.current - touchEndX.current;
        const deltaY = touchStartY.current - touchEndY.current;
        if (Math.abs(deltaX) > 100 && Math.abs(deltaY) < 50) {
          if (deltaX > 0) {
            navigateToNextSection(); // Swipe left
          } else {
            navigateToPreviousSection(); // Swipe right
          }
        }
      }}
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
