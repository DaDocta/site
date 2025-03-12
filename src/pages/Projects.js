import React, { useEffect, useState } from 'react';
import '../styles/Projects.css';
import projectData from '../data/json/projects.json';
import TypingText from '../components/TypingText.js';
import Carousel from '../components/Carousel.js';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [typingDone, setTypingDone] = useState(false);

  useEffect(() => {
    setProjects(projectData);
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
