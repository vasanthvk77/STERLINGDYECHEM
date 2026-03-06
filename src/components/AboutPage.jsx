import React from 'react';
import { Box, Container, Typography, Grid, Paper, Stack } from '@mui/material';
import CorporateProfile from './CorporateProfile';
import Infrastructure from './Infrastructure';

const AboutPage = () => {
    return (
        <Box>
            {/* HERO SECTION */}
            <Box
                sx={{
                    bgcolor: 'primary.main',
                    py: { xs: 8, lg: 12 },
                    color: '#ffffff'
                }}
            >
                <Container maxWidth="lg">
                    <Typography
                        variant="h1"
                        sx={{
                            fontSize: { xs: '3rem', md: '5rem' },
                            fontWeight: 900,
                            textTransform: 'uppercase',
                            letterSpacing: '-0.05em',
                            mb: 3
                        }}
                    >
                        Our Journey
                    </Typography>
                    <Typography
                        variant="h6"
                        sx={{
                            opacity: 0.8,
                            maxWidth: '600px',
                            fontWeight: 300,
                            lineHeight: 1.6
                        }}
                    >
                        Since 1996, Sterling Dye Chem has been at the forefront of chemical innovation,
                        transforming industrial manufacturing with a focus on precision and sustainability.
                    </Typography>
                </Container>
            </Box>

            <CorporateProfile />

            {/* VISION & MISSION SECTION */}
            <Box component="section" sx={{ py: { xs: 8, lg: 12 }, bgcolor: 'rgba(223, 223, 223, 0.2)' }}>
                <Container maxWidth="lg">
                    <Grid container spacing={8} alignItems="center">
                        <Grid item xs={12} lg={6}>
                            <Typography
                                variant="h3"
                                color="primary"
                                sx={{
                                    fontWeight: 900,
                                    textTransform: 'uppercase',
                                    letterSpacing: '-0.02em',
                                    mb: 6
                                }}
                            >
                                Vision & Mission
                            </Typography>
                            <Stack spacing={4}>
                                <Paper
                                    elevation={0}
                                    sx={{
                                        p: 4,
                                        borderLeft: '4px solid',
                                        borderColor: 'primary.main',
                                        borderRadius: 0,
                                        bgcolor: '#ffffff'
                                    }}
                                >
                                    <Typography
                                        variant="h6"
                                        color="primary"
                                        sx={{ fontWeight: 900, textTransform: 'uppercase', mb: 2 }}
                                    >
                                        Our Vision
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        sx={{ color: 'text.secondary', fontWeight: 300, lineHeight: 1.6 }}
                                    >
                                        To be the most trusted global manufacturer of specialty chemicals,
                                        defined by our commitment to molecular excellence and ecological stewardship.
                                    </Typography>
                                </Paper>
                                <Paper
                                    elevation={0}
                                    sx={{
                                        p: 4,
                                        borderLeft: '4px solid',
                                        borderColor: 'primary.main',
                                        borderRadius: 0,
                                        bgcolor: '#ffffff'
                                    }}
                                >
                                    <Typography
                                        variant="h6"
                                        color="primary"
                                        sx={{ fontWeight: 900, textTransform: 'uppercase', mb: 2 }}
                                    >
                                        Our Mission
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        sx={{ color: 'text.secondary', fontWeight: 300, lineHeight: 1.6 }}
                                    >
                                        To empower the textile, leather, and polymer industries with high-performance
                                        auxiliaries and dyes while minimizing the environmental footprint of industrial chemistry.
                                    </Typography>
                                </Paper>
                            </Stack>
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <Box
                                sx={{
                                    position: 'relative',
                                    aspectRatio: '16/9',
                                    bgcolor: 'primary.main',
                                    opacity: 0.1,
                                    overflow: 'hidden'
                                }}
                            >
                                <Box
                                    component="img"
                                    src="/images/hero_2.png"
                                    alt="Innovation"
                                    sx={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        filter: 'grayscale(1)',
                                        opacity: 0.5
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
