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
    } else {
      return "current";
    }
  }

  const conceptsList1 = ["Machine Learning", "Mobile Development", "Hardware Programming"];
  const conceptsList2 = ["Web Development", "Data Analysis", "Game Development"];

  const [index, setIndex] = useState(0);
  const [typingDone, setTypingDone] = useState(false);
  const [randomPercent1, setRandomPercent1] = useState(null);
  const [randomPercent2, setRandomPercent2] = useState(null);

  useEffect(() => {
    if (typingDone) {
      const interval = setInterval(() => {
        setIndex(prevIndex => (prevIndex + 1) % conceptsList1.length);
        setRandomMovementKeyframes();
      }, 3000); // Change item every 3 seconds

      return () => clearInterval(interval);
    }
  }, [typingDone, conceptsList1.length]);

  const handleTypingDone = () => {
    setTypingDone(true);
    setRandomMovementKeyframes();
  };

  const setRandomMovementKeyframes = () => {
    const newRandomPercent1 = Math.floor(Math.random() * 98) + 2;
    const newRandomPercent2 = Math.floor(Math.random() * 98) + 2;
    setRandomPercent1(newRandomPercent1);
    setRandomPercent2(newRandomPercent2);

    const styleSheet = document.styleSheets[0];
    
    // Remove the existing keyframes rule if it exists
    for (let i = styleSheet.cssRules.length - 1; i >= 0; i--) {
      const rule = styleSheet.cssRules[i];
      if (rule.name === 'movement1' || rule.name === 'movement2') {
        styleSheet.deleteRule(i);
      }
    }

    // Insert new keyframes rule with random percentage
    const keyframes1 = `
      @keyframes movement1 {
        0%, ${newRandomPercent1 - 1}%, ${newRandomPercent1 + 1}% {
          top: 0px;
          left: 0px;
        }
      
        ${newRandomPercent1}% {
          top: -40px;
          left: -40px;
        }
      }
    `;

    const keyframes2 = `
      @keyframes movement2 {
        0%, ${newRandomPercent2 - 1}%, ${newRandomPercent2 + 1}% {
          top: 0px;
          left: 0px;
        }
      
        ${newRandomPercent2}% {
          top: 30px;
          left: 30px;
        }
      }
    `;

    styleSheet.insertRule(keyframes1, styleSheet.cssRules.length);
    styleSheet.insertRule(keyframes2, styleSheet.cssRules.length);
  };

  return (
    <div className="about">
      <TypingText delayTime={30} onTypingDone={handleTypingDone}>
        <div className="text-container">
          <p>* I am a {getStudentYears()} student at the <span className="UK">University of Kentucky</span> (Computer Science B.S.)</p>
          <p>* Computer Science has been my primary language for well over <span className='year'>{getCodingYears()}</span> years</p>
          <p>* I have taken on many projects with topics that range from <span className="concept1">{conceptsList1[index]}</span> to <span className="concept2">{conceptsList2[index]}</span></p>
          <p>* Still curious? Why not click on my <a href={resume} download="Garrett_Strange_Resume" className='resume-link'>resume</a>?</p>
        </div>
      </TypingText>
    </div>
  );
};

export default About;
