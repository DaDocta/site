import React, { useEffect, useLayoutEffect, useRef, useCallback } from 'react';
import '../styles/Navbar.css';

const Navbar = ({ selectedIndex, onSelect, colorIndex, onColorChange, menuItems }) => {
  const colors = [
    'rgb(0, 255, 0)',   // Green
    'rgb(255, 0, 255)', // Pink
    'rgb(255, 255, 0)', // Yellow
    'rgb(0, 255, 255)', // Cyan
  ];

  const arrowRef = useRef(null);
  const itemRefs = useRef([]);

  // Update itemRefs whenever menuItems change
  useEffect(() => {
    itemRefs.current = menuItems.map((_, i) => itemRefs.current[i] || React.createRef());
  }, [menuItems]);

  const updateArrowPosition = useCallback(() => {
    requestAnimationFrame(() => {
      const currentRef = itemRefs.current[selectedIndex];
      if (currentRef && currentRef.current && arrowRef.current) {
        const itemStyle = window.getComputedStyle(currentRef.current);
        const itemRect = currentRef.current.getBoundingClientRect();
        const navbarRect = currentRef.current.parentNode.getBoundingClientRect();
        const arrowHeight = arrowRef.current.clientHeight;
        const topPosition = itemRect.top - navbarRect.top + itemRect.height / 2 - arrowHeight / 2;
        const leftPosition = itemRect.left - navbarRect.left; // Adjust the offset for the arrow
        arrowRef.current.style.top = `${topPosition}px`;
        arrowRef.current.style.left = `${leftPosition}px`; // Set the left position of the arrow
        arrowRef.current.style.fontSize = itemStyle.fontSize; // Ensure arrow font size matches
      }
    });
  }, [selectedIndex]);

  useLayoutEffect(() => {
    updateArrowPosition();
    const resizeObserver = new ResizeObserver(() => {
      updateArrowPosition();
    });
    itemRefs.current.forEach(ref => {
      if (ref.current) {
        resizeObserver.observe(ref.current);
      }
    });
    return () => {
      resizeObserver.disconnect();
    };
  }, [selectedIndex, updateArrowPosition, menuItems]);

  return (
    <div className="navbar background-change" tabIndex="0">
      <div className="arrow" ref={arrowRef}>▶</div>
      <div className='navbar-container'>
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
