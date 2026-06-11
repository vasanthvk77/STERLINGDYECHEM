import React from 'react';
import { Box, Container, Grid, Typography, Link, Stack, Divider, List, ListItem, ListItemText } from '@mui/material';
import { Globe, Phone, Mail } from 'lucide-react';
import footerTexture from '../assets/images/footer_texture_1.png';
import logo from '../assets/images/logo.png';

const Footer = ({ navigateTo, currentPage }) => {
    return (
        <Box
            component="footer"
            sx={{
                position: 'relative',
                pt: { xs: 8, lg: 10 },
                pb: 5,
                overflow: 'hidden',
                bgcolor: '#000158',
                color: '#ffffff'
            }}
        >
            {/* BACKGROUND TEXTURE OVERLAY */}
            <Box
                sx={{
                    position: 'absolute',
                    inset: 0,
                    opacity: 0.04,
                    pointerEvents: 'none',
                    backgroundImage: `url(${footerTexture})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundBlendMode: 'overlay',
                    zIndex: 0
                }}
            />

            <Container maxWidth={false} sx={{ position: 'relative', zIndex: 10, maxWidth: '1350px', width: { xs: '100%', lg: 'calc(100% - 80px)' }, px: { xs: 2, lg: 2 }, mx: 'auto' }}>
                <Grid container spacing={8} sx={{ mb: 8 }}>
                    {/* BRAND SECTION */}
                    <Grid item xs={12} sm={6} md={3.5}>
                        <Box
                            sx={{ mb: 4, cursor: 'pointer', display: 'flex' }}
                            onClick={() => navigateTo('HOME')}
                        >
                            <img
                                src={logo}
                                alt="Sterling Dye Chem"
                                style={{ height: '48px', width: 'auto', objectFit: 'contain', filter: 'brightness(0) invert(1)' }}
                            />
                        </Box>
                        <Typography
                            variant="body2"
                            sx={{
                                color: 'rgba(255, 255, 255, 0.7)',
                                lineHeight: 1.8,
                                fontWeight: 500,
                                pr: 2,
                                textAlign: 'justify'
                            }}
                        >
                            Sterling Dye Chem is a highly renowned name of the industry which got established in the year 2009. We are based out as a sole proprietorship firm and have located our office at Tirupur,Tamilnadu.
                        </Typography>
                    </Grid>

                    {/* QUICK LINKS */}
                    <Grid item xs={6} sm={6} md={2}>
                        <Typography
                            variant="subtitle2"
                            sx={{
                                fontWeight: 900,
                                textTransform: 'uppercase',
                                letterSpacing: '0.1em',
                                color: '#ffffff',
                                mb: 1
                            }}
                        >
                            Quick Links
                        </Typography>
                        <Box sx={{ width: 40, height: '2px', bgcolor: '#b9bd62', mb: 3 }} />
                        <Stack spacing={1.5}>
                            {['Home', 'About Us', 'Principles', 'Insights', 'Contact Us'].map((item) => {
                                const isActive = currentPage === item.toUpperCase();
                                return (
                                    <Link
                                        key={item}
                                        component="button"
                                        onClick={() => navigateTo(item.toUpperCase())}
                                        underline="none"
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            textAlign: 'left',
                                            fontSize: '13px',
                                            fontWeight: isActive ? 800 : 600,
                                            color: isActive ? '#b9bd62' : 'rgba(255, 255, 255, 0.7)',
                                            transition: 'color 0.2s',
                                            '&:hover': { color: '#ffffff' }
                                        }}
                                    >
                                        {item}
                                    </Link>
                                );
                            })}
                        </Stack>
                    </Grid>

                    {/* PRODUCT SECTION */}
                    <Grid item xs={6} sm={6} md={2.5}>
                        <Typography
                            variant="subtitle2"
                            sx={{
                                fontWeight: 900,
                                textTransform: 'uppercase',
                                letterSpacing: '0.1em',
                                color: '#ffffff',
                                mb: 1
                            }}
                        >
                            Product
                        </Typography>
                        <Box sx={{ width: 40, height: '2px', bgcolor: '#b9bd62', mb: 3 }} />
                        <Stack spacing={1.5}>
                            {['Silicone Inks', 'Oilbase Non PVC', 'Specialitys', 'Waterbase Pigments', 'Eco friendly inks'].map((item) => (
                                <Link
                                    key={item}
                                    href="#"
                                    underline="none"
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        fontSize: '13px',
                                        fontWeight: 600,
                                        color: 'rgba(255, 255, 255, 0.7)',
                                        '&:hover': { color: '#ffffff' },
                                        transition: 'color 0.2s'
                                    }}
                                >
                                    {item}
                                </Link>
                            ))}
                        </Stack>
                    </Grid>

                    {/* CONTACT INFO */}
                    <Grid item xs={12} sm={12} md={4}>
                        <Typography
                            variant="subtitle2"
                            sx={{
                                fontWeight: 900,
                                textTransform: 'uppercase',
                                letterSpacing: '0.1em',
                                color: '#ffffff',
                                mb: 1
                            }}
                        >
                            Contact Info
                        </Typography>
                        <Box sx={{ width: 40, height: '2px', bgcolor: '#b9bd62', mb: 3 }} />
                        <Stack spacing={3}>
                            <Box sx={{ display: 'flex', gap: 2 }}>
                                <Globe size={18} color="#b9bd62" style={{ marginTop: '2px', flexShrink: 0 }} />
                                <Typography variant="body2" sx={{ fontWeight: 600, color: 'rgba(255, 255, 255, 0.7)', lineHeight: 1.4, textAlign: 'justify' }}>
                                    49, Nvp Garden St, Valai Tottam, Periyandipalayam, Tiruppur, Andipalayam, Tamil Nadu 641687
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', gap: 2 }}>
                                <Phone size={18} color="#b9bd62" style={{ marginTop: '2px', flexShrink: 0 }} />
                                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                                    <Link
                                        href="tel:+912223456789"
                                        underline="none"
                                        sx={{
                                            fontSize: '14px',
                                            fontWeight: 600,
                                            color: 'rgba(255, 255, 255, 0.7)',
                                            '&:hover': { color: '#ffffff', textDecoration: 'underline' }
                                        }}
                                    >
                                        +91 (22) 2345 6789
                                    </Link>
                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex', gap: 2 }}>
                                <Mail size={18} color="#b9bd62" style={{ marginTop: '2px', flexShrink: 0 }} />
                                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                                    <Link
                                        href="mailto:info@sdc.com"
                                        underline="none"
                                        sx={{
                                            fontSize: '14px',
                                            fontWeight: 600,
                                            color: 'rgba(255, 255, 255, 0.7)',
                                            '&:hover': { color: '#ffffff', textDecoration: 'underline' }
                                        }}
                                    >
                                        info@sdc.com
                                    </Link>
                                </Box>
                            </Box>
                        </Stack>
                    </Grid>
                </Grid>

                <Divider sx={{ mb: 4, borderColor: 'rgba(255, 255, 255, 0.1)' }} />

                <Box sx={{ textAlign: 'center' }}>
                    <Typography
                        variant="caption"
                        sx={{
                            fontWeight: { xs: 500, sm: 600, md: 700 },
                            fontSize: { xs: '10px', sm: '12px', md: '12px' },
                            color: 'rgba(255, 255, 255, 0.5)',
                            textTransform: 'uppercase',
                            letterSpacing: '-0.01rem'
                        }}
                    >
                        Copyright © 2026 Sterling Dye Chem. All rights reserved.
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;
