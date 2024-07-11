import React, { useState, useEffect, useRef } from 'react';
import '../styles/Navbar.css';

const Navbar = ({ onSelect }) => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const menuItems = ['Home', 'About', 'Experience', 'Projects'];
    const arrowRef = useRef(null);
    const itemRefs = useRef(menuItems.map(() => React.createRef()));
    const navbarRef = useRef(null);

    const updateArrowPosition = () => {
        const currentRef = itemRefs.current[selectedIndex];
        if (currentRef && currentRef.current) {
            const itemStyle = window.getComputedStyle(currentRef.current);
            const itemHeight = currentRef.current.getBoundingClientRect().height;
            const arrowHeight = arrowRef.current ? arrowRef.current.clientHeight : 0;
            const topPosition = currentRef.current.offsetTop + itemHeight / 2 - arrowHeight / 2;
            arrowRef.current.style.top = `${topPosition}px`;
            arrowRef.current.style.fontSize = itemStyle.fontSize; // Ensure arrow font size matches
        }
    };

    useEffect(() => {
        // Update arrow position when selectedIndex changes
        updateArrowPosition();
        onSelect(menuItems[selectedIndex]);
    }, [selectedIndex, onSelect]);

    useEffect(() => {
        // Update arrow position after the initial render and when component is fully rendered
        updateArrowPosition();
    }, []);

    const handleKeyDown = (event) => {
        if (event.key === 'ArrowDown') {
            setSelectedIndex(prevIndex => (prevIndex + 1) % menuItems.length);
        } else if (event.key === 'ArrowUp') {
            setSelectedIndex(prevIndex => (prevIndex - 1 + menuItems.length) % menuItems.length);
        }
    };

    const handleClick = (index) => {
        setSelectedIndex(index);
    };

    useEffect(() => {
        const handleGlobalKeyDown = (event) => {
            // Prevent default to avoid multiple handlers conflict
            event.preventDefault();
            handleKeyDown(event);
        };

        window.addEventListener('keydown', handleGlobalKeyDown);
        return () => {
            window.removeEventListener('keydown', handleGlobalKeyDown);
        };
    }, []);

    return (
        <div className="navbar" ref={navbarRef} tabIndex="0">
            <p className='title'>Hi</p>
            <div className="arrow" ref={arrowRef}>▶</div>
            <div className='navbar-container'>
                {menuItems.map((item, index) => (
                    <div
                        key={item}
                        ref={itemRefs.current[index]}
                        className={`navbar-item ${selectedIndex === index ? 'active' : ''}`}
                        onClick={() => handleClick(index)}
                    >
                        {item}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Navbar;
