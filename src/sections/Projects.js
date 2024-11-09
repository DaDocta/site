import React, { useEffect, useState } from 'react';
import '../styles/Projects.css';
import TypingText from '../components/TypingText.js';
import AsciiWords from '../components/AsciiWords.js';
import imagine from '../assets/download.jpg';
import projectJson from '../assets/json/projects.json';
import Carousel from '../components/Carousel.js';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [typingDone, setTypingDone] = useState(false);

  useEffect(() => {
    setProjects(projectJson);
  }, []);

  const handleTypingDone = () => {
    setTypingDone(true);
  };

  return (
    <div className='projects'>
      <TypingText onTypingDone={handleTypingDone}>
        <p>Here are a few of my current projects: </p>
        <Carousel projects={projects} canClick={typingDone} />
        <p>Those are my ongoing projects</p>
      </TypingText>
    </div>
  );
};

export default Projects;
