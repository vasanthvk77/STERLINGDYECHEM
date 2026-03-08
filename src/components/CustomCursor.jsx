import React, { useEffect, useRef } from 'react';
import '../styles/animations.css';

const CustomCursor = () => {
    const cursorRef = useRef(null);

    useEffect(() => {
        let animationFrameId;

        const moveCursor = (e) => {
            const clientX = e.clientX || (e.touches && e.touches[0].clientX);
            const clientY = e.clientY || (e.touches && e.touches[0].clientY);

            if (clientX === undefined || clientY === undefined) return;

            // Use requestAnimationFrame for smooth, non-blocking rendering
            if (animationFrameId) cancelAnimationFrame(animationFrameId);

            animationFrameId = requestAnimationFrame(() => {
                if (cursorRef.current) {
                    // Use GPU-accelerated translate3d instead of expensive left/top
                    cursorRef.current.style.transform = `translate3d(${clientX}px, ${clientY}px, 0)`;
                }
            });
        };

        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('touchstart', moveCursor);
        window.addEventListener('touchmove', moveCursor);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('touchstart', moveCursor);
            window.removeEventListener('touchmove', moveCursor);
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div className="custom-cursor-container">
            <div
                ref={cursorRef}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    pointerEvents: 'none',
                    willChange: 'transform' // Hints browser to optimize this layer
                }}
            >
                {/* 6 Cardinal/Hexagonal Rain Drops */}
                {[...Array(6)].map((_, i) => (
                    <div
                        key={i}
                        className={`cursor-drop d-${i}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default CustomCursor;
