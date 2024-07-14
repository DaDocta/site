import React, { useEffect, useRef } from 'react';
import '../styles/TypingText.css';

const TypingText = ({ children, delayTime = 30 }) => {
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
          cursor.current.parentElement.removeChild(cursor.current);
        }
        element.textContent += text.charAt(charIndex);
        charIndex++;
        if (charIndex < text.length) {
          if (element && element.nodeType === Node.ELEMENT_NODE && cursor.current) {
            if (!element.contains(cursor.current)) {
              element.appendChild(cursor.current);
            }
          }
        }
        if (charIndex >= text.length) {
          clearInterval(interval);
          resolve();
        }
      }, delayTime);
    });
  };

  useEffect(() => {
    /*const atimer = setTimeout(() => {
      makeInvisible();
    }, 0);
    */
    makeInvisible();
    const timer = setTimeout(() => {
      typeText();
    }, 1);

    return () => {
      //clearTimeout(atimer);
      clearTimeout(timer);
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
