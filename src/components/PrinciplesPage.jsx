import React from 'react';
import { Box, Container, Typography, Grid, Stack, Card, CardContent } from '@mui/material';
import { Shield, Leaf, Award, Quote } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const PrinciplesPage = () => {
    return (
        <Box sx={{ bgcolor: '#ffffff', minHeight: '100vh' }}>
            {/* HERO HEADER */}
            <Box
                sx={{
                    pt: { xs: 15, lg: 22 },
                    pb: { xs: 8, lg: 12 },
                    bgcolor: 'primary.main',
                    position: 'relative',
                    overflow: 'hidden'
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
                        backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
                        backgroundSize: '40px 40px',
                    }}
                />

                <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 10 }}>
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
                        <Grid container>
                            <Grid item xs={12} lg={8}>
                                <Typography
                                    variant="h1"
                                    sx={{
                                        color: '#ffffff',
                                        fontSize: { xs: '3rem', md: '5rem' },
                                        fontWeight: 900,
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
                                position: 'relative'
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
            <Box sx={{ py: { xs: 10, lg: 16 }, bgcolor: 'rgba(223, 223, 223, 0.2)' }}>
                <Container maxWidth="lg">
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
                            <Grid item key={i} xs={12} md={4}>
                                <ScrollReveal delay={i * 0.1} direction="up">
                                    <Card
                                        sx={{
                                            height: '100%',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            borderRadius: 0,
                                            border: '1px solid rgba(0, 1, 88, 0.1)',
                                            bgcolor: '#ffffff',
                                            boxShadow: 'none',
                                            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                            position: 'relative',
                                            overflow: 'hidden',
                                            '&:hover': {
                                                borderColor: 'primary.main',
                                                transform: 'translateY(-10px)',
                                                boxShadow: '0 20px 40px rgba(0, 1, 88, 0.1)',
                                                '& .icon-wrapper': {
                                                    bgcolor: 'primary.main',
                                                    color: '#ffffff',
                                                    transform: 'scale(1.1)'
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
                                                    transition: 'all 0.4s ease'
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
