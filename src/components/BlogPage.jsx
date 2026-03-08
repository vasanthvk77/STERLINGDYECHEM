import React, { useState } from 'react';
import {
    Box,
    Container,
    Grid,
    Typography,
    Stack,
    Button,
    TextField,
    List,
    ListItem,
    ListItemText,
    Paper,
    Snackbar,
    Alert,
    CircularProgress
} from '@mui/material';
import { Calendar, ArrowRight, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';
import emailjs from '@emailjs/browser';
import db from '../data/db.json';

const ImageSlider = ({ images, title }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const sliderRef = React.useRef(null);

    React.useEffect(() => {
        if (!images || images.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => {
                const nextIndex = (prev + 1) % images.length;
                if (sliderRef.current) {
                    const width = sliderRef.current.clientWidth;
                    sliderRef.current.scrollTo({
                        left: nextIndex * width,
                        behavior: 'smooth'
                    });
                }
                return nextIndex;
            });
        }, 3000);

        return () => clearInterval(interval);
    }, [images]);

    const handleScroll = (e) => {
        if (!sliderRef.current) return;
        const scrollLeft = e.target.scrollLeft;
        const width = sliderRef.current.clientWidth;
        const newIndex = Math.round(scrollLeft / width);
        if (newIndex !== currentIndex) {
            setCurrentIndex(newIndex);
        }
    };

    const handlePrev = (e) => {
        e.stopPropagation();
        setCurrentIndex((prev) => {
            const nextIndex = prev === 0 ? images.length - 1 : prev - 1;
            if (sliderRef.current) {
                const width = sliderRef.current.clientWidth;
                sliderRef.current.scrollTo({ left: nextIndex * width, behavior: 'smooth' });
            }
            return nextIndex;
        });
    };

    const handleNext = (e) => {
        e.stopPropagation();
        setCurrentIndex((prev) => {
            const nextIndex = (prev + 1) % images.length;
            if (sliderRef.current) {
                const width = sliderRef.current.clientWidth;
                sliderRef.current.scrollTo({ left: nextIndex * width, behavior: 'smooth' });
            }
            return nextIndex;
        });
    };

    if (!images || images.length === 0) return null;

    return (
        <Box
            sx={{
                width: '100%',
                height: { xs: '250px', md: '400px' },
                mb: 4,
                position: 'relative',
                borderRadius: '8px',
                overflow: 'hidden'
            }}
        >
            <Box
                ref={sliderRef}
                onScroll={handleScroll}
                sx={{
                    display: 'flex',
                    width: '100%',
                    height: '100%',
                    overflowX: 'auto',
                    overflowY: 'hidden',
                    scrollSnapType: 'x mandatory',
                    scrollBehavior: 'smooth',
                    '&::-webkit-scrollbar': { display: 'none' },
                    msOverflowStyle: 'none',
                    scrollbarWidth: 'none',
                }}
            >
                {images.map((img, idx) => (
                    <Box
                        key={idx}
                        sx={{
                            minWidth: '100%',
                            height: '100%',
                            scrollSnapAlign: 'start',
                            flexShrink: 0,
                            overflow: 'hidden'
                        }}
                    >
                        <img
                            src={img}
                            alt={`${title} - image ${idx + 1}`}
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                transition: 'transform 0.5s ease'
                            }}
                            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                        />
                    </Box>
                ))}
            </Box>

            {images.length > 1 && (
                <>
                    {/* Left Navigation Button */}
                    <Box
                        onClick={handlePrev}
                        sx={{
                            position: 'absolute',
                            left: 16,
                            top: '50%',
                            transform: 'translateY(-50%)',
                            zIndex: 3,
                            bgcolor: 'rgba(255,255,255,0.7)',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            p: 1.5,
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                            backdropFilter: 'blur(4px)',
                            '&:hover': {
                                bgcolor: '#ffffff',
                                transform: 'translateY(-50%) scale(1.1)',
                                boxShadow: '0 6px 16px rgba(0,0,0,0.15)',
                            }
                        }}
                    >
                        <ChevronLeft size={24} color="#000158" strokeWidth={2.5} />
                    </Box>

                    {/* Right Navigation Button */}
                    <Box
                        onClick={handleNext}
                        sx={{
                            position: 'absolute',
                            right: 16,
                            top: '50%',
                            transform: 'translateY(-50%)',
                            zIndex: 3,
                            bgcolor: 'rgba(255,255,255,0.7)',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            p: 1.5,
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                            backdropFilter: 'blur(4px)',
                            '&:hover': {
                                bgcolor: '#ffffff',
                                transform: 'translateY(-50%) scale(1.1)',
                                boxShadow: '0 6px 16px rgba(0,0,0,0.15)',
                            }
                        }}
                    >
                        <ChevronRight size={24} color="#000158" strokeWidth={2.5} />
                    </Box>

                    {/* Navigation Dots */}
                    <Box
                        sx={{
                            position: 'absolute',
                            bottom: 16,
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            gap: 1.5,
                            zIndex: 2
                        }}
                    >
                        {images.map((_, idx) => (
                            <Box
                                key={idx}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setCurrentIndex(idx);
                                    if (sliderRef.current) {
                                        const width = sliderRef.current.clientWidth;
                                        sliderRef.current.scrollTo({
                                            left: idx * width,
                                            behavior: 'smooth'
                                        });
                                    }
                                }}
                                sx={{
                                    width: currentIndex === idx ? 24 : 8,
                                    height: 8,
                                    borderRadius: '4px',
                                    bgcolor: currentIndex === idx ? '#ffffff' : 'rgba(255,255,255,0.5)',
                                    cursor: 'pointer',
                                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.3)'
                                }}
                            />
                        ))}
                    </Box>
                </>
            )}
        </Box>
    );
};

const BlogPage = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState('idle'); // idle, loading, success, error
    const [showSnackbar, setShowSnackbar] = useState(false);
    const [posts, setPosts] = useState([]);

    React.useEffect(() => {
        const fetchInsights = async () => {
            try {
                // Try to fetch from JSON server
                const response = await fetch('http://localhost:5000/insights');
                if (response.ok) {
                    const data = await response.json();
                    setPosts(data);
                } else {
                    // Fallback to static import if server is down
                    setPosts(db.insights || []);
                }
            } catch (err) {
                console.error("Failed to fetch insights:", err);
                setPosts(db.insights || []);
            }
        };
        fetchInsights();
    }, []);

    const handleSubscribe = async (e) => {
        e.preventDefault();
        if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
            setStatus('error');
            return;
        }

        setStatus('loading');

        const templateParams = {
            name: username || 'Visitor',
            email: email,
            phone: 'Not provided',
            whatsapp: 'Not provided',
            requirement: 'Insights Inquiry',
            command: `Question/Ask: ${message}`
        };

        try {
            const SEND_METHOD = 2; // Default to 2 (backend) to match Contact form

            if (SEND_METHOD === 1) {
                const { service_id, public_key, admin_template_id } = db.emailjs_details;
                await emailjs.send(service_id, admin_template_id, templateParams, public_key);
            } else {
                const response = await fetch('/api/sendEmail', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(templateParams)
                });
                if (!response.ok) throw new Error('API Error');
            }

            setStatus('success');
            setUsername('');
            setEmail('');
            setMessage('');
            setShowSnackbar(true);
        } catch (error) {
            console.error('Subscription Error:', error);
            setStatus('error');
            setShowSnackbar(true);
        }
    };

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
                        Technical Insights
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
                                        <ImageSlider
                                            images={post.images || (post.image ? [post.image] : [])}
                                            title={post.title}
                                        />
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
                                        minHeight: '350px',
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
                                            Inquire About Updates
                                        </Typography>

                                        <form onSubmit={handleSubscribe} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                            <TextField
                                                fullWidth
                                                placeholder="Your Name / Username"
                                                variant="outlined"
                                                size="medium"
                                                value={username}
                                                onChange={(e) => setUsername(e.target.value)}
                                                disabled={status === 'loading'}
                                                sx={{
                                                    bgcolor: 'rgba(255, 255, 255, 0.1)',
                                                    borderRadius: '4px',
                                                    '& .MuiOutlinedInput-root': {
                                                        color: '#ffffff',
                                                        '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.3)' },
                                                        '&:hover fieldset': { borderColor: 'rgba(255, 255, 255, 0.5)' },
                                                        '&.Mui-focused fieldset': { borderColor: '#ffffff' }
                                                    },
                                                    '& input::placeholder': { color: 'rgba(255, 255, 255, 0.6)', opacity: 1 }
                                                }}
                                            />
                                            <TextField
                                                fullWidth
                                                placeholder="Corporate Email"
                                                variant="outlined"
                                                size="medium"
                                                value={email}
                                                onChange={(e) => {
                                                    setEmail(e.target.value);
                                                    if (status === 'error') setStatus('idle');
                                                }}
                                                disabled={status === 'loading'}
                                                sx={{
                                                    bgcolor: 'rgba(255, 255, 255, 0.1)',
                                                    borderRadius: '4px',
                                                    '& .MuiOutlinedInput-root': {
                                                        color: '#ffffff',
                                                        '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.3)' },
                                                        '&:hover fieldset': { borderColor: 'rgba(255, 255, 255, 0.5)' },
                                                        '&.Mui-focused fieldset': { borderColor: '#ffffff' }
                                                    },
                                                    '& input::placeholder': { color: 'rgba(255, 255, 255, 0.6)', opacity: 1 }
                                                }}
                                            />
                                            <TextField
                                                fullWidth
                                                placeholder="Your Question / Inquiry"
                                                variant="outlined"
                                                size="medium"
                                                multiline
                                                rows={3}
                                                value={message}
                                                onChange={(e) => setMessage(e.target.value)}
                                                disabled={status === 'loading'}
                                                sx={{
                                                    bgcolor: 'rgba(255, 255, 255, 0.1)',
                                                    borderRadius: '4px',
                                                    '& .MuiOutlinedInput-root': {
                                                        color: '#ffffff',
                                                        '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.3)' },
                                                        '&:hover fieldset': { borderColor: 'rgba(255, 255, 255, 0.5)' },
                                                        '&.Mui-focused fieldset': { borderColor: '#ffffff' }
                                                    },
                                                    '& input::placeholder': { color: 'rgba(255, 255, 255, 0.6)', opacity: 1 },
                                                    '& textarea::placeholder': { color: 'rgba(255, 255, 255, 0.6)', opacity: 1 }
                                                }}
                                            />
                                            <Button
                                                type="submit"
                                                variant="contained"
                                                disabled={status === 'loading'}
                                                sx={{
                                                    py: 1.5,
                                                    px: 3,
                                                    mt: 1,
                                                    bgcolor: '#ffffff',
                                                    color: 'primary.main',
                                                    fontWeight: 800,
                                                    letterSpacing: '0.1em',
                                                    borderRadius: '4px',
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    '&:hover': {
                                                        bgcolor: 'rgba(255, 255, 255, 0.9)'
                                                    }
                                                }}
                                            >
                                                {status === 'loading' ? (
                                                    <CircularProgress size={24} color="inherit" sx={{ mx: 'auto' }} />
                                                ) : (
                                                    <>
                                                        <span>SEND INQUIRY</span>
                                                        <ArrowRight size={20} />
                                                    </>
                                                )}
                                            </Button>
                                        </form>
                                        {status === 'error' && email && (
                                            <Typography variant="caption" sx={{ color: '#fca5a5', display: 'block', mt: 1, fontWeight: 700 }}>
                                                Please enter a valid email
                                            </Typography>
                                        )}
                                    </Box>
                                </Paper>

                            </Stack>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* Success Feedback Snackbar */}
            <Snackbar
                open={showSnackbar}
                autoHideDuration={6000}
                onClose={() => setShowSnackbar(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert
                    onClose={() => setShowSnackbar(false)}
                    severity={status === 'error' ? 'error' : 'success'}
                    icon={status === 'error' ? undefined : <CheckCircle2 size={20} />}
                    sx={{ width: '100%', borderRadius: 0, bgcolor: status === 'error' ? 'error.main' : 'success.main', color: '#fff' }}
                >
                    {status === 'error' ? 'Submission failed. Please try again.' : 'Inquiry sent successfully!'}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default BlogPage;
