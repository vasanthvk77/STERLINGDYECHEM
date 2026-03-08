import React from 'react';
import { Box, Container, Typography, Grid, Avatar } from '@mui/material';
import { CheckCircle2 } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const Infrastructure = () => {
    const getImageUrl = (path) => {
        if (!path) return '';
        if (path.startsWith('http') || path.startsWith('data:')) return path;
        const cleanPath = path.startsWith('/') ? path.substring(1) : path;
        return `${import.meta.env.BASE_URL}${cleanPath}`;
    };

    const certifications = [
        {
            name: "GOTS",
            image: getImageUrl("/images/cert_gots.png"),
            fullName: "Global Organic Textile Standard"
        },
        {
            name: "OEKO-TEX",
            image: getImageUrl("/images/cert_oekotex.png"),
            fullName: "Standard 100 by OEKO-TEX"
        },
        {
            name: "ZDHC",
            image: getImageUrl("/images/cert_zdhc.png"),
            fullName: "Zero Discharge of Hazardous Chemicals"
        }
    ];

    return (
        <Box
            id="certification-section"
            component="section"
            sx={{
                py: { xs: 12, lg: 16 },
                position: "relative",
                overflow: "hidden",
                backgroundImage: `url("${import.meta.env.BASE_URL}images/hero_sustainable.png")`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                color: "#ffffff",

                "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    opacity: 0.6,
                    backgroundColor: "rgba(10, 14, 69, 0.6)", // blue overlay
                    zIndex: 1,
                },

                "& > *": {
                    position: "relative",
                    zIndex: 2, // keep content above overlay
                },
            }}
        >
            {/* DEEP BLUE OVERLAY */}
            <Box sx={{ position: 'absolute', inset: 0, }} />

            <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 10 }}>
                <Box sx={{ textAlign: 'center', mb: 12 }}>
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
                            fontWeight: 900,
                            textTransform: 'uppercase',
                            letterSpacing: '-0.02em',
                            fontSize: { xs: '2.25rem', lg: '4.5rem' },
                            lineHeight: 1
                        }}
                    >
                        Official Certifications
                    </Typography>
                </Box>

                <Grid container spacing={8} justifyContent="center" alignItems="center">
                    {certifications.map((cert, i) => (
                        <Grid item key={i} xs={12} md={4}>
                            <ScrollReveal
                                direction={i === 0 ? 'left' : i === 1 ? 'up' : 'right'}
                                delay={i * 0.1}
                            >
                                <Box sx={{ position: 'relative', mb: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                                    <Box sx={{ position: 'relative', mb: 4 }}>
                                        {/* CIRCULAR CONTAINER */}
                                        <Box
                                            sx={{
                                                width: 240,
                                                height: 240,
                                                borderRadius: '50%',
                                                bgcolor: '#ffffff',
                                                boxShadow: '0 30px 60px rgba(0, 0, 0, 0.4)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                p: 5,
                                                position: 'relative',
                                                zIndex: 10,
                                                transition: 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                                                '&:hover': {
                                                    transform: 'scale(1.05) translateY(-10px)',
                                                }
                                            }}
                                        >
                                            <img
                                                src={cert.image}
                                                alt={cert.name}
                                                style={{
                                                    maxWidth: '100%',
                                                    height: 'auto',
                                                    objectFit: 'contain'
                                                }}
                                            />
                                        </Box>

                                        {/* BADGE (CHECKMARK) */}
                                        <Box
                                            sx={{
                                                position: 'absolute',
                                                top: 0,
                                                right: 0,
                                                bgcolor: '#ffffff',
                                                borderRadius: '50%',
                                                width: 54,
                                                height: 54,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
                                                zIndex: 20,
                                                border: '2px solid #ffffff'
                                            }}
                                        >
                                            <CheckCircle2 size={36} color="#16a34a" strokeWidth={2.5} />
                                        </Box>
                                    </Box>

                                    <Typography
                                        variant="h5"
                                        sx={{
                                            fontWeight: 900,
                                            color: '#ffffff',
                                            mb: 1.5,
                                            letterSpacing: '0.05em',
                                            textTransform: 'uppercase'
                                        }}
                                    >
                                        {cert.name}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: '#fbbf24',

                                            maxWidth: '280px',
                                            fontWeight: 600,
                                            fontSize: '13px',
                                            lineHeight: 1.6
                                        }}
                                    >
                                        {cert.fullName}
                                    </Typography>
                                </Box>
                            </ScrollReveal>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};

export default Infrastructure;
