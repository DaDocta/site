import React from 'react';
import '../styles/Home.css';
import TypingText from '../components/TypingText.js';
import AsciiWords from '../components/AsciiWords.js';
import imagine from '../assets/download.jpg';

const Home = () => {
  return (
    <div>
      <TypingText delayTime={10}>
        <p className='cutie'>Hello, my name is</p>
        <AsciiWords keyName="Garrett Strange" className='Garrett'/>
      </TypingText>
    </div>
  );
};

export default Home;
