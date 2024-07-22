import React from 'react';
import '../styles/Partnerships.css';
import TypingText from '../components/TypingTextThird.js';
import AsciiWords from '../components/AsciiWords.js';

const Partnerships = ({ navigateToSection }) => {
  return (
    <div className="partnerships">
      <TypingText>
        <p>* Currently, all of my creations and ongoing projects have been developed independently.</p>
        <p>* However, I am open to involvement or collaboration on any software projects or ideas.</p>
        <a className="connect" onClick={() => navigateToSection('Contact')}>* Interested in collaborating? Have a project in mind? Click <u>here</u> to connect.</a>
      </TypingText>
    </div>
  );
};

export default Partnerships;
