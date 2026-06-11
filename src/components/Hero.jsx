import React from 'react';
import { Box, Typography, Container, IconButton, Stack } from '@mui/material';
import { ShieldCheck, ChevronLeft, ChevronRight } from 'lucide-react';
import AnimatedButton from './AnimatedButton';


const Hero = ({ slides, currentSlide, setCurrentSlide, nextSlide, prevSlide }) => {
    return (
        <Box
            component="section"
            className="hero-banner-root"
            sx={{
                position: 'relative',
                height: { xs: 'calc(100vh - 80px)', lg: '100vh' },
                overflow: 'hidden',
                bgcolor: '#000158',
                
            }}
        >
            {slides.map((slide, index) => (
                <Box
                    key={index}
                    sx={{
                        position: 'absolute',
                        inset: 0,
                        transition: 'opacity 1.2s cubic-bezier(0.4, 0, 0.2, 1), visibility 1.2s cubic-bezier(0.4, 0, 0.2, 1)',
                        opacity: index === currentSlide ? 1 : 0,
                        visibility: index === currentSlide ? 'visible' : 'hidden',
                        zIndex: index === currentSlide ? 10 : 0,
                        pointerEvents: index === currentSlide ? 'auto' : 'none',
                        willChange: 'opacity, visibility',
                    }}
                >
                    {/* BACKGROUND IMAGE */}
                    <Box
                        sx={{
                            position: 'absolute',
                            inset: 0,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundImage: `url(${slide.image})`,
                            transform: index === currentSlide ? 'scale(1.15) translate3d(0,0,0)' : 'scale(1) translate3d(0,0,0)',
                            transition: index === currentSlide ? 'transform 15s linear' : 'transform 1.2s ease-in-out',
                            willChange: 'transform',
                        }}
                    />

                    {/* BLACK OVERLAY */}
                    <Box
                        sx={{
                            position: 'absolute',
                            inset: 0,
                            bgcolor: 'rgba(0, 0, 0, 0.5)',
                            zIndex: 20,
                        }}
                    />

                    {/* CONTENT */}
                    <Container
                        maxWidth={false}
                        sx={{
                            position: 'relative',
                            zIndex: 30,
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            textAlign: 'center',
                            maxWidth: '1350px',
                            width: { xs: '100%', lg: 'calc(100% - 80px)' },
                            px: { xs: 2, lg: 2 },
                            mx: 'auto'
                        }}
                    >
                        <Box
                            sx={{
                                transition: 'transform 1.2s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 1.2s cubic-bezier(0.2, 0.8, 0.2, 1)',
                                transform: index === currentSlide ? 'translate3d(0, 0, 0)' : 'translate3d(0, 60px, 0)',
                                opacity: index === currentSlide ? 1 : 0,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                maxWidth: '1200px',
                                willChange: 'transform, opacity',
                            }}
                        >
                            <Typography
                                variant="h1"
                                sx={{
                                    fontSize: { xs: '2.5rem', md: '4.5rem', lg: '5.5rem' },
                                    fontWeight: 500,
                                    color: slide.textColor,
                                    lineHeight: 1.1,
                                    mb: 4,
                                    textTransform: 'uppercase',
                                    letterSpacing: '-0.02em',
                                    textShadow: '0 10px 30px rgba(0, 0, 0, 0.3)'
                                }}
                            >
                                {slide.title}
                            </Typography>
                            <Typography
                                variant="body1"
                                sx={{
                                    fontSize: { xs: '1rem', md: '1.2rem' },
                                    color: slide.subtitleColor,
                                    maxWidth: '800px',
                                    mb: 6,
                                    fontWeight: 500,
                                    lineHeight: 1.6,
                                    letterSpacing: '0.01em'
                                }}
                            >
                                {slide.subtitle}
                            </Typography>
                            <AnimatedButton
                                lightBg={true}
                                size="large"
                                onClick={() => slide.action ? slide.action() : navigateTo('PRODUCT')}
                                sx={{
                                    px: 8,
                                    py: 2.5,
                                    fontSize: '12px',
                                    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
                                    '&:hover': {
                                        boxShadow: '0 15px 30px rgba(0, 0, 0, 0.3)',
                                    }
                                }}
                            >
                                {slide.cta}
                            </AnimatedButton>
                        </Box>
                    </Container>
                </Box>
            ))}

            {/* CONTROLS - REPOSITIONED AS PER SCREENSHOT */}
            <Box
                sx={{
                    position: 'absolute',
                    bottom: 60,
                    left: 0,
                    right: 0,
                    zIndex: 40,
                }}
            >
                <Container maxWidth={false} sx={{ maxWidth: '1350px', width: { xs: '100%', lg: 'calc(100% - 80px)' }, px: { xs: 2, lg: 2 }, mx: 'auto' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                        {/* PROGRESS INDICATORS (Bottom Left) */}
                        <Stack direction="row" spacing={2} sx={{ mb: 1.5 }}>
                            {slides.map((_, i) => (
                                <Box
                                    key={i}
                                    onClick={() => setCurrentSlide(i)}
                                    sx={{
                                        height: '3px',
                                        width: i === currentSlide ? 80 : 40,
                                        bgcolor: i === currentSlide ? '#ffffff' : 'rgba(255, 255, 255, 0.3)',
                                        transition: 'width 0.6s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                                        cursor: 'pointer',
                                    }}
                                />
                            ))}
                        </Stack>

                        {/* NAVIGATION ARROWS (Bottom Right) */}
                        <Stack direction="row" spacing={0}>
                            <IconButton
                                onClick={prevSlide}
                                sx={{
                                    width: 64,
                                    height: 64,
                                    border: '1.5px solid rgba(0, 1, 88, 0.3)',
                                    color: '#000158',
                                    bgcolor: 'rgba(255, 255, 255, 0.5)', // slightly visible background
                                    borderRadius: 0,
                                    mr: '-1.5px', // Overlap borders for single-line look if desired
                                    '&:hover': {
                                        bgcolor: '#000158',
                                        color: '#ffffff',
                                    }
                                }}
                            >
                                <ChevronLeft size={24} strokeWidth={2} />
                            </IconButton>
                            <IconButton
                                onClick={nextSlide}
                                sx={{
                                    width: 64,
                                    height: 64,
                                    border: '1.5px solid rgba(0, 1, 88, 0.3)',
                                    color: '#000158',
                                    bgcolor: 'rgba(255, 255, 255, 0.5)',
                                    borderRadius: 0,
                                    '&:hover': {
                                        bgcolor: '#000158',
                                        color: '#ffffff',
                                    }
                                }}
                            >
                                <ChevronRight size={24} strokeWidth={2} />
                            </IconButton>
                        </Stack>
                    </Box>
                </Container>
            </Box>
        </Box>
    );
};

export default Hero;
