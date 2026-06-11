import React, { useEffect, useRef, useState } from 'react';
import { Box, Container, Grid, Typography, Stack, Divider } from '@mui/material';
import ScrollReveal from './ScrollReveal';
import profileBgImage from '../assets/images/corporate_profile.png';

const CountUp = ({ val, duration = 2000 }) => {
    const [count, setCount] = useState(0);
    const [hasAnimated, setHasAnimated] = useState(false);
    const elementRef = useRef(null);

    const parsed = React.useMemo(() => {
        const match = String(val).match(/^([^0-9]*)(0*[0-9]+)([^0-9]*)$/);
        if (match) {
            const prefix = match[1];
            const numStr = match[2];
            const suffix = match[3];
            const isLeadingZero = numStr.startsWith('0');
            const num = parseInt(numStr, 10);
            return { isNumber: true, num, prefix, suffix, isLeadingZero, length: numStr.length };
        }
        return { isNumber: false, val };
    }, [val]);

    useEffect(() => {
        if (!parsed.isNumber || hasAnimated) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setHasAnimated(true);
                    let startTimestamp = null;
                    const step = (timestamp) => {
                        if (!startTimestamp) startTimestamp = timestamp;
                        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                        const easedProgress = progress * (2 - progress); // outQuad
                        setCount(Math.floor(easedProgress * parsed.num));
                        if (progress < 1) {
                            window.requestAnimationFrame(step);
                        } else {
                            setCount(parsed.num);
                        }
                    };
                    window.requestAnimationFrame(step);
                }
            },
            { threshold: 0.1 }
        );

        const currentEl = elementRef.current;
        if (currentEl) {
            observer.observe(currentEl);
        }

        return () => {
            if (currentEl) {
                observer.unobserve(currentEl);
            }
        };
    }, [parsed, duration, hasAnimated]);

    if (!parsed.isNumber) {
        return <span>{val}</span>;
    }

    const displayVal = parsed.isLeadingZero
        ? count.toString().padStart(parsed.length, '0')
        : count;

    return (
        <span ref={elementRef}>
            {parsed.prefix}
            {displayVal}
            {parsed.suffix}
        </span>
    );
};

const CorporateProfile = () => {
    return (
        <Box component="section" sx={{ py: { xs: 8, lg:4 }, bgcolor: '#ffffff', borderBottom: '1px solid', borderColor: 'divider', overflow: 'hidden' }}>
            <Container maxWidth={false} sx={{ maxWidth: '1350px', width: { xs: '100%', lg: 'calc(100% - 80px)' }, px: { xs: 2, lg: 2 }, mx: 'auto' }}>
                <Grid container spacing={8} alignItems="center">
                    <Grid item xs={12} lg={5}>
                        <ScrollReveal direction="left">
                            <Box sx={{ position: 'relative' }}>
                                <Box
                                    sx={{
                                        aspectRatio: { xs: '1/1', sm: '4/3', lg: '3/4' },
                                        position: 'relative',
                                        zIndex: 10,
                                        backgroundImage: `url("${profileBgImage}")`,
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
                                        right: { xs: 0, lg: -64 },
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
                                            fontSize: { xs: '2.5rem', lg: '4rem' },
                                            fontWeight: 900,
                                            letterSpacing: '-0.05em'
                                        }}
                                    >
                                        <CountUp val="15" /><Box component="span" sx={{ opacity: 0.5 }}>+</Box>
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
                                fontWeight="700"
                                sx={{ mb: 4, lineHeight: 1.1,fontSize: { xs: '3rem', lg: '3.9rem' } }}
                                
                            >
                                Engineering the <br /> Molecules of Tomorrow
                            </Typography>
                            <Stack spacing={3} sx={{ mb: 6 }}>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        opacity: 0.8,
                                        maxWidth: '600px',
                                        fontWeight: 300,
                                        lineHeight: 1.6,
                                        textAlign: 'justify',
                                    }}
                                >
                                    Since 2009, Sterling Dye Chem has been at the forefront of chemical innovation,
                                    transforming industrial manufacturing with a focus on precision and sustainability.
                                </Typography>

                                <Typography
                                    variant="body1"
                                    sx={{
                                        fontSize: '1.125rem',
                                        fontWeight: 300,
                                        lineHeight: 1.6,
                                        color: 'text.secondary',
                                        textAlign: 'justify',
                                    }}
                                >
                                    Our rigorous R&D processes and commitment to sustainable manufacturing have made us the preferred partner for textile, leather, and polymer industries across 40+ countries.
                                </Typography>
                            </Stack>

                            <Divider sx={{ mb: 4, borderColor: 'divider' }} />

                            <Grid container spacing={4}>
                                {[
                                    { label: "Quality Brands Supplying", val: "07" },
                                    { label: "Customers belives", val: "800+" },
                                    { label: "Authorized Partner", val: "Yes" },
                                ].map((stat, i) => (
                                    <Grid item key={i} xs={4}>
                                        <Typography
                                            variant="h4"
                                            color="primary"
                                            sx={{ fontWeight: 900, mb: 0.5 }}
                                        >
                                            <CountUp val={stat.val} />
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
