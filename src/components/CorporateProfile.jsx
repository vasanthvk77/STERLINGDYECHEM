import React from 'react';
import { Box, Container, Grid, Typography, Stack, Divider } from '@mui/material';
import ScrollReveal from './ScrollReveal';

const CorporateProfile = () => {
    return (
        <Box component="section" sx={{ py: { xs: 8, lg: 12 }, bgcolor: '#ffffff', borderBottom: '1px solid', borderColor: 'divider' }}>
            <Container maxWidth="lg">
                <Grid container spacing={8} alignItems="center">
                    <Grid item xs={12} lg={5}>
                        <ScrollReveal direction="left">
                            <Box sx={{ position: 'relative' }}>
                                <Box
                                    sx={{
                                        aspectRatio: '3/4',

                                        position: 'relative',
                                        zIndex: 10,
                                        backgroundImage: 'url("/images/corporate_profile.png")',
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                    }}
                                >
                                    <Box sx={{ position: 'absolute', inset: 0, bgcolor: 'primary.main', opacity: 0.1 }} />
                                </Box>
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        bottom: { xs: -32, lg: -32 },
                                        right: { xs: -32, lg: -64 },
                                        bgcolor: 'primary.main',
                                        color: '#ffffff',
                                        p: { xs: 4, lg: 6 },
                                        zIndex: 20,
                                        border: '4px solid #ffffff'
                                    }}
                                >
                                    <Typography
                                        variant="h2"
                                        sx={{
                                            color: '#ffffff',
                                            mb: 1,
                                            fontSize: '4rem',
                                            fontWeight: 900,
                                            letterSpacing: '-0.05em'
                                        }}
                                    >
                                        15<Box component="span" sx={{ opacity: 0.5 }}>+</Box>
                                    </Typography>
                                    <Typography
                                        variant="caption"
                                        sx={{
                                            fontWeight: 700,
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.2em',
                                            display: 'block',
                                            lineHeight: 1.5,
                                            opacity: 0.8
                                        }}
                                    >
                                        Years of<br />Excellence
                                    </Typography>
                                </Box>
                            </Box>
                        </ScrollReveal>
                    </Grid>

                    <Grid item xs={12} lg={7} sx={{ pl: { lg: 6 } }}>
                        <ScrollReveal direction="right" delay={0.2}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
                                <Box sx={{ width: 48, height: '2px', bgcolor: 'primary.main' }} />
                                <Typography
                                    variant="caption"
                                    sx={{
                                        fontWeight: 900,
                                        letterSpacing: '0.3em',
                                        textTransform: 'uppercase',
                                        color: 'primary.main'
                                    }}
                                >
                                    Who We Are
                                </Typography>
                            </Box>
                            <Typography
                                variant="h2"
                                color="primary"
                                sx={{ mb: 4, lineHeight: 1.1 }}
                            >
                                Engineering the <br /> Molecules of Tomorrow
                            </Typography>
                            <Stack spacing={3} sx={{ mb: 6 }}>
                                <Typography
                                    variant="body1"
                                    sx={{
                                        fontSize: '1.125rem',
                                        fontWeight: 300,
                                        lineHeight: 1.6,
                                        color: 'text.secondary'
                                    }}
                                >
                                    Sterling Dye Chem is a globally recognized manufacturer of premium Dyestuffs and Specialty Auxiliaries. We bridge the gap between advanced chemical synthesis and practical industrial application.
                                </Typography>
                                <Typography
                                    variant="body1"
                                    sx={{
                                        fontSize: '1.125rem',
                                        fontWeight: 300,
                                        lineHeight: 1.6,
                                        color: 'text.secondary'
                                    }}
                                >
                                    Our rigorous R&D processes and commitment to sustainable manufacturing have made us the preferred partner for textile, leather, and polymer industries across 40+ countries.
                                </Typography>
                            </Stack>

                            <Divider sx={{ mb: 4, borderColor: 'divider' }} />

                            <Grid container spacing={4}>
                                {[
                                    { label: "Production Plants", val: "03" },
                                    { label: "Global Presence", val: "40+" },
                                    { label: "ISO Certified", val: "Yes" },
                                ].map((stat, i) => (
                                    <Grid item key={i} xs={4}>
                                        <Typography
                                            variant="h4"
                                            color="primary"
                                            sx={{ fontWeight: 900, mb: 0.5 }}
                                        >
                                            {stat.val}
                                        </Typography>
                                        <Typography
                                            variant="caption"
                                            sx={{
                                                fontWeight: 700,
                                                textTransform: 'uppercase',
                                                letterSpacing: '0.1em',
                                                color: 'text.secondary',
                                                fontSize: '9px'
                                            }}
                                        >
                                            {stat.label}
                                        </Typography>
                                    </Grid>
                                ))}
                            </Grid>
                        </ScrollReveal>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default CorporateProfile;
