// src/components/DownButton.js
import React, { useEffect } from 'react';
import '../styles/Button.css';

const DownButton = ({ onClick, navigateToNextSection }) => {

  return (
    <div className="portrait-nav bottom" onClick={onClick}>
      &or;
    </div>
  );
};

export default DownButton;
