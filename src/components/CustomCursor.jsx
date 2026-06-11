import React, { useEffect, useRef } from 'react';
import '../styles/animations.css';

const CustomCursor = () => {
    const cursorRef = useRef(null);

    useEffect(() => {
        // Disable for mobile/touch devices
        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        if (isTouchDevice) return;

        let mouseX = 0;
        let mouseY = 0;
        let isPending = false;

        const moveCursor = (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            if (!isPending) {
                isPending = true;
                requestAnimationFrame(() => {
                    if (cursorRef.current) {
                        cursorRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
                    }
                    isPending = false;
                });
            }
        };

        window.addEventListener('mousemove', moveCursor);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
        };
    }, []);

    return (
        <div className="custom-cursor-container">
            {/* The actual cursor is hidden on mobile via CSS but also via JS check above */}
            <div
                ref={cursorRef}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    pointerEvents: 'none',
                    willChange: 'transform'
                }}
            >
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
