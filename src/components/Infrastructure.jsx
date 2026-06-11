import React, { useState } from 'react';
import { Box, Container, Grid, Typography, Stack, useTheme, useMediaQuery } from '@mui/material';
import { Leaf, ShieldCheck, Droplet } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from './ScrollReveal';
import certGots from '../assets/images/cert_gots.png';
import certOekotex from '../assets/images/cert_oekotex.png';
import certZdhc from '../assets/images/cert_zdhc.png';

const Infrastructure = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [activeIndex, setActiveIndex] = useState(0);

    const certifications = [
        {
            name: "GOTS",
            fullName: "Global Organic Textile Standard",
            description: "The worldwide leading textile processing standard for organic fibers, including ecological and social criteria, backed up by independent certification of the entire supply chain.",
            image: certGots,
            icon: Leaf
        },
        {
            name: "OEKO-TEX",
            fullName: "Standard 100 by OEKO-TEX",
            description: "One of the world's best-known labels for textiles tested for harmful substances. It stands for customer confidence and high product safety, ensuring our products are completely safe for human contact.",
            image: certOekotex,
            icon: ShieldCheck
        },
        {
            name: "ZDHC",
            fullName: "Zero Discharge of Hazardous Chemicals",
            description: "Leading the global apparel and footwear industry to systemically eliminate hazardous chemicals and implement sustainable chemistry, protecting workers, consumers, and our planet's water systems.",
            image: certZdhc,
            icon: Droplet
        }
    ];

    return (
        <Box 
            id="certification-section"
            component="section"
            sx={{ 
                py: { xs: 10, md: 16 },
                width: "100%",
                position: "relative",
                overflow: "hidden",
                bgcolor: '#ffffff',
                borderBottom: '1px solid',
                borderColor: 'divider',
            }}
        >
            <Container maxWidth={false} sx={{ position: "relative", zIndex: 3, maxWidth: '1350px', width: { xs: '100%', lg: 'calc(100% - 80px)' }, px: { xs: 2, lg: 2 }, mx: 'auto' }}>
                <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 10 } }}>
                    <Typography 
                        variant="overline" 
                        sx={{ 
                            fontWeight: 900, 
                            textTransform: 'uppercase', 
                            letterSpacing: '0.5em', 
                            color: 'primary.main', 
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
                            color: 'primary.main', 
                            fontWeight: 700, 
                            textTransform: 'uppercase', 
                            letterSpacing: '-0.02em', 
                            fontSize: { xs: '2.5rem', md: '3.5rem', lg: '3.7rem' }, 
                            lineHeight: 1.1 
                        }}
                    >
                        Official Certifications
                    </Typography>
                </Box>

                <Grid container spacing={{ xs: 4, md: 6 }} alignItems="center">
                    {/* LEFT COLUMN: ACTIVE IMAGE SHOWCASE */}
                    <Grid item xs={12} md={5}>
                        <ScrollReveal direction="left">
                            <Box 
                                sx={{ 
                                    position: 'relative', 
                                    width: '100%', 
                                    height: { xs: '280px', md: '450px' }, 
                                    overflow: 'hidden', 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    justifyContent: 'center', 
                                    p: { xs: 1, md: 2 }, 
                                }}
                            >
                                <AnimatePresence mode="wait">
                                    <Box
                                        key={activeIndex}
                                        component={motion.div}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 1.05 }}
                                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                                        sx={{
                                            width: '100%',
                                            height: '100%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <img 
                                            src={certifications[activeIndex].image} 
                                            alt={certifications[activeIndex].name} 
                                            style={{ 
                                                maxWidth: '90%', 
                                                maxHeight: '90%', 
                                                objectFit: 'contain'
                                            }} 
                                        />
                                    </Box>
                                </AnimatePresence>
                            </Box>
                        </ScrollReveal>
                    </Grid>

                    {/* RIGHT COLUMN: LIST ITEMS */}
                    <Grid item xs={12} md={7}>
                        <ScrollReveal direction="right" delay={0.15}>
                            <Stack spacing={3}>
                                {certifications.map((cert, index) => {
                                    const isActive = index === activeIndex;
                                    const IconComponent = cert.icon;

                                    return (
                                        <Box
                                            key={index}
                                            onClick={() => setActiveIndex(index)}
                                            onMouseEnter={() => setActiveIndex(index)}
                                            sx={{
                                                display: 'flex',
                                                gap: { xs: 2.5, md: 3 },
                                                alignItems: 'flex-start',
                                                p: { xs: 3, md: 3.5 },
                                                borderRadius: 0,
                                                cursor: 'pointer',
                                                position: 'relative',
                                                overflow: 'hidden',
                                                transition: isActive ? 'border-color 0.8s, box-shadow 0.8s' : 'none',
                                                bgcolor: 'transparent',
                                                border: '1px solid',
                                                borderColor: isActive ? '#000158' : 'rgba(0, 1, 88, 0.08)',
                                                boxShadow: isActive ? '0 20px 40px rgba(0, 1, 88, 0.15)' : 'none',
                                                '&::before': {
                                                    content: '""',
                                                    position: 'absolute',
                                                    top: 0,
                                                    left: 0,
                                                    width: '100%',
                                                    height: '100%',
                                                    bgcolor: '#000158',
                                                    zIndex: 0,
                                                    transform: isActive ? 'scaleX(1)' : 'scaleX(0)',
                                                    transformOrigin: 'left',
                                                    transition: isActive 
                                                        ? 'transform 0.85s cubic-bezier(0.16, 1, 0.3, 1)' 
                                                        : 'transform 0s',
                                                },
                                                '&:hover': {
                                                    borderColor: '#000158',
                                                    '&::before': {
                                                        transform: 'scaleX(1)',
                                                        transition: 'transform 0.85s cubic-bezier(0.16, 1, 0.3, 1)',
                                                    },
                                                    '& .cert-title': {
                                                        color: '#ffffff',
                                                        transition: 'color 0.8s ease',
                                                    },
                                                    '& .cert-desc': {
                                                        color: 'rgba(255, 255, 255, 0.8)',
                                                        transition: 'color 0.8s ease',
                                                    },
                                                    '& .cert-icon-box': {
                                                        bgcolor: 'rgba(255, 255, 255, 0.1)',
                                                        color: '#b9bd62',
                                                        transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                                                    },
                                                    '& .cert-sub': {
                                                        color: '#b9bd62',
                                                        transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                                                    }
                                                }
                                            }}
                                        >
                                            {/* Icon Circle */}
                                            <Box
                                                className="cert-icon-box"
                                                sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    width: 48,
                                                    height: 48,
                                                    borderRadius: '50%',
                                                    bgcolor: isActive ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 1, 88, 0.05)',
                                                    color: isActive ? '#b9bd62' : '#000158',
                                                    transition: isActive ? 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)' : 'none',
                                                    flexShrink: 0,
                                                    position: 'relative',
                                                    zIndex: 1
                                                }}
                                            >
                                                <IconComponent size={isActive ? 24 : 20} strokeWidth={isActive ? 2.5 : 2} />
                                            </Box>

                                            {/* Text Content */}
                                            <Box sx={{ flexGrow: 1, position: 'relative', zIndex: 1 }}>
                                                <Typography
                                                    variant="h5"
                                                    className="cert-title"
                                                    sx={{
                                                        fontWeight: 900,
                                                        color: isActive ? '#ffffff' : '#000158',
                                                        fontSize: { xs: '1.15rem', md: '1.4rem' },
                                                        mb: 0.5,
                                                        transition: isActive ? 'color 0.8s ease' : 'none'
                                                    }}
                                                >
                                                    {cert.name}
                                                </Typography>
                                                <Typography
                                                    variant="subtitle2"
                                                    className="cert-sub"
                                                    sx={{
                                                        fontWeight: 700,
                                                        color: isActive ? '#b9bd62' : 'rgba(0, 1, 88, 0.5)',
                                                        fontSize: '11px',
                                                        textTransform: 'uppercase',
                                                        letterSpacing: '0.1em',
                                                        mb: isActive ? 1.5 : 0,
                                                        height: isActive ? 'auto' : '0px',
                                                        opacity: isActive ? 1 : 0,
                                                        overflow: 'hidden',
                                                        transition: isActive ? 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)' : 'none',
                                                    }}
                                                >
                                                    {cert.fullName}
                                                </Typography>
                                                <Typography
                                                    variant="body2"
                                                    className="cert-desc"
                                                    sx={{
                                                        color: isActive ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 1, 88, 0.7)',
                                                        lineHeight: 1.6,
                                                        fontSize: '13px',
                                                        fontWeight: isActive ? 500 : 400,
                                                        transition: isActive ? 'color 0.8s ease' : 'none'
                                                    }}
                                                >
                                                    {cert.description}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    );
                                })}
                            </Stack>
                        </ScrollReveal>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default Infrastructure;