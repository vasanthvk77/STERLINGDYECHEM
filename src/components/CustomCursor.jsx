import React, { useEffect, useRef } from 'react';
import '../styles/animations.css';

const CustomCursor = () => {
    const cursorRef = useRef(null);

    useEffect(() => {
        // Disable for mobile/touch devices
        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        if (isTouchDevice) return;

        let animationFrameId;

        const moveCursor = (e) => {
            const clientX = e.clientX;
            const clientY = e.clientY;

            if (animationFrameId) cancelAnimationFrame(animationFrameId);

            animationFrameId = requestAnimationFrame(() => {
                if (cursorRef.current) {
                    cursorRef.current.style.transform = `translate3d(${clientX}px, ${clientY}px, 0)`;
                }
            });
        };

        window.addEventListener('mousemove', moveCursor);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div className="custom-cursor-container" style={{ display: 'none' }}>
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
            <style>
                {`
                    @media (min-width: 900px) {
                        .custom-cursor-container { display: block !important; }
                    }
                `}
            </style>
        </div>
    );
};

export default CustomCursor;
