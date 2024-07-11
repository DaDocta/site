import React from 'react';
import TypingText from '../components/TypingText';

const About = () => {
  const elements = [
    <p>This is the About section.</p>,
    <p>Learn more about us here.</p>,
  ];

  return (
    <div>
      <TypingText elements={elements} />
    </div>
  );
};

export default About;
