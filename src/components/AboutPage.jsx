import React from 'react';
import { Box, Container, Typography, Grid, Paper, Stack } from '@mui/material';
import { Eye, Target } from 'lucide-react';
import CorporateProfile from './CorporateProfile';
import Infrastructure from './Infrastructure';

const AboutPage = () => {
    return (
        <Box>
            {/* HERO SECTION */}


            <CorporateProfile />

            {/* VISION & MISSION SECTION */}
            <Box component="section" sx={{ py: { xs: 8, lg: 16 }, position: 'relative', bgcolor: '#ffffff', overflow: 'hidden' }}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        width: '40%',
                        height: '100%',
                        bgcolor: 'rgba(0, 1, 88, 0.02)',
                        borderBottomLeftRadius: '100px',
                        zIndex: 0,
                        display: { xs: 'none', lg: 'block' }
                    }}
                />
                <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
                    <Grid container spacing={{ xs: 8, lg: 12 }} alignItems="center">
                        <Grid item xs={12} lg={6}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                                <Box sx={{ width: 40, height: '3px', bgcolor: 'primary.main' }} />
                                <Typography
                                    variant="caption"
                                    sx={{ fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.2em', color: 'primary.main' }}
                                >
                                    Our Purpose
                                </Typography>
                            </Box>
                            <Typography
                                variant="h2"
                                color="primary"
                                sx={{
                                    fontWeight: 900,
                                    textTransform: 'uppercase',
                                    letterSpacing: '-0.03em',
                                    mb: 6,
                                    fontSize: { xs: '3rem', md: '4rem' }
                                }}
                            >
                                Vision & Mission
                            </Typography>

                            <Stack spacing={4}>
                                {/* Vision Card */}
                                <Paper
                                    elevation={0}
                                    sx={{
                                        p: { xs: 4, md: 5 },
                                        borderRadius: '24px',
                                        bgcolor: '#ffffff',
                                        boxShadow: '0 20px 40px rgba(0,0,0,0.04)',
                                        border: '1px solid rgba(0, 1, 88, 0.05)',
                                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                        position: 'relative',
                                        overflow: 'hidden',
                                        '&:hover': {
                                            transform: 'translateY(-10px)',
                                            boxShadow: '0 30px 60px rgba(0,0,0,0.08)',
                                            borderColor: 'rgba(0, 1, 88, 0.1)',
                                            '& .icon-bg-vision': { transform: 'scale(1.5) rotate(15deg)' }
                                        }
                                    }}
                                >
                                    <Box className="icon-bg-vision" sx={{ position: 'absolute', top: -30, right: -30, width: 150, height: 150, borderRadius: '50%', bgcolor: 'rgba(0, 1, 88, 0.02)', transition: 'transform 0.6s ease', zIndex: 0 }} />
                                    <Box sx={{ position: 'relative', zIndex: 1 }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, gap: 2.5 }}>
                                            <Box sx={{ width: 56, height: 56, borderRadius: '16px', bgcolor: 'rgba(0, 1, 88, 0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'primary.main', transition: 'all 0.3s ease' }}>
                                                <Eye size={28} strokeWidth={2.5} />
                                            </Box>
                                            <Typography variant="h5" color="primary" sx={{ fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                                Our Vision
                                            </Typography>
                                        </Box>
                                        <Typography variant="body1" sx={{ color: 'text.secondary', fontWeight: 400, lineHeight: 1.8, fontSize: '1.05rem' }}>
                                            To be the most trusted global manufacturer of specialty chemicals,
                                            defined by our commitment to molecular excellence and ecological stewardship.
                                        </Typography>
                                    </Box>
                                </Paper>

                                {/* Mission Card */}
                                <Paper
                                    elevation={0}
                                    sx={{
                                        p: { xs: 4, md: 5 },
                                        borderRadius: '24px',
                                        bgcolor: 'primary.main',
                                        color: 'white',
                                        boxShadow: '0 20px 40px rgba(0,1,88,0.2)',
                                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                        position: 'relative',
                                        overflow: 'hidden',
                                        '&:hover': {
                                            transform: 'translateY(-10px)',
                                            boxShadow: '0 30px 60px rgba(0,1,88,0.35)',
                                            '& .icon-bg-mission': { transform: 'scale(1.5) rotate(-15deg)' }
                                        }
                                    }}
                                >
                                    <Box className="icon-bg-mission" sx={{ position: 'absolute', top: -30, right: -30, width: 150, height: 150, borderRadius: '50%', bgcolor: 'rgba(255, 255, 255, 0.05)', transition: 'transform 0.6s ease', zIndex: 0 }} />
                                    <Box sx={{ position: 'relative', zIndex: 1 }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, gap: 2.5 }}>
                                            <Box sx={{ width: 56, height: 56, borderRadius: '16px', bgcolor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'primary.main' }}>
                                                <Target size={28} strokeWidth={2.5} />
                                            </Box>
                                            <Typography variant="h5" sx={{ fontWeight: 900, textTransform: 'uppercase', color: 'white', letterSpacing: '0.05em' }}>
                                                Our Mission
                                            </Typography>
                                        </Box>
                                        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.85)', fontWeight: 400, lineHeight: 1.8, fontSize: '1.05rem' }}>
                                            To empower the textile, leather, and polymer industries with high-performance
                                            auxiliaries and dyes while minimizing the environmental footprint of industrial chemistry.
                                        </Typography>
                                    </Box>
                                </Paper>
                            </Stack>
                        </Grid>

                        <Grid item xs={12} lg={6} sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Box sx={{ position: 'relative', width: '100%', maxWidth: '550px', pl: { xs: 0, lg: 4 } }}>
                                {/* Background decorative box */}
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        top: '10%',
                                        bottom: '-5%',
                                        left: '15%',
                                        right: '-5%',
                                        border: '2px dashed rgba(0, 1, 88, 0.1)',
                                        borderRadius: '32px',
                                        zIndex: 0,
                                        display: { xs: 'none', lg: 'block' }
                                    }}
                                />

                                {/* Main Image */}
                                <Box
                                    sx={{
                                        position: 'relative',
                                        zIndex: 1,
                                        borderRadius: '32px',
                                        overflow: 'hidden',
                                        boxShadow: '0 40px 80px rgba(0,0,0,0.15)',
                                        aspectRatio: '4/5',
                                        bgcolor: 'white',
                                        p: 1.5,
                                        transform: 'rotate(-2deg)',
                                        transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                                        '&:hover': {
                                            transform: 'rotate(0deg) scale(1.02)'
                                        }
                                    }}
                                >
                                    <Box
                                        component="img"
                                        src="public/images/vision_ascending_men.png"
                                        alt="Elevating Customers to Success"
                                        sx={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                            borderRadius: '24px',
                                        }}
                                    />
                                    {/* Overlay Gradient inside image */}
                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            inset: 12,
                                            borderRadius: '24px',
                                            background: 'linear-gradient(to top, rgba(0,1,88,0.95) 0%, rgba(0,1,88,0) 55%)',
                                            pointerEvents: 'none'
                                        }}
                                    />
                                    <Box sx={{ position: 'absolute', bottom: 40, left: 40, right: 40, zIndex: 2 }}>
                                        <Typography variant="h4" sx={{ color: 'white', fontWeight: 900, mb: 1, textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}>
                                            The Path to Success
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.9)', fontWeight: 500, lineHeight: 1.6 }}>
                                            Our ultimate journey is taking our customers by the hand and elevating them to absolute success.
                                        </Typography>
                                    </Box>
                                </Box>

                                {/* Floating badge */}
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        top: '15%',
                                        left: { xs: -20, lg: -10 },
                                        zIndex: 2,
                                        bgcolor: 'white',
                                        p: 3,
                                        borderRadius: '20px',
                                        boxShadow: '0 20px 40px rgba(0,1,88,0.1)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 2.5,
                                        animation: 'float 6s ease-in-out infinite',
                                        '@keyframes float': {
                                            '0%, 100%': { transform: 'translateY(0)' },
                                            '50%': { transform: 'translateY(-15px)' }
                                        }
                                    }}
                                >
                                    <Box sx={{ width: 56, height: 56, borderRadius: '50%', bgcolor: 'rgba(0,1,88,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <img src="public/images/SDC_LOGO_short_bg_removed.png" alt="SDC" style={{ width: 32, height: 32, objectFit: 'contain', transform: 'scale(2.5)' }} />
                                    </Box>
                                    <Box>
                                        <Typography variant="subtitle1" color="primary" sx={{ fontWeight: 900, lineHeight: 1.2, display: 'block', mb: 0.5 }}>
                                            Est. 2008
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                            Legacy of Excellence
                                        </Typography>
                                    </Box>
                                </Box>

                                {/* Floating mini accent */}
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        bottom: '20%',
                                        right: -20,
                                        zIndex: 2,
                                        width: 80,
                                        height: 80,
                                        borderRadius: '50%',
                                        background: 'linear-gradient(135deg, #00d2ff 0%, #3a7bd5 100%)',
                                        boxShadow: '0 20px 40px rgba(58, 123, 213, 0.4)',
                                        display: { xs: 'none', lg: 'block' },
                                        animation: 'float 8s ease-in-out infinite reverse',
                                    }}
                                />
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            <Infrastructure />
        </Box>
    );
};

export default AboutPage;
