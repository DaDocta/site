// src/components/DownButton.js
import React, { useEffect } from 'react';
import '../styles/Button.css';

const DownButton = ({ onClick, navigateToNextSection }) => {
  useEffect(() => {
    const handleGlobalKeyDown = (event) => {
      if (event.key === 'ArrowDown') {
        navigateToNextSection();
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [navigateToNextSection]);

  return (
    <div className="portrait-nav bottom" onClick={onClick}>
      &or;
    </div>
  );
};

export default DownButton;
