// src/components/UpButton.js
import React, { useEffect } from 'react';
import '../styles/Button.css';

const UpButton = ({ onClick, navigateToPreviousSection }) => {
  useEffect(() => {
    const handleGlobalKeyDown = (event) => {
      if (event.key === 'ArrowUp') {
        navigateToPreviousSection();
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [navigateToPreviousSection]);

  return (
    <div className="portrait-nav top" onClick={onClick}>
      &and;
    </div>
  );
};

export default UpButton;
