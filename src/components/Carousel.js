import React, { useState, useEffect } from 'react';
import { FaDownload, FaLink } from 'react-icons/fa';
import '../styles/Carousel.css';

const Carousel = ({ projects, canClick }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isLandscape, setIsLandscape] = useState(window.innerWidth > window.innerHeight);
    const [isClicked, setIsClicked] = useState(false);

    const goToPrevious = () => {
        if (!canClick) return;
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? projects.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
        setIsClicked(false);
    };

    const goToNext = () => {
        if (!canClick) return;
        const isLastSlide = currentIndex === projects.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
        setIsClicked(false);
    };

    const updateOrientation = () => {
        setIsLandscape(window.innerWidth > window.innerHeight);
    };

    const handleClick = () => {
        if (!canClick) return;
        setIsClicked(!isClicked);
    };

    useEffect(() => {
        window.addEventListener('resize', updateOrientation);
        return () => {
            window.removeEventListener('resize', updateOrientation);
        };
    }, []);

    if (!projects || projects.length === 0) {
        return <div>No projects available</div>;
    }

    const { name, description, progress, link } = projects[currentIndex];

    return (
        <div className={`carousel ${isClicked ? 'inverted' : ''}`}>
            <div className="carousel-controls previous">
                <a onClick={goToPrevious}>{'<'}</a>
            </div>
            <div className={`container`} onClick={handleClick}>
                {isClicked ? (
                    <div className="slide">
                        <p className="name">{name}</p>
                        <p className="description">{description}</p>
                        {link && (
                            <a
                                href={link.url}
                                target={link.type === 'site' ? '_blank' : '_self'}
                                download={link.type === 'download' ? true : undefined}
                                className="project-link"
                                title={link.type === 'download' ? 'Download file' : 'Visit site'}
                            >
                                {isLandscape ? (
                                    link.type === 'download' ? 'Download here' : 'Visit site'
                                ) : (
                                    link.type === 'download' ? <FaDownload /> : <FaLink />
                                )}
                            </a>
                        )}
                    </div>
                ) : (
                    <div className="slide">
                        <p className="name">{name}</p>
                        <p className="progress">Progress: {progress}%</p>
                    </div>
                )}
            </div>
            <div className="carousel-controls next">
                <a onClick={goToNext}>{'>'}</a>
            </div>
        </div>
    );
};

export default Carousel;
