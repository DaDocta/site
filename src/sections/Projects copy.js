import React, { useEffect, useState } from 'react';
import '../styles/Projects.css';
import TypingText from '../components/TypingTextThird.js';
import AsciiWords from '../components/AsciiWords.js';
import imagine from '../assets/download.jpg';
import projectJson from '../assets/json/projects.json';
import Carousel from '../components/Carousel.js';

const Projects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    setProjects(projectJson);
  }, []);

  return (
    <div className='projects'>
      <TypingText>
        <p>Here are a few of my current projects: </p>
        <p> </p>
        {projects.map((project, index) => (
          <p key={index}>
            <span className='projectName'>* {project.name}: </span>{project.description} ({project.progress}%)
          </p>
        ))}
      </TypingText>
    </div>
  );
};

export default Projects;
