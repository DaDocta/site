import React, { useEffect, useRef } from 'react';
import '../styles/TypingText.css';

  const TypingText = ({ children, delayTime = 30, onTypingDone = () => {} }) => {
  const originalText = useRef(new Map());
  const elements = useRef([]);
  const cursor = useRef(null);

  const handleTextElement = (element) => {
    originalText.current.set(element, element.textContent);
    element.textContent = '';
    elements.current.push(element)
  }

  const handleNonTextElement = (element) => {
    if (element) {
      console.log('Element:', element);
      element.style.visibility = 'hidden';
      elements.current.push(element);
    }
  };

  const traverseAndProcess1 = (element) => {
    if (element.nodeType === Node.ELEMENT_NODE) {
      if (element.textContent && element.tagName !== 'DIV') {
        handleTextElement(element);
      } else if (!element.textContent) {
        handleNonTextElement(element);
      } else {
        Array.from(element.childNodes).forEach(child => traverseAndProcess(child));
      }
    }
  };

  const traverseAndProcess = (element) => {
    if (element.nodeType === Node.TEXT_NODE) {
      return;
    }
  
    if (element.nodeType === Node.ELEMENT_NODE) {
      if (!element.textContent) {
        handleNonTextElement(element);
        };
      Array.from(element.childNodes).forEach(child => {
        if (child.nodeType === Node.TEXT_NODE) {
          const textContent = child.textContent;
          if (textContent) {
            originalText.current.set(child, textContent);
            child.textContent = '';
            elements.current.push(child);
          } else {
            handleNonTextElement(child);
          }
        } else if (child.nodeType === Node.ELEMENT_NODE) {
          traverseAndProcess(child);
        }
      });
    }
  };

  const traverseAndProcess3 = (element) => {
    if (element.nodeType === Node.ELEMENT_NODE) {
      if (element.tagName === 'P') {
        Array.from(element.childNodes).forEach(child => {
          if (child.nodeType === Node.ELEMENT_NODE && child.tagName === 'SPAN' && !child.classList.contains('cursor')) {
            handleTextElement(child);
          }
        });
      }
    if (element.textContent && element.tagName !== 'DIV') {
      handleTextElement(element);
    } else if (!element.textContent) {
      handleNonTextElement(element);
    } else {
      Array.from(element.childNodes).forEach(child => traverseAndProcess(child));
    }
      
    }
  };

  


  const setInitialCursor = () => {
    if (elements.current.length > 0 && cursor.current) {
      const firstElement = elements.current[0].parentElement;
      if (firstElement && firstElement.nodeType === Node.ELEMENT_NODE) {
        if (!firstElement.contains(cursor.current)) {
          firstElement.appendChild(cursor.current);
        }
      }
      cursor.current.style.display = 'inline';
    }
  };

  const setFinalCursor = () => {
    if (elements.current.length > 0 && cursor.current) {
      const lastElement = elements.current[elements.current.length - 1].parentElement;
      if (lastElement && lastElement.nodeType === Node.ELEMENT_NODE) {
        if (!lastElement.contains(cursor.current)) {
          lastElement.appendChild(cursor.current);
        }
        cursor.current.style.display = 'inline';
      }
    }
  };

  const makeInvisible = () => {
    const rootElement = document.querySelector('.typing-text');
    traverseAndProcess(rootElement);
    setInitialCursor();
    /*console.log('Original text after makeInvisible:', originalText.current);*/
  };


  const typeText = async () => {
    if (cursor.current) {cursor.current.classList.add('typing');}
    for (let i = 0; i < elements.current.length; i++) {
      const text = originalText.current.get(elements.current[i]);
      if (text) {
        await typeLine(elements.current[i], text);
      } else {
        elements.current[i].style.visibility = 'visible';
      }
    }
    if (cursor.current) {cursor.current.classList.remove('typing');}
    setFinalCursor();
    if (onTypingDone) { onTypingDone();}
  };

  const typeCharacter = (element, text, charIndex) => {
    element.textContent += text.charAt(charIndex);
  };
  
  const addCursor = (element) => {
    if (cursor.current) {
      if (!element.contains(cursor.current)) {
        if (element.tagName === 'SPAN') {
        element.appendChild(cursor.current);
        }
        else {
          element.parentElement.appendChild(cursor.current);
        }
      }
    }
  };

  const removeCursor = () => {
    if (cursor.current && cursor.current.parentElement) {
      cursor.current.parentElement.removeChild(cursor.current);
    }
  };

  const checkSpan = (element) => {};
  
  const typeLine = (element, text) => {
    return new Promise((resolve) => {
      let charIndex = 0;
      const interval = setInterval(() => {
        removeCursor();
        typeCharacter(element, text, charIndex);
        charIndex++;
        if (charIndex < text.length) {
          addCursor(element);
        }
        else {
          clearInterval(interval);
          resolve();
        }
      }, delayTime);
    });
  };
  

  useEffect(() => {
    makeInvisible();
    /*
    const atimer = setTimeout(() => {
      makeInvisible();
    }, 0);
    */
    const timer = setTimeout(() => {
      typeText();
    }, 1);

    return () => {
      /*clearTimeout(atimer);*/
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
