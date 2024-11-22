import React, { useEffect, useRef, useCallback } from 'react';
import '../styles/Navbar.css';

const Navbar = ({ selectedIndex, onSelect, colorIndex, onColorChange, menuItems }) => {
  const arrowRef = useRef(null);
  const itemRefs = useRef(menuItems.map(() => React.createRef()));

  const updateArrowPosition = useCallback(() => {
    const currentRef = itemRefs.current[selectedIndex];
    if (currentRef && currentRef.current && arrowRef.current) {
      const itemHeight = currentRef.current.offsetHeight;
      const itemTop = currentRef.current.getBoundingClientRect().top + window.scrollY; // Account for scroll
      const navbarTop = currentRef.current.offsetParent.offsetTop + window.scrollY;
      const arrowHeight = arrowRef.current.offsetHeight;

      const topPosition = itemTop - navbarTop + itemHeight / 2 - arrowHeight / 2;
      arrowRef.current.style.top = `${topPosition}px`;
      arrowRef.current.style.left = `${currentRef.current.offsetLeft}px`;
    }
  }, [selectedIndex]);

  useEffect(() => {
    const onWindowLoad = () => {
      updateArrowPosition();
    };

    // Ensure position updates after full page load
    window.addEventListener('load', onWindowLoad);

    // Initial positioning
    updateArrowPosition();

    // Resize observer for dynamic adjustments
    const resizeObserver = new ResizeObserver(() => {
      updateArrowPosition();
    });
    itemRefs.current.forEach(ref => {
      if (ref.current) {
        resizeObserver.observe(ref.current);
      }
    });

    return () => {
      window.removeEventListener('load', onWindowLoad);
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
