import React, { useState, useEffect } from 'react';
import '../styles/About.css';
import TypingText from '../components/TypingTextThird.js';
import AsciiWords from '../components/AsciiWords.js';
import imagine from '../assets/download.jpg';
import resume from '../assets/resume.pdf';

const About = () => {
  const getCodingYears = () => {
    const currentYear = new Date().getFullYear();
    return currentYear - 2017;
  }

  const getStudentYears = () => {
    const currentYear = new Date().getFullYear();
    if (currentYear - 2023 >= 4) {
      return "graduated";
    }
    else {
      return "current";
    }
  }

  const conceptsList1 = ["Machine Learning", "Mobile Development", "Hardware Programming"];
  const conceptsList2 = ["Web Development", "Data Analysis", "Game Development"];

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
          <p>* I am a {getStudentYears()} student at the <span className="UK">University of Kentucky</span> (Computer Science B.S.)</p>
          <p>* Computer Science has been my primary language for well over <span className='year'>{getCodingYears()}</span> years</p>
          <p>* I have taken on many projects with topics that range from <span className="concept">{conceptsList1[index]}</span> to <span className="concept">{conceptsList2[index]}</span></p>
          <p>* Still curious? Check out my <a href={resume} download="Garrett_Strange_Resume" className='resume-link'>{'<'}resume{'>'}</a></p>
        </div>
      </TypingText>
    </div>
  );
};

export default About;
