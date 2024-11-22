import React, { useEffect, useRef, useCallback } from 'react';
import '../styles/Navbar.css';

const Navbar = ({ selectedIndex, onSelect, menuItems }) => {
  const arrowRef = useRef(null);
  const itemRefs = useRef(menuItems.map(() => React.createRef()));

  const updateArrowPosition = useCallback(() => {
    const currentRef = itemRefs.current[selectedIndex];
    if (currentRef && currentRef.current && arrowRef.current) {
      const item = currentRef.current;
      const itemRect = item.getBoundingClientRect();
      const parentRect = item.offsetParent.getBoundingClientRect();

      // Calculate the arrow's top position relative to its container
      const topPosition =
        itemRect.top - parentRect.top + itemRect.height / 2 - arrowRef.current.offsetHeight / 2;

      arrowRef.current.style.top = `${topPosition}px`;
      arrowRef.current.style.left = `-25px`; // Keep the arrow at a fixed left position
    }
  }, [selectedIndex]);

  useEffect(() => {
    const handleInitialRender = () => {
      updateArrowPosition();
      setTimeout(() => {
        updateArrowPosition();
      }, 50); // Small delay to allow layout stabilization
    };

    // Update position initially and on layout changes
    handleInitialRender();

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
    <div className="navbar" tabIndex="0">
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
