import React from 'react';
import { Box, Container, Typography } from '@mui/material';

const BrandsTicker = () => {
    const getImageUrl = (path) => {
        if (!path) return '';
        if (path.startsWith('http') || path.startsWith('data:')) return path;
        const cleanPath = path.startsWith('/') ? path.substring(1) : path;
        return `${import.meta.env.BASE_URL}${cleanPath}`;
    };

    const brands = [
        { name: 'Aquasol', logo: getImageUrl('/images/brands/aquasol.png') },
        { name: 'Flexkon', logo: getImageUrl('/images/brands/flexkon.png') },
        { name: 'Magna', logo: getImageUrl('/images/brands/magna.png') },
        { name: 'Nanotech', logo: getImageUrl('/images/brands/nanotech.png') },
        { name: 'Fiberchem', logo: getImageUrl('/images/brands/fiberchem.png') },
    ];

    // Multiple sets for seamless loop
    const tickerItems = [...brands, ...brands, ...brands, ...brands];

    return (
        <Box
            component="section"
            sx={{
                py: 8,
                bgcolor: '#ffffff',
                borderTop: '1px solid',
                borderColor: 'divider',
                overflow: 'hidden'
            }}
        >
            <style>
                {`
                    @keyframes ticker {
                        0% { transform: translateX(0); }
                        100% { transform: translateX(-50%); }
                    }
                `}
            </style>

            <Container maxWidth="lg" sx={{ mb: 6, textAlign: 'center' }}>
                <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 2 }}>
                    <Box sx={{ width: 32, height: '2px', bgcolor: 'primary.main' }} />
                    <Typography
                        variant="caption"
                        sx={{
                            fontWeight: 900,
                            letterSpacing: '0.3em',
                            textTransform: 'uppercase',
                            color: 'primary.main'
                        }}
                    >
                        Authorized Distributor
                    </Typography>
                    <Box sx={{ width: 32, height: '2px', bgcolor: 'primary.main' }} />
                </Box>
            </Container>

            <Box sx={{ position: 'relative', display: 'flex', overflow: 'hidden' }}>
                <Box
                    sx={{
                        display: 'flex',
                        whiteSpace: 'nowrap',
                        py: 4,
                        alignItems: 'center',
                        animation: 'ticker 30s linear infinite',
                        '&:hover': { animationPlayState: 'paused' }
                    }}
                >
                    {tickerItems.map((brand, i) => (
                        <Box
                            key={i}
                            sx={{
                                flex: 'none',
                                width: { xs: '200px', md: '300px' },
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                px: 4
                            }}
                        >
                            <Box
                                component="img"
                                src={brand.logo}
                                alt={brand.name}
                                sx={{
                                    height: { xs: 80, md: 120 },
                                    width: 'auto',
                                    objectFit: 'contain',
                                    maxWidth: '80%',
                                    filter: 'none',

                                    transition: 'all 0.3s ease-in-out',
                                    '&:hover': { opacity: 1, transform: 'scale(1.1)' }
                                }}
                            />
                        </Box>
                    ))}
                </Box>
            </Box>
        </Box>
    );
};

export default BrandsTicker;
