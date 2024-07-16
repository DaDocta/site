import React, { useEffect, useRef } from 'react';
import '../styles/TypingText.css';

const TypingText = ({ children, delayTime = 30 }) => {
  const originalText = useRef(new Map());
  const elements = useRef([]);
  const cursor = useRef(null);

  const traverseAndProcess = (element) => {
    if (element.nodeType === Node.TEXT_NODE) {
      return;
    }

    if (element.nodeType === Node.ELEMENT_NODE) {
      const textContent = element.textContent;
      if (textContent && element.tagName !== 'DIV') {
        console.log('Element:', element);
        console.log('Text content:', textContent);
        originalText.current.set(element, textContent);
        element.innerHTML = '';
        elements.current.push(element);
        console.log('Original:', originalText);
      }
      else if (!textContent) {
        element.style.visibility = 'hidden';
        elements.current.push(element);
      } else {
        Array.from(element.childNodes).forEach(child => traverseAndProcess(child));
      }
    }
  };

  const makeInvisible = () => {
    const rootElement = document.querySelector('.typing-text');
    traverseAndProcess(rootElement);

    if (elements.current.length > 0 && cursor.current) {
      const firstElement = elements.current[0];
      if (firstElement && firstElement.nodeType === Node.ELEMENT_NODE) {
        if (!firstElement.contains(cursor.current)) {
          firstElement.appendChild(cursor.current);
        }
      }
      cursor.current.style.display = 'inline';
    }

    console.log('Original text after makeInvisible:', originalText.current);
  };

  const typeText = async () => {
    if (cursor.current) {cursor.current.classList.add('typing');}
    for (let i = 0; i < elements.current.length; i++) {
      const element = elements.current[i];
      const text = originalText.current.get(element);
      if (text) {
        await typeLine(element, text);
      } else {
        element.style.visibility = 'visible';
      }
    }
    if (cursor.current) {cursor.current.classList.remove('typing');}
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

  const typeLine = (element, text) => {
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
    const atimer = setTimeout(() => {
      makeInvisible();
    }, 0);

    const timer = setTimeout(() => {
      typeText();
    }, 1);

    return () => {
      clearTimeout(atimer);
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
