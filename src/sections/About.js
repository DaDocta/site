import React from 'react';
import '../styles/About.css';
import TypingText from '../components/TypingText.js';
import { getAsciiArt } from '../components/AsciiWords.js';

const About = () => {
  return (
    <div>
      <TypingText>
        <p className='cutie'>Hello, my name is</p>
        <div className="ascii-art">{getAsciiArt('Garrett Strange')}</div>
        <p>Welcome to my portfolio!</p>
      </TypingText>
    </div>
  );
};

export default About;
