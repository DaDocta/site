// src/components/Navbar.js
import React, { useEffect, useRef, useCallback } from 'react';
import '../styles/Navbar.css';

const Navbar = ({ selectedIndex, onSelect }) => {
  const menuItems = ['Home', 'About', 'Experience', 'Projects'];
  const arrowRef = useRef(null);
  const itemRefs = useRef(menuItems.map(() => React.createRef()));

  const updateArrowPosition = useCallback(() => {
    const currentRef = itemRefs.current[selectedIndex];
    if (currentRef && currentRef.current) {
      const itemStyle = window.getComputedStyle(currentRef.current);
      const itemHeight = currentRef.current.getBoundingClientRect().height;
      const arrowHeight = arrowRef.current ? arrowRef.current.clientHeight : 0;
      const topPosition = currentRef.current.offsetTop + itemHeight / 2 - arrowHeight / 2;
      arrowRef.current.style.top = `${topPosition}px`;
      arrowRef.current.style.fontSize = itemStyle.fontSize; // Ensure arrow font size matches
    }
  }, [selectedIndex]);

  useEffect(() => {
    updateArrowPosition();
  }, [selectedIndex, updateArrowPosition]);

  const handleKeyDown = useCallback((event) => {
    if (event.key === 'ArrowDown') {
      onSelect((prevIndex) => (prevIndex + 1) % menuItems.length);
    } else if (event.key === 'ArrowUp') {
      onSelect((prevIndex) => (prevIndex - 1 + menuItems.length) % menuItems.length);
    }
  }, [onSelect, menuItems.length]);

  useEffect(() => {
    const handleGlobalKeyDown = (event) => {
      event.preventDefault();
      handleKeyDown(event);
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => {
      window.removeEventListener('keydown', handleGlobalKeyDown);
    };
  }, [handleKeyDown]);

  const handleClick = (index) => {
    onSelect(index);
  };

  return (
    <div className="navbar" tabIndex="0">
      <p className='title'>Hi</p>
      <div className="arrow" ref={arrowRef}>▶</div>
      <div className='navbar-container'>
        {menuItems.map((item, index) => (
          <div key={item} ref={itemRefs.current[index]} className={`navbar-item ${selectedIndex === index ? 'active' : ''}`} onClick={() => handleClick(index)}>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
