import React, { useState, useEffect } from 'react';
import '../styles/Loading.css';

const Loading = () => {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prevDots) => (prevDots.length < 3 ? prevDots + '.' : ''));
    }, 300); //5000

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="loading-section">
      <p className="loading-text">Loading{dots}</p>
    </div>
  );
};

export default Loading;
