import React from 'react';
import '../styles/Home.css';
import TypingTextSecond from '../components/TypingTextSecond.js';
import { getAsciiArt } from '../components/AsciiWords.js';
import image from '../assets/download.jpg';

const Home = () => {
  return (
    <div>
      <TypingTextSecond>
        <p className='cutie'>Hello, my name is</p>
        <div className="ascii-art">{getAsciiArt('Garrett Strange')}</div>
        <p className='bet'>Welcome to my portfolio!</p>
        <img src={image}></img>
        <a href='https://www.google.com/'>Check</a>
      </TypingTextSecond>
    </div>
  );
};

export default Home;