import React, { useRef } from 'react';
import { Box, Container, Typography, useTheme, useMediaQuery } from '@mui/material';
import { CheckCircle2 } from 'lucide-react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import heroSustainableImage from '../assets/images/hero_sustainable.png';
import certGots from '../assets/images/cert_gots.png';
import certOekotex from '../assets/images/cert_oekotex.png';
import certZdhc from '../assets/images/cert_zdhc.png';

const Infrastructure = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const sectionRef = useRef(null);

    // We track the scroll progress of this specific section relative to the viewport
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"] 
    });

    // We use a spring for physics-based smoothness so the scroll feels premium
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // Map the scroll progress: 
    // From 10% to 40% of the section's journey through the viewport, spread the cards.
    const leftX = useTransform(smoothProgress, [0.1, 0.4], ["0%", "-115%"]);
    const rightX = useTransform(smoothProgress, [0.1, 0.4], ["0%", "115%"]);
    
    // Vertical transforms for mobile
    const upY = useTransform(smoothProgress, [0.1, 0.4], ["0%", "-115%"]);
    const downY = useTransform(smoothProgress, [0.1, 0.4], ["0%", "115%"]);

    const sideOpacity = useTransform(smoothProgress, [0.1, 0.25], [0, 1]);
    const sideScale = useTransform(smoothProgress, [0.1, 0.4], [0.8, 1]);

    const certifications = [
        { name: "GOTS", image: certGots, fullName: "Global Organic Textile Standard", pos: 'left' },
        { name: "OEKO-TEX", image: certOekotex, fullName: "Standard 100 by OEKO-TEX", pos: 'center' },
        { name: "ZDHC", image: certZdhc, fullName: "Zero Discharge of Hazardous Chemicals", pos: 'right' }
    ];

    return (
        <Box 
            id="certification-section"
            ref={sectionRef}
            component="section"
            sx={{ 
                height: { xs: "auto", md: "100vh" },
                minHeight: { xs: "900px", md: "100vh" },
                py: { xs: 8, md: 0 },
                width: "100%",
                position: "relative",
                overflow: "hidden", // Prevents side cards from causing horizontal scroll
                backgroundImage: `url("${heroSustainableImage}")`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                "&::before": {
                    content: '""',
                    position: "absolute",
                    inset: 0,
                    backgroundColor: "rgba(10, 14, 69, 0.8)", // Deep blue overlay
                    zIndex: 1,
                },
            }}
        >
            {/* Top Edge Fade */}
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: { xs: '100px', md: '180px' },
                    background: 'linear-gradient(to bottom, #f8f8f8 0%, rgba(248, 248, 248, 0.95) 0%, rgba(248, 248, 248, 0) 40%)',
                    zIndex: 2,
                    pointerEvents: 'none'
                }}
            />
            {/* Bottom Edge Fade */}
            <Box
                sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: { xs: '100px', md: '180px' },
                    background: 'linear-gradient(to top, #ffffff 0%, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0) 40%)',
                    zIndex: 2,
                    pointerEvents: 'none'
                }}
            />
            <Container maxWidth="lg" sx={{ position: "relative", zIndex: 3 }}>
                {}
                <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 10 } }}>
                    <Typography 
                        variant="overline" 
                        sx={{ 
                            fontWeight: 900, 
                            textTransform: 'uppercase', 
                            letterSpacing: '0.5em', 
                            color: '#fbbf24', 
                            display: 'block', 
                            mb: 2, 
                            fontSize: '12px' 
                        }}
                    >
                        Quality Assurance
                    </Typography>
                    <Typography 
                        variant="h2" 
                        sx={{ 
                            color: '#ffffff', 
                            fontWeight: 700, 
                            textTransform: 'uppercase', 
                            letterSpacing: '-0.02em', 
                            fontSize: { xs: '2rem', md: '3.5rem', lg: '3.7rem' }, 
                            lineHeight: 1.1 
                        }}
                    >
                        Official Certifications
                    </Typography>
                </Box>

                {}
                <Box 
                    sx={{ 
                        position: 'relative', 
                        height: { xs: '700px', md: '450px' }, 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center' 
                    }}
                >
                    {certifications.map((cert, i) => {
                        let xValue = "0%";
                        let yValue = "0%";
                        let opacityValue = 1;
                        let scaleValue = 1;
                        let zIndexValue = 10;

                        if (cert.pos === 'left') {
                            if (isMobile) {
                                yValue = upY;
                            } else {
                                xValue = leftX;
                            }
                            opacityValue = sideOpacity;
                            scaleValue = sideScale;
                            zIndexValue = 5;
                        } else if (cert.pos === 'right') {
                            if (isMobile) {
                                yValue = downY;
                            } else {
                                xValue = rightX;
                            }
                            opacityValue = sideOpacity;
                            scaleValue = sideScale;
                            zIndexValue = 5;
                        } else {
                            zIndexValue = 15; // Middle stays on top initially
                        }

                        return (
                            <Box
                                key={i}
                                component={motion.div}
                                style={{ 
                                    x: xValue, 
                                    y: yValue,
                                    opacity: opacityValue, 
                                    scale: scaleValue,
                                    position: 'absolute' 
                                }}
                                sx={{
                                    width: { xs: '260px', md: '320px' },
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    textAlign: 'center',
                                    zIndex: zIndexValue,
                                    willChange: 'transform, opacity',
                                }}
                            >
                                <Box sx={{ position: 'relative', mb: 3 }}>
                                    <Box
                                        sx={{
                                            width: { xs: 140, md: 240 },
                                            height: { xs: 140, md: 240 },
                                            borderRadius: '50%',
                                            bgcolor: '#ffffff',
                                            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.4)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            p: { xs: 3, md: 5 },
                                            border: '8px solid rgba(255,255,255,0.1)',
                                            transition: 'transform 0.3s ease',
                                            willChange: 'transform',
                                            '&:hover': {
                                                transform: 'scale(1.05) translate3d(0,0,0)'
                                            }
                                        }}
                                    >
                                        <img 
                                            src={cert.image} 
                                            alt={cert.name} 
                                            style={{ maxWidth: '100%', height: 'auto', objectFit: 'contain' }} 
                                        />
                                    </Box>
                                    {/* Badge Checkmark */}
                                    <Box 
                                        sx={{ 
                                            position: 'absolute', 
                                            top: 10, 
                                            right: 10, 
                                            bgcolor: '#ffffff', 
                                            borderRadius: '50%', 
                                            width: { xs: 35, md: 50 }, 
                                            height: { xs: 35, md: 50 }, 
                                            display: 'flex', 
                                            alignItems: 'center', 
                                            justifyContent: 'center', 
                                            boxShadow: '0 5px 15px rgba(0,0,0,0.2)', 
                                            border: '2px solid #ffffff' 
                                        }}
                                    >
                                        <CheckCircle2 size={28} color="#16a34a" />
                                    </Box>
                                </Box>

                                <Typography 
                                    variant="h5" 
                                    sx={{ 
                                        fontWeight: 900, 
                                        color: '#ffffff', 
                                        mb: 0.5, 
                                        fontSize: { xs: '1.1rem', md: '1.5rem' },
                                        textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                                    }}
                                >
                                    {cert.name}
                                </Typography>
                                <Typography 
                                    variant="body2" 
                                    sx={{ 
                                        color: '#fbbf24', 
                                        maxWidth: '220px', 
                                        fontWeight: 600, 
                                        fontSize: '12px' 
                                    }}
                                >
                                    {cert.fullName}
                                </Typography>
                            </Box>
                        );
                    })}
                </Box>
            </Container>
        </Box>
    );
};

export default Infrastructure;