import React, { useEffect, useRef } from 'react';
import '../styles/TypingText.css'; // Ensure you have the correct path to your CSS file

const TypingText = ({ children, delayTime = 50 }) => {
  const originalText = useRef([]);
  const elements = useRef([]);
  const cursor = useRef(null);

  const makeInvisible = () => {
    elements.current = document.querySelectorAll('.typing-text *:not(.cursor)');
    elements.current.forEach((element, index) => {
      originalText.current[index] = element.textContent;
      if (element.textContent) {
        element.textContent = '';
      } else {
        element.style.visibility = 'hidden';
      }
    });

    // Move the cursor to the beginning element and add a █ character
    if (elements.current.length > 0 && cursor.current) {
      const firstElement = elements.current[0];
      if (firstElement && firstElement.nodeType === Node.ELEMENT_NODE) {
        firstElement.appendChild(cursor.current);
      }
      cursor.current.style.display = 'inline';
    }

    console.log('Original text after makeInvisible:', originalText.current);
  };

  const typeText = async () => {
    console.log('Original text during typeText:', originalText.current);
    for (let i = 0; i < elements.current.length; i++) {
      const element = elements.current[i];
      const text = originalText.current[i];
      if (text) {
        await typeLine(element, text, i);
      } else {
        element.style.visibility = 'visible';
      }
    }
    // Move the cursor to the last element
    if (elements.current.length > 0 && cursor.current) {
      const lastElement = elements.current[elements.current.length - 1];
      if (lastElement && lastElement.nodeType === Node.ELEMENT_NODE) {
        if (!lastElement.contains(cursor.current)) {
          lastElement.appendChild(cursor.current);
        }
        cursor.current.style.display = 'inline';
      }
    }
  };

  const typeLine = (element, text, index) => {
    return new Promise((resolve) => {
      let charIndex = 0;
      const interval = setInterval(() => {
        if (cursor.current && cursor.current.parentElement) {
          cursor.current.parentElement.removeChild(cursor.current); // Remove cursor from the previous element
        }
        element.textContent += text.charAt(charIndex);
        charIndex++;
        if (charIndex < text.length) {
          if (element && element.nodeType === Node.ELEMENT_NODE && cursor.current) {
            if (!element.contains(cursor.current)) {
              element.appendChild(cursor.current); // Append cursor to the element
            }
          }
        }
        if (charIndex >= text.length) {
          clearInterval(interval);
          resolve();
        }
      }, delayTime); // Adjust typing speed here (milliseconds per character)
    });
  };

  useEffect(() => {
    const timer1 = setTimeout(() => {
      makeInvisible(); // Make text invisible immediately
    }, 0);

    const timer2 = setTimeout(() => {
      typeText(); // Start typing animation after a short delay
    }, 1); // Adjust the delay here (milliseconds)

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <div className='typing-text'>
      <span className="cursor" ref={cursor}>█</span>
      {children}
    </div>
  );
};

export default TypingText;
