import React, { useEffect, useRef } from 'react';
import '../styles/TypingText.css'; // Ensure you have the correct path to your CSS file

const TypingText = ({ children }) => {
  const originalText = useRef([]);
  const elements = useRef([]);
  const cursor = useRef(null);

  const makeInvisible = () => {
    elements.current = document.querySelectorAll('.typing-text *');
    elements.current.forEach((element, index) => {
      originalText.current[index] = element.textContent;
      if (element.textContent) {
        element.textContent = '';
      } else {
        element.style.visibility = 'hidden';
      }
    });
    console.log('Original text after makeInvisible:', originalText.current);
  };

  const typeText = async () => {
    console.log('Original text during typeText:', originalText.current);
    for (let i = 0; i < elements.current.length; i++) {
      const element = elements.current[i];
      const text = originalText.current[i];
      if (text) {
        await typeLine(element, text);
      } else {
        element.style.visibility = 'visible';
      }
    }
    // Move the cursor to the last element
    if (elements.current.length > 0 && cursor.current) {
      const lastElement = elements.current[elements.current.length - 1];
      if (!lastElement.contains(cursor.current)) {
        lastElement.appendChild(cursor.current);
      }
      cursor.current.style.display = 'inline';
    }
  };

  const typeLine = (element, text) => {
    return new Promise((resolve) => {
      let charIndex = 0;
      const interval = setInterval(() => {
        element.textContent += text.charAt(charIndex);
        charIndex++;
        if (cursor.current && !element.contains(cursor.current)) {
          element.appendChild(cursor.current);
        }
        if (charIndex >= text.length) {
          clearInterval(interval);
          resolve();
        }
      }, 50); // Adjust typing speed here (milliseconds per character)
    });
  };

  useEffect(() => {
    makeInvisible(); // Make text invisible immediately
    const timer = setTimeout(() => {
      typeText(); // Start typing animation after a short delay
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className='typing-text'>
      {children}
      <span className="cursor" ref={cursor}>█</span>
    </div>
  );
};

export default TypingText;
