import React, { useState, useEffect } from 'react';
import '../styles/Contact.css';
import TypingText from '../components/TypingText.js';

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
        <p>* Are you in need of a website for your business?</p>
        <p>* Does your device have a <a href='https://www.google.com/search?tbm=isch&q=bug' className='bug'>bug</a> in it?</p>
        <p>* {isPortrait ? 'Does swiping' : 'Do the arrow keys'}  change the website color?</p>
        <a href="mailto:garrett.strange@yahoo.com" className='email'>Click <u>here</u> to shoot me an email</a>
      </TypingText>
    </div>
  );
};

export default Contact;
