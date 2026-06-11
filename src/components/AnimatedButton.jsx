import React, { useState } from 'react';
import { Button, Box } from '@mui/material';
import { ArrowRight } from 'lucide-react';

const AnimatedButton = ({
    children,
    onClick,
    type,
    disabled,
    variant = "contained",
    sx = {},
    showArrow = true,
    lightBg = false,
    fullWidth = false,
    baseBg: propBaseBg,
    baseColor: propBaseColor,
    slideBg: propSlideBg,
    slideColor: propSlideColor,
    borderColor: propBorderColor,
    ...props
}) => {
    const [isHovered, setIsHovered] = useState(false);

    // Default combinations based on lightBg
    const defaultBaseBg = lightBg ? '#ffffff' : '#000158';
    const defaultBaseColor = lightBg ? '#000158' : '#ffffff';
    const defaultSlideBg = lightBg ? '#000158' : '#ffffff';
    const defaultSlideColor = lightBg ? '#ffffff' : '#000158';
    const defaultBorderColor = lightBg ? '#ffffff' : '#000158';

    // Apply overrides
    const baseBg = propBaseBg || defaultBaseBg;
    const baseColor = propBaseColor || defaultBaseColor;
    const slideBg = propSlideBg || defaultSlideBg;
    const slideColor = propSlideColor || defaultSlideColor;
    const borderColor = propBorderColor || baseBg; // Default border to match base bg

    return (
        <Button
            type={type}
            disabled={disabled}
            variant={variant}
            onClick={onClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            fullWidth={fullWidth}
            sx={{
                position: 'relative',
                overflow: 'hidden',
                bgcolor: baseBg,
                border: `1px solid ${borderColor}`,
                color: baseColor,
                px: 4,
                py: 1.5,
                fontSize: '11px',
                fontWeight: 900,
                borderRadius: 0,
                letterSpacing: '0.12em',
                boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
                transition: 'border-color 0.6s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.6s cubic-bezier(0.25, 1, 0.5, 1)',
                
                '@keyframes bgEnter': {
                    '0%': {
                        transform: 'translateY(-100%)',
                    },
                    '100%': {
                        transform: 'translateY(0)',
                    },
                },

                '@keyframes bgExit': {
                    '0%': {
                        transform: 'translateY(0)',
                    },
                    '100%': {
                        transform: 'translateY(100%)',
                    },
                },

                '&:hover': {
                    bgcolor: baseBg, // keep baseBg under the sliding overlay
                    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.25)',
                    borderColor: slideBg,
                },
                '&.Mui-disabled': {
                    bgcolor: 'rgba(0, 1, 88, 0.12)',
                    color: 'rgba(0, 1, 88, 0.26)',
                    borderColor: 'rgba(0, 1, 88, 0.12)',
                },
                ...sx,
            }}
            {...props}
        >
            {/* Animated Background */}
            {!disabled && (
                <Box
                    sx={{
                        position: 'absolute',
                        inset: 0,
                        bgcolor: slideBg,
                        zIndex: 1,
                        animation: isHovered
                            ? 'bgEnter 0.6s cubic-bezier(0.25, 1, 0.5, 1) forwards'
                            : 'bgExit 0.6s cubic-bezier(0.25, 1, 0.5, 1) forwards',
                    }}
                />
            )}

            {/* Text Container */}
            <Box
                sx={{
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                    height: 22,
                    zIndex: 2,
                    width: '100%',
                }}
            >
                {/* Normal Text */}
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: disabled ? 'inherit' : baseColor,
                        transition: 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)',
                        transform: isHovered && !disabled ? 'translateY(120%)' : 'translateY(0)',
                        width: '100%',
                    }}
                >
                    {children}
                    {showArrow && (
                        <ArrowRight
                            size={16}
                            strokeWidth={3}
                            style={{ marginLeft: 8 }}
                        />
                    )}
                </Box>

                {/* Hover Text */}
                {!disabled && (
                    <Box
                        sx={{
                            position: 'absolute',
                            left: 0,
                            top: 0,
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: slideColor,
                            transition: 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)',
                            transform: isHovered ? 'translateY(0)' : 'translateY(-120%)',
                        }}
                    >
                        {children}
                        {showArrow && (
                            <ArrowRight
                                size={16}
                                strokeWidth={3}
                                style={{ marginLeft: 8 }}
                            />
                        )}
                    </Box>
                )}
            </Box>
        </Button>
    );
};

export default AnimatedButton;
