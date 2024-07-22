import React, { useState, useEffect } from 'react';
import '../styles/Contact.css';
import TypingText from '../components/TypingTextThird.js';
import AsciiWords from '../components/AsciiWords.js';

const Contact = () => {
  const [isPortrait, setIsPortrait] = useState(window.innerHeight > window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setIsPortrait(window.innerHeight > window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);

  return (
    <div className='contact'>
      <TypingText>
        <p>* Do you have an idea to enhance software?</p>
        <p>* Are you in need of a website for your business?</p>
        <p>* Does your app have a <a href='https://www.google.com/search?tbm=isch&q=bug' className='bug'>bug</a> in it?</p>
        <p>* {isPortrait ? 'Is swiping' : 'Are arrow keys'}  changing the website color?</p>
        <p className='call'>Call me now at (859) 250-7142</p>
        <a href="mailto:garrett.strange@yahoo.com" className='email'>Otherwise click <u>here</u> to email me</a>
      </TypingText>
    </div>
  );
};

export default Contact;
