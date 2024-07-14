import React from 'react';
import '../styles/Home.css';
import TypingText from '../components/TypingTextThird.js';
import AsciiWords from '../components/AsciiWords.js';

const Home = () => {
  return (
    <div className="home">
      <div className="container">
        <TypingText delayTime={30}>
          <div className="text-container">
            <p className="greeting-text">Hello, my name is</p>
          </div>
          <div className="ascii-container">
            <AsciiWords keyName="Garrett Strange" className="Garrett" />
          </div>
        </TypingText>
      </div>
    </div>
  );
};

export default Home;
