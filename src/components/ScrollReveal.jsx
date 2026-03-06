import React, { useEffect, useRef, useState } from 'react';
import '../styles/animations.css';

const ScrollReveal = ({ children, delay = 0, direction = 'up' }) => {
    const [isVisible, setIsVisible] = useState(false);
    const domRef = useRef();

    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(domRef.current);
                }
            });
        }, {
            threshold: 0.15
        });

        const currentRef = domRef.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, []);

    const getDelayClass = () => {
        if (delay === 0.1) return 'delay-100';
        if (delay === 0.2) return 'delay-200';
        if (delay === 0.3) return 'delay-300';
        if (delay >= 0.4) return 'delay-400';
        return '';
    };

    return (
        <div
            ref={domRef}
            className={`reveal-hidden reveal-${direction} ${isVisible ? 'reveal-visible' : ''} ${getDelayClass()}`}
            style={{ width: '100%' }}
        >
            {children}
        </div>
    );
};

export default ScrollReveal;
