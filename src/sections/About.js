import React, { useState, useEffect } from 'react';
import '../styles/About.css';
import TypingText from '../components/TypingTextThird.js';
import AsciiWords from '../components/AsciiWords.js';
import imagine from '../assets/download.jpg';

const About = () => {
  const getCodingYears = () => {
    const currentYear = new Date().getFullYear();
    return currentYear - 2017;
  }

  const getStudentYears = () => {
    const currentYear = new Date().getFullYear();
    if (currentYear - 2023 >= 4) {
      return "Graduated";
    }
    else {
      return "Current";
    }
  }

  const conceptsList1 = ["Object-Oriented Programming", "Functional Programming", "Data Structures", "Algorithms"];
  const conceptsList2 = ["Web Development", "Mobile Development", "Database Management", "Machine Learning"];

  const [index, setIndex] = useState(0);
  const [typingDone, setTypingDone] = useState(false);

  useEffect(() => {
    if (typingDone) {
      const interval = setInterval(() => {
        setIndex(prevIndex => (prevIndex + 1) % conceptsList1.length);
      }, 2000); // Change item every 3 seconds

      return () => clearInterval(interval);
    }
  }, [typingDone, conceptsList1.length]);

  const handleTypingDone = () => {
    setTypingDone(true);
  };

  return (
    <div className="about">
      <TypingText delayTime={30} onTypingDone={handleTypingDone}>
        <div className="text-container">
          <p>* {getStudentYears()} student at the <span className="UK">University of Kentucky</span></p>
          <p>* Coding for well over <span className='year'>{getCodingYears()}</span> years</p>
          <p>* Worked on many projects that range from <span className="concept">{conceptsList1[index]}</span> to <span className="concept">{conceptsList2[index]}</span></p>
          <p>...</p>
          <p>...</p>
          <p>...</p>
          <p>...</p>
        </div>
      </TypingText>
    </div>
  );
};

export default About;
