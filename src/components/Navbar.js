import React, { useEffect, useRef, useCallback, useLayoutEffect } from 'react';
import '../styles/Navbar.css';

const Navbar = ({ selectedIndex, onSelect, colorIndex, menuItems }) => {
  const colors = [
    'rgb(0, 255, 0)',   // Green
    'rgb(255, 0, 255)', // Pink
    'rgb(255, 255, 0)', // Yellow
    'rgb(0, 255, 255)', // Cyan
  ];

  const arrowRef = useRef(null);
  const itemRefs = useRef(menuItems.map(() => React.createRef()));

  const updateArrowPosition = useCallback(() => {
    const currentRef = itemRefs.current[selectedIndex];
    if (currentRef?.current && arrowRef.current) {
      const itemRect = currentRef.current.getBoundingClientRect();
      const arrowRect = arrowRef.current.getBoundingClientRect();
      const topPosition = currentRef.current.offsetTop + itemRect.height / 2 - arrowRect.height / 2;
      const leftPosition = currentRef.current.offsetLeft;
      arrowRef.current.style.top = `${topPosition}px`;
      arrowRef.current.style.left = `${leftPosition}px`;
      arrowRef.current.style.fontSize = window.getComputedStyle(currentRef.current).fontSize;
    }
  }, [selectedIndex]);

  useLayoutEffect(() => {
    updateArrowPosition(); 
  }, [updateArrowPosition]);

  useEffect(() => {
    const handleResize = () => updateArrowPosition();
    const resizeObserver = new ResizeObserver(() => updateArrowPosition());

    itemRefs.current.forEach((ref) => {
      if (ref.current) resizeObserver.observe(ref.current);
    });

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      resizeObserver.disconnect();
    };
  }, [updateArrowPosition]);

  return (
    <div className="navbar background-change" tabIndex="0">
      <div className="arrow" ref={arrowRef}>▶</div>
      <div className="navbar-container">
        {menuItems.map((item, index) => (
          <div
            key={item}
            ref={itemRefs.current[index]}
            className={`navbar-item ${selectedIndex === index ? 'active' : ''}`}
            onClick={() => onSelect(index)}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
