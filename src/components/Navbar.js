import React, { useState, useEffect, useRef } from 'react';
import '../styles/Navbar.css';

const Navbar = ({ onSelect }) => {
    const [selectedIndex, setSelectedIndex] = useState(0); // Set initial index to 1 for "About"
    const menuItems = ['Home', 'About', 'Experience', 'Projects'];
    const arrowRef = useRef(null);
    const itemRefs = useRef(menuItems.map(() => React.createRef()));

    const updateArrowPosition = () => {
        const currentRef = itemRefs.current[selectedIndex];
        if (currentRef && currentRef.current) {
            const itemStyle = window.getComputedStyle(currentRef.current);
            const itemHeight = currentRef.current.getBoundingClientRect().height;
            arrowRef.current.style.top = `${currentRef.current.offsetTop + itemHeight / 2 - arrowRef.current.clientHeight / 2}px`;
            arrowRef.current.style.fontSize = itemStyle.fontSize; // Ensure arrow font size matches
        }
    };

    useEffect(() => {
        console.log('Initial render');
        const atimer = setTimeout(() => {
            console.log('Timer triggered');
            setSelectedIndex(0);
            
        }, 3000);
        return () => clearTimeout(atimer);

    }, []);

    useEffect(() => {
        // Update arrow position when selectedIndex changes
        updateArrowPosition();
        onSelect(menuItems[selectedIndex]);
    }, [selectedIndex]);

    const handleKeyDown = (event) => {
        if (event.key === 'ArrowDown') {
            setSelectedIndex(prevIndex => (prevIndex + 1) % menuItems.length);
        } else if (event.key === 'ArrowUp') {
            setSelectedIndex(prevIndex => (prevIndex - 1 + menuItems.length) % menuItems.length);
        }
    };

    return (
        <div className="navbar" tabIndex="0" onKeyDown={handleKeyDown}>
            <p className='title'>Hi</p>
            <div className="arrow" ref={arrowRef}>▶</div>
            <div className='navbar-container'>
                {menuItems.map((item, index) => (
                    <div key={item} ref={itemRefs.current[index]} className="navbar-item">
                        {item}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Navbar;
