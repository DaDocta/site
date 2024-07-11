import React, { useState, useEffect } from 'react';

const TypingText = ({ elements, speed = 30 }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentElementIndex, setCurrentElementIndex] = useState(0);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  useEffect(() => {
    if (currentElementIndex < elements.length) {
      const currentElement = elements[currentElementIndex];
      const currentText = currentElement.props.children;
      if (currentTextIndex < currentText.length) {
        const timeout = setTimeout(() => {
          setDisplayedText((prev) => prev + currentText[currentTextIndex]);
          setCurrentTextIndex((prev) => prev + 1);
        }, speed);

        return () => clearTimeout(timeout);
      } else {
        setCurrentElementIndex((prev) => prev + 1);
        setCurrentTextIndex(0);
        setDisplayedText((prev) => prev + '\n');
      }
    }
  }, [currentElementIndex, currentTextIndex, elements, speed]);

  return (
    <div>
      {elements.slice(0, currentElementIndex + 1).map((element, index) => (
        React.cloneElement(element, { key: index, children: displayedText.split('\n')[index] })
      ))}
    </div>
  );
};

export default TypingText;
