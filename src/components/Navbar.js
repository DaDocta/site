import React, { useEffect, useRef, useCallback } from 'react';
import '../styles/Navbar.css';

const Navbar = ({ selectedIndex, onSelect, colorIndex, onColorChange, menuItems }) => {
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
    if (currentRef && currentRef.current) {
      const itemStyle = window.getComputedStyle(currentRef.current);
      const itemHeight = currentRef.current.getBoundingClientRect().height;
      const arrowHeight = arrowRef.current ? arrowRef.current.clientHeight : 0;
      const topPosition = currentRef.current.offsetTop + itemHeight / 2 - arrowHeight / 2;
      const leftPosition = currentRef.current.offsetLeft; // Adjust the offset for the arrow
      arrowRef.current.style.top = `${topPosition}px`;
      arrowRef.current.style.left = `${leftPosition}px`; // Set the left position of the arrow
      arrowRef.current.style.fontSize = itemStyle.fontSize; // Ensure arrow font size matches
    }
  }, [selectedIndex, menuItems.length]);

  useEffect(() => {
    updateArrowPosition();
    setTimeout(() => {
      updateArrowPosition();
    }, 0);
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
  }, [selectedIndex, updateArrowPosition]);

  return (
    <div className="navbar background-change" tabIndex="0">
      <div className="arrow" ref={arrowRef}>▶</div>
      <div className='navbar-container'>
        {menuItems.map((item, index) => (
          <div key={item} ref={itemRefs.current[index]} className={`navbar-item ${selectedIndex === index ? 'active' : ''}`} onClick={() => onSelect(index)}>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
