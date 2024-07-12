import React, { useEffect, useState } from 'react';
import '../styles/TypingText.css'; // Ensure you have the correct path to your CSS file

const TypingText = ({ children, duration = 3000 }) => {
  const [currentLine, setCurrentLine] = useState(-1);

  const makeInvisible = (element) => {
    if (element && element.style) {
      element.style.clipPath = 'inset(0 100% 0 0)';
    }
  };

  const makeVisible = (element) => {
    return new Promise((resolve) => {
      if (element && element.style) {
        element.style.transition = `clip-path ${duration}ms linear`;
        element.style.clipPath = 'inset(0 0 0 0)';
        setTimeout(() => {
          resolve();
        }, duration);
      }
    });
  };

  const processLines = async (lines) => {
    for (let i = 0; i < lines.length; i++) {
      setCurrentLine(i);
      await makeVisible(lines[i]);
    }
    setCurrentLine(-1); // Hide cursor after all lines are processed
  };

  useEffect(() => {
    const elements = document.querySelectorAll('.typing-text-line');
    elements.forEach(makeInvisible);

    // Start making each line visible one at a time with a very short initial delay
    setTimeout(() => {
      processLines(elements);
    }, 1);
  }, [duration]);

  return (
    <div className="typing-text">
      {React.Children.map(children, (child, index) => (
        <div key={index} className="typing-text-line">
          {child}
          {/*{index === currentLine && <span className="cursor"></span>}*/}
        </div>
      ))}
    </div>
  );
};

export default TypingText;
