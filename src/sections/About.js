import React from 'react';
import '../styles/About.css';
import TypingText from '../components/TypingTextThird.js';
import AsciiWords from '../components/AsciiWords.js';
import imagine from '../assets/download.jpg';

const About = () => {
  return (
    <div className="about">
      <div className="container">
        <TypingText delayTime={30}>
          <div className="text-container">
            
          </div>
        </TypingText>
      </div>
    </div>
  );
};

export default About;