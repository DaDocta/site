import React, { useState, useEffect } from 'react';
import '../styles/About.css';
import TypingText from '../components/TypingText.js';
import resume from '../assets/resume.pdf';

const About = () => {
  const getCodingYears = () => {
    const currentYear = new Date().getFullYear();
    return currentYear - 2017;
  };

  const getStudentYears = () => {
    const currentYear = new Date().getFullYear();
    if (currentYear - 2023 >= 4) {
      return 'graduated';
    } else {
      return 'current';
    }
  };

  const conceptsList1 = ['Machine Learning', 'Mobile Development', 'Hardware Programming'];
  const conceptsList2 = ['Web Development', 'Data Analysis', 'Game Development'];

  const [index, setIndex] = useState(0);
  const [glitching, setGlitching] = useState(false);
  const [typingDone, setTypingDone] = useState(false); // Tracks if typing is done
  const [currentConcept1, setCurrentConcept1] = useState(conceptsList1[0]);
  const [currentConcept2, setCurrentConcept2] = useState(conceptsList2[0]);

  useEffect(() => {
    if (!typingDone) return; // Prevent glitches until typing is complete

    const interval = setInterval(() => {
      setGlitching(true); // Trigger glitch animation
      setTimeout(() => {
        // Switch concepts after glitch ends
        setIndex((prevIndex) => {
          const newIndex = (prevIndex + 1) % conceptsList1.length;
          setCurrentConcept1(conceptsList1[newIndex]);
          setCurrentConcept2(conceptsList2[newIndex]);
          return newIndex;
        });
        setGlitching(false); // End glitch effect
      }, 400); // Glitch duration (sudden movement)
    }, 3000); // Interval for switching concepts

    return () => clearInterval(interval);
  }, [typingDone, conceptsList1, conceptsList2]);

  return (
    <div className="about">
      <TypingText onTypingDone={() => setTypingDone(true)}> {/* Notify when typing finishes */}
        <div className="text-container">
          <p>
            * I am a {getStudentYears()} student at the{' '}
            <span className="UK">University of Kentucky</span> (Computer Science B.S.)
          </p>
          <p>
            * Computer Science has been my primary language for well over{' '}
            <span className="year">{getCodingYears()}</span> years
          </p>
          <p>
            * I have taken on many projects with topics that range from{' '}
            <span
              className={`concept concept1 ${glitching ? 'glitch1-active' : ''}`}
              data-text={currentConcept1}
            >
              {currentConcept1}
            </span>{' '}
            to{' '}
            <span
              className={`concept concept2 ${glitching ? 'glitch2-active' : ''}`}
              data-text={currentConcept2}
            >
              {currentConcept2}
            </span>
          </p>
          <p>
            * Still curious? Why not click on my{' '}
            <a href={resume} download="Garrett_Strange_Resume" className="resume-link">
              resume
            </a>
            ?
          </p>
        </div>
      </TypingText>
    </div>
  );
};

export default About;
