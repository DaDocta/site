import React, { useEffect, useRef, useCallback } from 'react';
import '../styles/Navbar.css';

const Navbar = ({ selectedIndex, onSelect, menuItems }) => {
  const arrowRef = useRef(null);
  const itemRefs = useRef([]);

  // Initialize refs for each menu item dynamically
  useEffect(() => {
    itemRefs.current = menuItems.map((_, index) => itemRefs.current[index] || React.createRef());
  }, [menuItems]);

  const updateArrowPosition = useCallback(() => {
    const currentRef = itemRefs.current[selectedIndex];
    if (currentRef && currentRef.current) {
      const itemStyle = window.getComputedStyle(currentRef.current);
      const itemRect = currentRef.current.getBoundingClientRect();
      const arrowHeight = arrowRef.current ? arrowRef.current.clientHeight : 0;

      // Vertical positioning: center the arrow with the menu item
      const topPosition = currentRef.current.offsetTop + itemRect.height / 2 - arrowHeight / 2;

      // Horizontal positioning: align with the left edge of the item
      const leftPosition = currentRef.current.offsetLeft - arrowRef.current.offsetWidth - 10; // Adjust spacing as needed

      arrowRef.current.style.top = `${topPosition}px`;
      arrowRef.current.style.left = `${leftPosition}px`;
      arrowRef.current.style.fontSize = itemStyle.fontSize; // Ensure arrow font size matches
    }
  }, [selectedIndex]);

  useEffect(() => {
    const timer = setTimeout(() => {
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
      clearTimeout(timer);
      resizeObserver.disconnect();
    };
  }, [selectedIndex, menuItems, updateArrowPosition]);

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
