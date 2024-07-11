import React from 'react';
import TypingText from '../components/TypingText';

const Projects = () => {
  const elements = [
    <p>These are some of my Projects.</p>,
    <p>Check them out below.</p>,
  ];

  return (
    <div>
      <TypingText elements={elements} />
    </div>
  );
};

export default Projects;
