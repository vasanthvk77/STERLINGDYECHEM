import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import aquasolLogo from '../assets/images/brands/aquasol.png';
import flexkonLogo from '../assets/images/brands/flexkon.png';
import magnaLogo from '../assets/images/brands/magna.png';
import nanotechLogo from '../assets/images/brands/nanotech.png';
import fiberchemLogo from '../assets/images/brands/fiberchem.png';

const BrandsTicker = () => {
    const brands = [
        { name: 'Aquasol', logo: aquasolLogo },
        { name: 'Flexkon', logo: flexkonLogo },
        { name: 'Magna', logo: magnaLogo },
        { name: 'Nanotech', logo: nanotechLogo },
        { name: 'Fiberchem', logo: fiberchemLogo },
    ];

    // Multiple sets for seamless loop
    const tickerItems = [...brands, ...brands, ...brands, ...brands];

    return (
        <Box
            component="section"
            sx={{
                 py: 8,
                bgcolor: '#ffffff',
                overflow: 'hidden'
            }}
        >
            <Container maxWidth={false} sx={{ mb: 6, textAlign: 'center', maxWidth: '1350px', width: { xs: '100%', lg: 'calc(100% - 80px)' }, px: { xs: 2, lg: 2 }, mx: 'auto' }}>
                <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 2 }}>
                    <Box sx={{ width: 150, height: '2px', bgcolor: 'primary.main' }} />
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
                    <Box sx={{ width: 150, height: '2px', bgcolor: 'primary.main' }} />
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

            <Container maxWidth={false} sx={{ mt: 6, textAlign: 'center', maxWidth: '1350px', width: { xs: '100%', lg: 'calc(100% - 80px)' }, px: { xs: 2, lg: 2 }, mx: 'auto' }}>
                <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 2 }}>
                    <Box sx={{ width: 150, height: '2px', bgcolor: 'primary.main' }} />
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
                    <Box sx={{ width: 150, height: '2px', bgcolor: 'primary.main' }} />
                </Box>
            </Container>
        </Box>
    );
};

export default BrandsTicker;
