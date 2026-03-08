import React from 'react';
import { Box, Container, Grid, Typography, Link, Stack, Divider, List, ListItem, ListItemText } from '@mui/material';
import { Globe, Phone, Mail } from 'lucide-react';
import AnimatedBullet from './AnimatedBullet';

const Footer = ({ navigateTo }) => {
    return (
        <Box
            component="footer"
            sx={{
                position: 'relative',
                pt: { xs: 8, lg: 10 },
                pb: 5,
                overflow: 'hidden',
                bgcolor: '#f8f9fa'
            }}
        >
            {/* BACKGROUND TEXTURE OVERLAY */}
            <Box
                sx={{
                    position: 'absolute',
                    inset: 0,
                    opacity: 0.08,
                    pointerEvents: 'none',
                    backgroundImage: `url(${import.meta.env.BASE_URL}images/footer_texture_1.png)`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundBlendMode: 'overlay',
                    zIndex: 0
                }}
            />

            <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 10 }}>
                <Grid container spacing={8} sx={{ mb: 8 }}>
                    {/* BRAND SECTION */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Box
                            sx={{ mb: 4, cursor: 'pointer', display: 'flex' }}
                            onClick={() => navigateTo('HOME')}
                        >
                            <img
                                src={`${import.meta.env.BASE_URL}images/logo.png`}
                                alt="Sterling Dye Chem"
                                style={{ height: '48px', width: 'auto', objectFit: 'contain' }}
                            />
                        </Box>
                        <Typography
                            variant="body2"
                            sx={{
                                color: 'text.secondary',
                                lineHeight: 1.8,
                                fontWeight: 500,
                                pr: 2,
                                textAlign: 'justify'
                            }}
                        >
                            Sterling Dye Chem is a highly renowned name of the industry which got established in the year 2012. We are based out as a sole proprietorship firm and have located our office at Mumbai.
                        </Typography>
                    </Grid>

                    {/* QUICK LINKS */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography
                            variant="subtitle2"
                            sx={{
                                fontWeight: 900,
                                textTransform: 'uppercase',
                                letterSpacing: '0.1em',
                                color: 'primary.main',
                                mb: 1
                            }}
                        >
                            Quick Links
                        </Typography>
                        <Box sx={{ width: 40, height: '2px', bgcolor: '#000158', mb: 3 }} />
                        <Stack spacing={1.5}>
                            {['Home', 'About Us', 'Principles', 'Blog', 'Contact Us'].map((item) => (
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
                                        fontWeight: 600,
                                        color: '#64748b',
                                        '&:hover': { color: '#000158' },
                                        transition: 'color 0.2s'
                                    }}
                                >
                                    <AnimatedBullet />
                                    {item}
                                </Link>
                            ))}
                        </Stack>
                    </Grid>

                    {/* PRODUCT SECTION */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography
                            variant="subtitle2"
                            sx={{
                                fontWeight: 900,
                                textTransform: 'uppercase',
                                letterSpacing: '0.1em',
                                color: 'primary.main',
                                mb: 1
                            }}
                        >
                            Product
                        </Typography>
                        <Box sx={{ width: 40, height: '2px', bgcolor: '#000158', mb: 3 }} />
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
                                        color: '#64748b',
                                        '&:hover': { color: '#000158' },
                                        transition: 'color 0.2s'
                                    }}
                                >
                                    <AnimatedBullet />
                                    {item}
                                </Link>
                            ))}
                        </Stack>
                    </Grid>

                    {/* CONTACT INFO */}
                    <Grid item xs={12} sm={12} md={3}>
                        <Typography
                            variant="subtitle2"
                            sx={{
                                fontWeight: 900,
                                textTransform: 'uppercase',
                                letterSpacing: '0.1em',
                                color: 'primary.main',
                                mb: 1
                            }}
                        >
                            Contact Info
                        </Typography>
                        <Box sx={{ width: 40, height: '2px', bgcolor: '#000158', mb: 3 }} />
                        <Stack spacing={3}>
                            <Box sx={{ display: 'flex', gap: 2 }}>
                                <Globe size={18} color="#000158" style={{ marginTop: '2px', flexShrink: 0 }} />
                                <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.secondary', lineHeight: 1.4, textAlign: 'justify' }}>
                                    49, Nvp Garden St, Valai Tottam, Periyandipalayam, Tiruppur, Andipalayam, Tamil Nadu 641687
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', gap: 2 }}>
                                <Phone size={18} color="#000158" style={{ marginTop: '2px', flexShrink: 0 }} />
                                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                                    <Typography variant="body2" sx={{ fontWeight: 800, color: 'primary.main' }}></Typography>
                                    <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.secondary' }}>+91 (22) 2345 6789</Typography>
                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex', gap: 2 }}>
                                <Mail size={18} color="#000158" style={{ marginTop: '2px', flexShrink: 0 }} />
                                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                                    <Typography variant="body2" sx={{ fontWeight: 800, color: 'primary.main' }}></Typography>
                                    <Link
                                        href="mailto:info@sdc.com"
                                        sx={{
                                            fontSize: '14px',
                                            fontWeight: 600,
                                            color: '#64748b',
                                            '&:hover': { color: '#000158', textDecoration: 'underline' }
                                        }}
                                    >
                                        info@sdc.com
                                    </Link>
                                </Box>
                            </Box>
                        </Stack>
                    </Grid>
                </Grid>

                <Divider sx={{ mb: 4 }} />

                <Box sx={{ textAlign: 'center' }}>
                    <Typography
                        variant="caption"
                        sx={{

                            fontWeight: { xs: 500, sm: 600, md: 800 },
                            fontSize: { xs: '10px', sm: '12px', md: '14px' },
                            color: '#000158',
                            textTransform: 'uppercase',
                            letterSpacing: '0.1em'
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
