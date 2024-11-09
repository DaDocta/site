// src/components/UpButton.js
import React, { useEffect } from 'react';
import '../styles/Button.css';

const UpButton = ({ onClick, navigateToPreviousSection }) => {

  return (
    <div className="portrait-nav top" onClick={onClick}>
      &and;
    </div>
  );
};

export default UpButton;
