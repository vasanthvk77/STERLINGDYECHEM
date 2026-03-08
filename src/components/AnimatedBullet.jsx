import React from 'react';
import { Box, keyframes } from '@mui/material';

const fallAnimation = keyframes`
    0% { 
        transform: translateY(-4px) rotate(45deg) scale(0); 
        opacity: 0; 
    }
    20% { 
        transform: translateY(-2px) rotate(45deg) scale(1); 
        opacity: 1; 
    }
    80% { 
        transform: translateY(2px) rotate(45deg) scale(1); 
        opacity: 1; 
    }
    100% { 
        transform: translateY(4px) rotate(45deg) scale(0); 
        opacity: 0; 
    }
`;

const AnimatedBullet = () => {
    return (
        <Box
            sx={{
                position: 'relative',
                width: '12px',
                height: '14px',
                flexShrink: 0,
                mr: 1.5,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <Box
                sx={{
                    width: '6px',
                    height: '6px',
                    bgcolor: '#3b82f6', // Water blue
                    borderRadius: '0 50% 50% 50%', // Teardrop shape (sharp point UP)
                    animation: `${fallAnimation} 1.8s infinite ease-in-out`,
                }}
            />
        </Box>
    );
};

export default AnimatedBullet;
