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
      if (element.nodeName.toLowerCase() === 'pre') {
        const textContent = element.innerText;
        //console.log('Text content from <pre> element:', textContent);
        if (textContent) {
          originalText.current.set(element, textContent);
          //console.log(`Mapping <pre>: ${textContent}`);
          element.innerHTML = '';
          elements.current.push(element);
        }
      } else if (element.classList.contains('ascii-wrapper')) {
        const preElement = element.querySelector('pre');
        if (preElement) {
          const textContent = preElement.innerText;
          //console.log('Text content from <pre> inside .ascii-wrapper:', textContent);
          if (textContent) {
            originalText.current.set(preElement, textContent);
            //console.log(`Mapping <pre> inside .ascii-wrapper: ${textContent}`);
            preElement.innerHTML = '';
            elements.current.push(preElement);
          }
        }
      } else if (element.nodeName.toLowerCase() === 'p') {
        const textContent = element.innerText || element.textContent;
        //console.log('Text content from <p> element:', textContent);
        if (textContent) {
          originalText.current.set(element, textContent);
          //console.log(`Mapping <p>: ${textContent}`);
          element.innerHTML = '';
          elements.current.push(element);
        }
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
        firstElement.appendChild(cursor.current);
      }
      cursor.current.style.display = 'inline';
    }

    console.log('Original text after makeInvisible:', originalText.current);
  };

  const typeText = async () => {
    for (let i = 0; i < elements.current.length; i++) {
      const element = elements.current[i];
      const text = originalText.current.get(element);
      if (text) {
        await typeLine(element, text);
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
