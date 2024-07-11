import React from 'react';
import TypingText from '../components/TypingText';

const Experience = () => {
  const elements = [
    <p>Here is some information about my Experience.</p>,
    <p>I have worked on various projects and roles.</p>,
  ];

  return (
    <div>
      <TypingText elements={elements} />
    </div>
  );
};

export default Experience;
