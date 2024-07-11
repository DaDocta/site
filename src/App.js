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
  const [selectedSection, setSelectedSection] = useState('Home');
  const [isPortrait, setIsPortrait] = useState(window.innerHeight > window.innerWidth);

  const renderSection = () => {
    switch (selectedSection) {
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

  const handleResize = () => {
    setIsPortrait(window.innerHeight > window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navigateToNextSection = () => {
    const sections = ['Home', 'About', 'Experience', 'Projects'];
    const currentIndex = sections.indexOf(selectedSection);
    const nextIndex = (currentIndex + 1) % sections.length;
    setSelectedSection(sections[nextIndex]);
  };

  const navigateToPreviousSection = () => {
    const sections = ['Home', 'About', 'Experience', 'Projects'];
    const currentIndex = sections.indexOf(selectedSection);
    const prevIndex = (currentIndex - 1 + sections.length) % sections.length;
    setSelectedSection(sections[prevIndex]);
  };

  return (
    <div className="app">
      {isPortrait ? (
        <div className="portrait-content">
          <UpButton onClick={navigateToPreviousSection} navigateToPreviousSection={navigateToPreviousSection} />
          <div className="section">{renderSection()}</div>
          <DownButton onClick={navigateToNextSection} navigateToNextSection={navigateToNextSection} />
        </div>
      ) : (
        <>
          <Navbar onSelect={setSelectedSection} />
          <div className="content">{renderSection()}</div>
        </>
      )}
    </div>
  );
};

export default App;
