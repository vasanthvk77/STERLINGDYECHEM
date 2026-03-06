import React from 'react';
import { Box, Container, Typography, Grid, Stack, Paper } from '@mui/material';
import { Shield, Leaf, Award } from 'lucide-react';

const PrinciplesPage = () => {
    return (
        <Box>
            <Box sx={{ py: { xs: 8, lg: 12 }, bgcolor: '#ffffff' }}>
                <Container maxWidth="lg">
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
                            Core Philosophy
                        </Typography>
                    </Box>
                    <Typography
                        variant="h1"
                        color="primary"
                        sx={{
                            fontSize: { xs: '3rem', md: '5rem' },
                            fontWeight: 900,
                            textTransform: 'uppercase',
                            letterSpacing: '-0.05em',
                            mb: 6,
                            lineHeight: 1.1
                        }}
                    >
                        Principles of <br /> Excellence
                    </Typography>
                </Container>
            </Box>

            {/* HERO QUOTE SECTION */}
            <Box
                sx={{
                    position: 'relative',
                    height: '500px',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center'
                }}
            >
                <Box
                    component="img"
                    src="/images/principles.png"
                    alt="Sustainability"
                    sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: -1 }}
                />
                <Box
                    sx={{
                        position: 'absolute',
                        inset: 0,
                        bgcolor: 'rgba(0, 1, 88, 0.6)',
                        zIndex: 0
                    }}
                />
                <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 10 }}>
                    <Typography
                        variant="h4"
                        sx={{
                            color: '#ffffff',
                            fontWeight: 300,
                            lineHeight: 1.6,
                            maxWidth: '800px',
                            fontStyle: 'italic'
                        }}
                    >
                        "We believe that industrial progress must not come at the cost of our planet's future.
                        Our chemistry is built on a foundation of responsibility."
                    </Typography>
                </Container>
            </Box>

            {/* PRINCIPLES GRID */}
            <Box sx={{ py: { xs: 8, lg: 12 }, bgcolor: '#ffffff' }}>
                <Container maxWidth="lg">
                    <Grid container spacing={8}>
                        {[
                            {
                                title: "Sustainability",
                                desc: "Implementing ZDHC standards to eliminate hazardous chemicals from the global supply chain.",
                                icon: Leaf
                            },
                            {
                                title: "Quality Control",
                                desc: "Every batch undergoes rigorous HPLC testing ensuring 99.9% consistency in hue and stability.",
                                icon: Shield
                            },
                            {
                                title: "Ethics",
                                desc: "Full transparency in our supply chain and commitment to fair labor practices globally.",
                                icon: Award
                            }
                        ].map((item, i) => (
                            <Grid item key={i} xs={12} md={4}>
                                <Stack spacing={3}>
                                    <Box
                                        sx={{
                                            width: 64,
                                            height: 64,
                                            bgcolor: 'rgba(0, 1, 88, 0.1)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: 'primary.main'
                                        }}
                                    >
                                        <item.icon size={32} />
                                    </Box>
                                    <Typography
                                        variant="h5"
                                        sx={{
                                            fontWeight: 900,
                                            textTransform: 'uppercase',
                                            letterSpacing: '-0.02em',
                                            color: 'primary.main'
                                        }}
                                    >
                                        {item.title}
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        sx={{ color: 'text.secondary', fontWeight: 300, lineHeight: 1.6 }}
                                    >
                                        {item.desc}
                                    </Typography>
                                </Stack>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>

            {/* COMPLIANCE SECTION */}
            <Box sx={{ py: { xs: 8, lg: 12 }, bgcolor: 'rgba(223, 223, 223, 0.2)', borderTop: '1px solid', borderColor: 'divider' }}>
                <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
                    <Typography
                        variant="h4"
                        color="primary"
                        sx={{ fontWeight: 900, textTransform: 'uppercase', mb: 8 }}
                    >
                        Compliance & Certifications
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 6, opacity: 0.6, filter: 'grayscale(1)' }}>
                        {['ZDHC Level 3', 'OEKO-TEX', 'REACH Compliant'].map(cert => (
                            <Box
                                key={cert}
                                sx={{
                                    border: '2px solid',
                                    borderColor: 'primary.main',
                                    px: 4,
                                    py: 1.5,
                                    color: 'primary.main',
                                    fontWeight: 900,
                                    letterSpacing: '0.2em',
                                    textTransform: 'uppercase'
                                }}
                            >
                                {cert}
                            </Box>
                        ))}
                    </Box>
                </Container>
            </Box>
        </Box>
    );
};

export default PrinciplesPage;
