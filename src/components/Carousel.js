import React, { useState, useEffect } from 'react';
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

    return (
        <div className={`carousel-container ${isClicked ? 'inverted' : ''}`}>
            <div className="carousel-controls previous">
                <a onClick={goToPrevious}>{'<'}</a>
            </div>
            <div className={`carousel-slide`} onClick={handleClick}>
                {isClicked ? (
                    <>
                        <p className='name'>{projects[currentIndex].name}</p>
                        <p className='description'>{projects[currentIndex].description}</p>
                    </>
                ) : (
                    <>
                        <p className='name'>{projects[currentIndex].name}</p>
                        <p className='progress'>Progress: {projects[currentIndex].progress}%</p>
                    </>
                )}
            </div>
            <div className="carousel-controls next">
                <a onClick={goToNext}>{'>'}</a>
            </div>
        </div>
    );
};

export default Carousel;
