import React from 'react';
import { Box, Container, Typography, Grid, Stack, Card, CardContent } from '@mui/material';
import { Shield, Leaf, Award, Quote } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import principlesBG from '../assets/images/principlesBG.png';

const PrinciplesPage = () => {
    return (
        <Box sx={{ bgcolor: '#ffffff', minHeight: '100vh'}}>
            {/* HERO HEADER */}
            <Box
                id="principles-banner"
                sx={{
                    pt: { xs: 15, lg: 22 },
                    pb: { xs: 8, lg: 12 },
                    bgcolor: 'primary.main',
                    backgroundImage: 'linear-gradient(135deg, #000158 0%, #0002b3 100%)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                    minHeight: { xs: 'auto', lg: '100vh' }
                }}
            >
                {/* GRID PATTERN OVERLAY */}
                <Box
                    sx={{
                        position: 'absolute',
                        inset: 0,
                        opacity: 0.05,
                        pointerEvents: 'none',
                        zIndex: 0,
                        backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px)',
                        backgroundSize: '40px 40px',
                    }}
                />

                <Container maxWidth={false} sx={{ position: 'relative', zIndex: 10, maxWidth: '1350px', width: { xs: '100%', lg: 'calc(100% - 80px)' }, px: { xs: 2, lg: 2 }, mx: 'auto' }}>
                    <ScrollReveal>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
                            <Box sx={{ width: 48, height: '2px', bgcolor: '#ffffff' }} />
                            <Typography
                                variant="caption"
                                sx={{
                                    fontWeight: 900,
                                    letterSpacing: '0.3em',
                                    textTransform: 'uppercase',
                                    color: '#ffffff'
                                }}
                            >
                                Core Philosophy
                            </Typography>
                        </Box>
                        <Grid container spacing={4} alignItems="center">
                            <Grid item xs={12} lg={8}>
                                <Typography
                                    variant="h1"
                                    sx={{
                                        color: '#ffffff',
                                        fontSize: { xs: '3rem', md: '3.7rem' },
                                        fontWeight:700,
                                        textTransform: 'uppercase',
                                        letterSpacing: '-0.02em',
                                        mb: 4,
                                        lineHeight: 1.1
                                    }}
                                >
                                    Principles of Excellence
                                </Typography>
                                <Typography
                                    variant="body1"
                                    sx={{
                                        color: 'rgba(255, 255, 255, 0.8)',
                                        fontWeight: 300,
                                        fontSize: '1.125rem',
                                        lineHeight: 1.6,
                                        maxWidth: '600px'
                                    }}
                                >
                                    The foundational values that drive our innovation, shape our culture, and guarantee our commitment to global sustainability.
                                </Typography>
                            </Grid>
                            <Grid item xs={12} lg={4} sx={{ display: { xs: 'none', lg: 'flex' }, justifyContent: 'center' }}>
                                <Box
                                    sx={{
                                        position: 'relative',
                                        width: '380px',
                                        height: '380px',
                                        animation: 'float 6s ease-in-out infinite',
                                        willChange: 'transform',
                                    }}
                                >
                                    <svg width="100%" height="100%" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <defs>
                                            <radialGradient id="glow" cx="50%" cy="50%" r="50%">
                                                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.25" />
                                                <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                                            </radialGradient>
                                            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                                                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
                                                <stop offset="100%" stopColor="#ffffff" stopOpacity="0.3" />
                                            </linearGradient>
                                            <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                                                <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#ffffff" floodOpacity="0.5" />
                                            </filter>
                                        </defs>
                                        
                                        {/* Ambient Glow */}
                                        <circle cx="100" cy="100" r="80" fill="url(#glow)" />
                                        
                                        {/* Chemical Bonds / Connections */}
                                        <line x1="60" y1="60" x2="100" y2="40" stroke="url(#grad1)" strokeWidth="2.5" strokeDasharray="3 3" />
                                        <line x1="100" y1="40" x2="140" y2="60" stroke="url(#grad1)" strokeWidth="2.5" />
                                        <line x1="140" y1="60" x2="140" y2="110" stroke="url(#grad1)" strokeWidth="2.5" />
                                        <line x1="140" y1="110" x2="100" y2="130" stroke="url(#grad1)" strokeWidth="2.5" strokeDasharray="3 3" />
                                        <line x1="100" y1="130" x2="60" y2="110" stroke="url(#grad1)" strokeWidth="2.5" />
                                        <line x1="60" y1="110" x2="60" y2="60" stroke="url(#grad1)" strokeWidth="2.5" />
                                        
                                        <line x1="100" y1="40" x2="100" y2="95" stroke="url(#grad1)" strokeWidth="1.5" />
                                        <line x1="60" y1="110" x2="100" y2="95" stroke="url(#grad1)" strokeWidth="1.5" />
                                        <line x1="140" y1="110" x2="100" y2="95" stroke="url(#grad1)" strokeWidth="1.5" />

                                        {/* Outer Orbit / Ring decoration */}
                                        <circle cx="100" cy="95" r="65" stroke="url(#grad1)" strokeWidth="1" strokeDasharray="6 6" opacity="0.4" />

                                        {/* Glowing animated electrons traveling along paths */}
                                        <circle r="4" fill="#ffffff" filter="url(#shadow)">
                                            <animateMotion dur="8s" repeatCount="indefinite" path="M 60,60 L 100,40 L 140,60 L 140,110 L 100,130 L 60,110 Z" />
                                        </circle>
                                        <circle r="3.5" fill="#ffffff" filter="url(#shadow)" opacity="0.8">
                                            <animateMotion dur="6s" repeatCount="indefinite" path="M 100,40 L 100,95 L 60,110" />
                                        </circle>
                                        <circle r="3.5" fill="#ffffff" filter="url(#shadow)" opacity="0.8">
                                            <animateMotion dur="5s" repeatCount="indefinite" path="M 140,110 L 100,95 L 100,40" />
                                        </circle>
                                        <circle r="3" fill="#ffffff" filter="url(#shadow)" opacity="0.9">
                                            <animateMotion dur="7s" repeatCount="indefinite" path="M 60,110 L 100,130 L 140,110 L 100,95 Z" />
                                        </circle>

                                        {/* Nodes representing Atoms/Principles */}
                                        <circle cx="60" cy="60" r="10" fill="#ffffff" filter="url(#shadow)" />
                                        <circle cx="100" cy="40" r="12" fill="#ffffff" filter="url(#shadow)" />
                                        <circle cx="140" cy="60" r="10" fill="#ffffff" filter="url(#shadow)" />
                                        <circle cx="140" cy="110" r="14" fill="#ffffff" filter="url(#shadow)" />
                                        <circle cx="100" cy="130" r="10" fill="#ffffff" filter="url(#shadow)" />
                                        <circle cx="60" cy="110" r="12" fill="#ffffff" filter="url(#shadow)" />
                                        <circle cx="100" cy="95" r="8" fill="#ffffff" filter="url(#shadow)" opacity="0.8" />

                                        {/* Inner accent dots */}
                                        <circle cx="100" cy="40" r="5" fill="#000158" />
                                        <circle cx="140" cy="110" r="7" fill="#000158" />
                                        <circle cx="60" cy="110" r="6" fill="#000158" />
                                        <circle cx="100" cy="95" r="3" fill="#000158" />
                                    </svg>
                                </Box>
                            </Grid>
                        </Grid>
                    </ScrollReveal>
                </Container>
            </Box>

            {/* THE QUOTE SECTION */}
            <Box sx={{ py: { xs: 10, lg: 16 }, position: 'relative', overflow: 'hidden' }}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: -50,
                        left: -50,
                        opacity: 0.03,
                        color: 'primary.main',
                        zIndex: 0
                    }}
                >
                    <Quote size={400} />
                </Box>

                <Container maxWidth="md" sx={{ position: 'relative', zIndex: 10 }}>
                    <ScrollReveal direction="up">
                        <Typography
                            variant="h3"
                            sx={{
                                color: 'primary.main',
                                fontWeight: 300,
                                lineHeight: 1.4,
                                textAlign: 'center',
                                fontStyle: 'italic',
                                fontSize: { xs: '2rem', md: '3rem' },
                                letterSpacing: '-0.02em',
                                position: 'relative',
                            }}
                        >
                            "We believe that industrial progress must not come at the cost of our planet's future.
                            <Box component="span" sx={{ fontWeight: 700, display: 'block', mt: 3 }}>
                                Our chemistry is built on a foundation of responsibility."
                            </Box>
                        </Typography>
                    </ScrollReveal>
                </Container>
            </Box>

            {/* PRINCIPLES GRID SECTION */}
            <Box sx={{ py: { xs: 10, lg: 16 }, bgcolor: '#f8fafc', borderTop: '1px solid rgba(0, 1, 88, 0.05)' }}>
                <Container maxWidth={false} sx={{ maxWidth: '1350px', width: { xs: '100%', lg: 'calc(100% - 80px)' }, px: { xs: 2, lg: 2 }, mx: 'auto' }}>
                    <Grid container spacing={4}>
                        {[
                            {
                                title: "Sustainability First",
                                desc: "Implementing absolute ZDHC zero-discharge standards to permanently eliminate hazardous chemicals from the global supply chain.",
                                icon: Leaf
                            },
                            {
                                title: "Uncompromising Quality",
                                desc: "Every engineered batch undergoes rigorous multi-layer testing, ensuring mathematically verified 99.9% consistency in hue and stability.",
                                icon: Shield
                            },
                            {
                                title: "Global Ethics",
                                desc: "Enforcing total transparency across our raw material sourcing and maintaining an unyielding commitment to fair labor practices worldwide.",
                                icon: Award
                            }
                        ].map((item, i) => (
                            <Grid item key={i} xs={12} md={4} sx={{ display: 'flex', flexDirection: 'column' }}>
                                <ScrollReveal delay={i * 0.1} direction="up" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                    <Card
                                        sx={{
                                            height: '100%',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            borderRadius: 0,
                                            border: '1px solid rgba(0, 1, 88, 0.1)',
                                            bgcolor: '#ffffff',
                                            boxShadow: 'none',
                                            transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.4s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                            willChange: 'transform, border-color, box-shadow',
                                            position: 'relative',
                                            overflow: 'hidden',
                                            textAlign: 'justify',
                                            '&:hover': {
                                                borderColor: 'primary.main',
                                                transform: 'translate3d(0, -10px, 0)',
                                                boxShadow: '0 20px 40px rgba(0, 1, 88, 0.1)',
                                                '& .icon-wrapper': {
                                                    bgcolor: 'primary.main',
                                                    color: '#ffffff',
                                                    transform: 'scale(1.1) translate3d(0,0,0)'
                                                }
                                            }
                                        }}
                                    >
                                        <CardContent sx={{ p: { xs: 4, lg: 5 }, flexGrow: 1 }}>
                                            <Box
                                                className="icon-wrapper"
                                                sx={{
                                                    width: 80,
                                                    height: 80,
                                                    bgcolor: 'rgba(0, 1, 88, 0.05)',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    color: 'primary.main',
                                                    mb: 4,
                                                    transition: 'transform 0.4s ease, background-color 0.4s ease, color 0.4s ease',
                                                    willChange: 'transform'
                                                }}
                                            >
                                                <item.icon size={36} strokeWidth={1.5} />
                                            </Box>
                                            <Typography
                                                variant="h5"
                                                sx={{
                                                    fontWeight: 900,
                                                    textTransform: 'uppercase',
                                                    letterSpacing: '-0.02em',
                                                    color: 'primary.main',
                                                    mb: 2
                                                }}
                                            >
                                                {item.title}
                                            </Typography>
                                            <Typography
                                                variant="body1"
                                                sx={{
                                                    color: 'text.secondary',
                                                    fontWeight: 400,
                                                    lineHeight: 1.7
                                                }}
                                            >
                                                {item.desc}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </ScrollReveal>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>
        </Box>
    );
};

export default PrinciplesPage;
