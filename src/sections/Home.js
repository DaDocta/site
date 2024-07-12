import React from 'react';
import '../styles/Home.css';
import TypingText from '../components/TypingText.js';
import { getAsciiArt } from '../components/AsciiWords.js';

const Home = () => {
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

export default Home;