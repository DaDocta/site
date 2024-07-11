import React from 'react';
import TypingText from '../components/TypingText.js';

const Home = () => {
  const elements = [
    <p>Welcome to the Home section!</p>,
    <p>This is an example of typing text animation.</p>,
  ];

  return (
    <div>
      <TypingText elements={elements} />
    </div>
  );
};

export default Home;
