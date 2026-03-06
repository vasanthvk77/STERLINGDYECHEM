import React, { useEffect, useRef, useState } from 'react';
import '../styles/animations.css';

const CustomCursor = () => {
    const particlesRef = useRef([]);

    useEffect(() => {
        const moveCursor = (e) => {
            const { clientX, clientY } = e;

            // DROPS - Instant follow (no delay) to maintain exact cardinal positions
            particlesRef.current.forEach((p) => {
                if (p) {
                    p.style.left = `${clientX}px`;
                    p.style.top = `${clientY}px`;
                }
            });
        };

        window.addEventListener('mousemove', moveCursor);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
        };
    }, []);

    return (
        <div className="custom-cursor-container">
            {/* 6 Cardinal/Hexagonal Rain Drops */}
            {[...Array(6)].map((_, i) => (
                <div
                    key={i}
                    ref={el => particlesRef.current[i] = el}
                    className={`cursor-drop d-${i}`}
                />
            ))}
        </div>
    );
};

export default CustomCursor;
