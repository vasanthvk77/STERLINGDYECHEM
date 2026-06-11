import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import aquasolLogo from '../assets/images/brands/aquasol.png';
import flexkonLogo from '../assets/images/brands/flexkon.png';
import magnaLogo from '../assets/images/brands/magna.png';
import nanotechLogo from '../assets/images/brands/nanotech.png';
import fiberchemLogo from '../assets/images/brands/fiberchem.png';

const BrandsTicker = () => {
    const brands = [
        { name: 'Aquasol', logo: aquasolLogo, height: { xs: 70, md: 100 }, width: 'auto' },
        { name: 'Flexkon', logo: flexkonLogo, height: { xs: 80, md: 120 }, width: 'auto' },
        { name: 'Magna', logo: magnaLogo, height: { xs: 90, md: 135 }, width: { xs: 90, md: 135 } },
        { name: 'Nanotech', logo: nanotechLogo, height: { xs: 80, md: 180 }, width: "auto" },
        { name: 'Fiberchem', logo: fiberchemLogo, height: { xs: 75, md: 110 }, width: 'auto' },
    ];

    // Multiple sets for seamless loop
    const tickerItems = [...brands, ...brands, ...brands, ...brands];

    return (
        <Box
            component="section"
            sx={{
                 py: 5,
                bgcolor: '#ffffff',
                overflow: 'hidden'
            }}
        >
            <Container maxWidth={false} sx={{ mb: 2, textAlign: 'center', maxWidth: '1350px', width: { xs: '100%', lg: 'calc(100% - 80px)' }, px: { xs: 2, lg: 2 }, mx: 'auto' }}>
                <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 2 }}>
                    <Box sx={{ width: { xs: 100, md:500 }, height: '2px', bgcolor: 'primary.main' }} />
                    <Typography
                        variant="caption"
                        sx={{
                            fontWeight: 700,
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                            color: 'primary.main',
                            fontSize:'1rem'
                        }}
                    >
                        Authorized Distributor
                    </Typography>
                    <Box sx={{ width: { xs: 100, md: 500 }, height: '2px', bgcolor: 'primary.main' }} />
                </Box>
            </Container>

            <Box sx={{ position: 'relative', display: 'flex', overflow: 'hidden' }}>
                <Box
                    sx={{
                        display: 'flex',
                        whiteSpace: 'nowrap',
                        py: 2,
                        alignItems: 'center',
                        animation: 'ticker 30s linear infinite',
                        willChange: 'transform',
                        transform: 'translate3d(0, 0, 0)',
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
                                    height: brand.height,
                                    width: brand.width,
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

            <Container maxWidth={false} sx={{ mt: 2, textAlign: 'center', maxWidth: '1350px', width: { xs: '100%', lg: 'calc(100% - 80px)' }, px: { xs: 2, lg: 2 }, mx: 'auto' }}>
                <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 2 }}>
                    <Box sx={{ width: { xs: 100, md: 500 }, height: '2px', bgcolor: 'primary.main' }} />
                    <Typography
                        variant="caption"
                        sx={{
                            fontWeight: 700,
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                            color: 'primary.main',
                            fontSize:'1rem'

                        }}
                    >
                        Authorized Distributor
                    </Typography>
                    <Box sx={{ width: { xs: 100, md: 500 }, height: '2px', bgcolor: 'primary.main' }} />
                </Box>
            </Container>
        </Box>
    );
};

export default BrandsTicker;
