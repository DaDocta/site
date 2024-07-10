// src/components/Navbar.js
import React, { useState, useEffect, useRef } from 'react';
import '../styles/Navbar.css';

const Navbar = ({ onSelect }) => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const menuItems = ['Home', 'About', 'Experience', 'Projects'];
    const arrowRef = useRef(null);
    const itemRefs = useRef(menuItems.map(() => React.createRef()));

    const handleKeyDown = (event) => {
        if (event.key === 'ArrowDown') {
            setSelectedIndex((prevIndex) => (prevIndex + 1) % menuItems.length);
        } else if (event.key === 'ArrowUp') {
            setSelectedIndex((prevIndex) => (prevIndex - 1 + menuItems.length) % menuItems.length);
        }
    };

    useEffect(() => {
        onSelect(menuItems[selectedIndex]);
        if (itemRefs.current[selectedIndex].current) {
            const itemStyle = window.getComputedStyle(itemRefs.current[selectedIndex].current);
            const itemHeight = itemRefs.current[selectedIndex].current.getBoundingClientRect().height;
            arrowRef.current.style.top = `${itemRefs.current[selectedIndex].current.offsetTop + itemHeight / 2 - arrowRef.current.clientHeight / 2}px`;
            arrowRef.current.style.fontSize = itemStyle.fontSize;  // Adjust the arrow's font size
        }
    }, [selectedIndex, onSelect]);

    return (
        <div className="navbar" tabIndex="0" onKeyDown={handleKeyDown}>
            <p className='title'>"Hi"</p>
                <div className="arrow" ref={arrowRef}>▶</div>
                {menuItems.map((item, index) => (
                    <div key={item} ref={itemRefs.current[index]} className="navbar-item">
                        {item}
                    </div>
                ))}
        </div>
    );
};

export default Navbar;
