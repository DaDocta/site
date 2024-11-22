import React, { useEffect, useRef, useCallback } from 'react';
import '../styles/Navbar.css';

const Navbar = ({ selectedIndex, onSelect, colorIndex, onColorChange, menuItems }) => {
  const arrowRef = useRef(null);
  const itemRefs = useRef(menuItems.map(() => React.createRef()));

  const updateArrowPosition = useCallback(() => {
    const currentRef = itemRefs.current[selectedIndex];
    if (currentRef && currentRef.current && arrowRef.current) {
      const item = currentRef.current;
      const itemRect = item.getBoundingClientRect();
      const parentRect = item.offsetParent.getBoundingClientRect();

      // Calculate top and left positions
      const topPosition =
        itemRect.top - parentRect.top + itemRect.height / 2 - arrowRef.current.offsetHeight / 2;
      const leftPosition = itemRect.left - parentRect.left;

      // Apply positions to the arrow
      arrowRef.current.style.top = `${topPosition}px`;
      arrowRef.current.style.left = `${leftPosition}px`;
    }
  }, [selectedIndex]);

  useEffect(() => {
    const handleInitialRender = () => {
      // Force update on load
      updateArrowPosition();

      // Delay further updates until layout stabilizes
      setTimeout(() => {
        updateArrowPosition();
      }, 50); // Small delay to ensure layout calculations stabilize
    };

    // Update position initially and after the first render
    handleInitialRender();

    // Add resize observer for responsive updates
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
