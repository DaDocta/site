import React, { useEffect, useRef } from 'react';
import '../styles/TypingText.css'; // Ensure you have the correct path to your CSS file

const TypingText = ({ children }) => {
  var originalText = [];

  const makeInvisible = () => {
    console.log('Making elements invisible');
    const elements = document.querySelectorAll('.typing-text *');
    elements.forEach((element, index) => {
      console.log(element.textContent);
      if (element.textContent) {
        originalText.push(element.textContent);
        element.textContent = ' ';
        
      } else {
        originalText.push('');;
        element.style.visibility = 'hidden';
      }
    });
  };

  const makeVisible = () => {
    console.log('Making elements visible');
    console.log(originalText);
    const elements = document.querySelectorAll('.typing-text *');
    elements.forEach((element, index) => {
      if (element.textContent) {
        element.textContent = originalText[index];
      } else {
        element.style.visibility = 'visible';
      }
    });
  };

  useEffect(() => {
    // Set initial visibility to invisible
    makeInvisible();

    // Schedule makeVisible to run after 3 seconds
    const timer = setTimeout(() => {
      makeVisible();
    }, 3000);

    // Clean up the timer on component unmount
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className='typing-text'>
      {children}
    </div>
  );
};

export default TypingText;
