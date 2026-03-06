import React from 'react';
import {
    Box,
    Container,
    Grid,
    Typography,
    Stack,
    Button,
    TextField,
    IconButton,
    Divider,
    List,
    ListItem,
    ListItemText,
    Paper
} from '@mui/material';
import { Calendar, ArrowRight } from 'lucide-react';

const BlogPage = () => {
    const posts = [
        {
            title: "The Shift Toward Carbon-Neutral Dyes",
            date: "Feb 24, 2026",
            category: "Sustainability",
            excerpt: "Exploring the next generation of bio-based dyestuffs that reduce the carbon footprint of the textile industry."
        },
        {
            title: "Optimizing High-Concentration Reactive Dyes",
            date: "Jan 15, 2026",
            category: "Technical",
            excerpt: "Technical analysis on achieving deeper shades with 30% less water usage in industrial dyeing processes."
        },
        {
            title: "Global Supply Chain Resilience in 2026",
            date: "Dec 10, 2025",
            category: "Market News",
            excerpt: "How Sterling Dye Chem is navigating global logistics challenges to ensure timely delivery to 40+ countries."
        }
    ];

    return (
        <Box sx={{ bgcolor: '#ffffff' }}>
            {/* HERO SECTION */}
            <Box sx={{ py: { xs: 8, lg: 12 }, borderBottom: '1px solid', borderColor: 'divider' }}>
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
                            Industry Insights
                        </Typography>
                    </Box>
                    <Typography
                        variant="h1"
                        color="primary"
                        sx={{
                            fontSize: { xs: '3rem', md: '5rem' },
                            fontWeight: 900,
                            textTransform: 'uppercase',
                            letterSpacing: '-0.05em'
                        }}
                    >
                        Technical Blog
                    </Typography>
                </Container>
            </Box>

            {/* MAIN CONTENT */}
            <Box sx={{ py: { xs: 8, lg: 12 } }}>
                <Container maxWidth="lg">
                    <Grid container spacing={10}>
                        <Grid item xs={12} lg={8}>
                            <Stack spacing={12}>
                                {posts.map((post, i) => (
                                    <Box component="article" key={i} sx={{ group: true }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                                            <Typography
                                                variant="caption"
                                                sx={{
                                                    fontWeight: 900,
                                                    textTransform: 'uppercase',
                                                    letterSpacing: '0.2em',
                                                    color: 'primary.main'
                                                }}
                                            >
                                                {post.category}
                                            </Typography>
                                            <Typography variant="caption" sx={{ color: 'text.disabled' }}>•</Typography>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.disabled' }}>
                                                <Calendar size={12} />
                                                <Typography variant="caption" sx={{ fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                                                    {post.date}
                                                </Typography>
                                            </Box>
                                        </Box>
                                        <Typography
                                            variant="h3"
                                            color="primary"
                                            sx={{
                                                fontWeight: 900,
                                                textTransform: 'uppercase',
                                                letterSpacing: '-0.02em',
                                                mb: 3,
                                                cursor: 'pointer',
                                                '&:hover': { color: 'primary.light' },
                                                transition: 'color 0.2s'
                                            }}
                                        >
                                            {post.title}
                                        </Typography>
                                        <Typography
                                            variant="body1"
                                            sx={{
                                                color: 'text.secondary',
                                                fontWeight: 300,
                                                lineHeight: 1.8,
                                                fontSize: '1.125rem',
                                                mb: 4,
                                                maxWidth: '600px'
                                            }}
                                        >
                                            {post.excerpt}
                                        </Typography>
                                        <Button
                                            variant="text"
                                            color="primary"
                                            sx={{
                                                p: 0,
                                                minWidth: 0,
                                                fontWeight: 900,
                                                textTransform: 'uppercase',
                                                letterSpacing: '0.2em',
                                                fontSize: '10px',
                                                borderBottom: '2px solid',
                                                borderColor: 'primary.main',
                                                borderRadius: 0,
                                                '&:hover': { bgcolor: 'transparent', gap: 2 },
                                                transition: 'all 0.3s'
                                            }}
                                            endIcon={<ArrowRight size={14} />}
                                        >
                                            Read Analysis
                                        </Button>
                                    </Box>
                                ))}
                            </Stack>
                        </Grid>

                        <Grid item xs={12} lg={4}>
                            <Stack spacing={8}>
                                {/* NEWSLETTER BOX */}
                                <Paper
                                    elevation={0}
                                    sx={{
                                        position: 'relative',
                                        aspectRatio: '1/1',
                                        borderRadius: 0,
                                        overflow: 'hidden',
                                        bgcolor: 'primary.main',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'flex-end',
                                        p: 4
                                    }}
                                >
                                    <Box
                                        component="img"
                                        src="/images/blog_news.png"
                                        alt="Newsletter"
                                        sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.3, filter: 'grayscale(1)' }}
                                    />
                                    <Box sx={{ position: 'relative', zIndex: 1, background: 'linear-gradient(to top, #000158, transparent)', m: -4, p: 4, pt: 8 }}>
                                        <Typography
                                            variant="h5"
                                            sx={{ color: '#ffffff', fontWeight: 900, textTransform: 'uppercase', mb: 3, letterSpacing: '-0.02em' }}
                                        >
                                            Subscribe to Technical Reports
                                        </Typography>
                                        <Box sx={{ display: 'flex' }}>
                                            <TextField
                                                fullWidth
                                                placeholder="Corporate Email"
                                                variant="filled"
                                                size="small"
                                                sx={{ bgcolor: '#ffffff', borderRadius: 0, '& .MuiFilledInput-root': { borderRadius: 0, bgcolor: '#ffffff', '&:hover': { bgcolor: '#ffffff' }, '&.Mui-focused': { bgcolor: '#ffffff' } } }}
                                                InputProps={{ disableUnderline: true }}
                                            />
                                            <Button
                                                variant="contained"
                                                sx={{ borderRadius: 0, minWidth: 60, p: 0 }}
                                            >
                                                <ArrowRight size={20} />
                                            </Button>
                                        </Box>
                                    </Box>
                                </Paper>

                                {/* CATEGORIES */}
                                <Box sx={{ p: 4, border: '1px solid', borderColor: 'divider' }}>
                                    <Typography
                                        variant="subtitle1"
                                        sx={{ fontWeight: 900, textTransform: 'uppercase', mb: 4, color: 'primary.main' }}
                                    >
                                        Categories
                                    </Typography>
                                    <List disablePadding>
                                        {['Technical Analysis', 'Sustainability', 'Market Reports', 'Case Studies'].map((cat, i) => (
                                            <ListItem
                                                key={cat}
                                                disableGutters
                                                sx={{
                                                    borderBottom: i === 3 ? 'none' : '1px solid',
                                                    borderColor: 'divider',
                                                    py: 2,
                                                    cursor: 'pointer',
                                                    '&:hover': { '& .cat-text': { color: 'primary.main' } }
                                                }}
                                            >
                                                <ListItemText
                                                    primary={cat}
                                                    className="cat-text"
                                                    primaryTypographyProps={{
                                                        variant: 'caption',
                                                        sx: { fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'text.secondary', transition: 'color 0.2s' }
                                                    }}
                                                />
                                                <Typography variant="caption" sx={{ opacity: 0.3, fontWeight: 900 }}>05</Typography>
                                            </ListItem>
                                        ))}
                                    </List>
                                </Box>
                            </Stack>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </Box>
    );
};

export default BlogPage;
