import React from 'react';
import '../styles/Home.css';
import TypingText from '../components/TypingTextThird.js';
import AsciiWords from '../components/AsciiWords.js';
import imagine from '../assets/download.jpg';

const Home = () => {
  return (
    <div className="home">
      <div className="container">
        <TypingText delayTime={10}>
          <p className="greeting-text">Hello, my name is</p>
          <div className="ascii-wrapper">
            <AsciiWords keyName="Garrett Strange" className="Garrett" />
          </div>
        </TypingText>
      </div>
    </div>
  );
};

export default Home;
