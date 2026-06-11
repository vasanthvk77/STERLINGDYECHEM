import React, { useState, useEffect, useRef } from 'react';
import {
    Box,
    Container,
    Typography,
    Button,
    Grid,
    Card,
    CardMedia,
    CardContent,
    Stack,
    Divider,
    TextField,
    InputAdornment
} from '@mui/material';
import { ArrowRight, Search } from 'lucide-react';
import levisBristleImage from '../assets/images/products/levis_bristle.png';
import productsBgImage from '../assets/images/products/products_bg.png';
import AnimatedButton from './AnimatedButton';


const ProductCatalog = ({ categories, activeCategory, setActiveCategory, activeSubtype, setActiveSubtype, filteredProducts, isHomePage }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const pinRef = useRef(null);
    const scrollRef = useRef(null);
    const [translateX, setTranslateX] = useState(0);
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        if (!isHomePage) return;

        const handleScroll = () => {
            const pinEl = pinRef.current;
            const scrollEl = scrollRef.current;
            if (!pinEl || !scrollEl) return;

            const rect = pinEl.getBoundingClientRect();
            const viewHeight = window.innerHeight;
            
            const totalScroll = pinEl.offsetHeight - viewHeight;
            if (totalScroll <= 0) return;

            const scrolled = -rect.top;
            const progress = Math.max(0, Math.min(1, scrolled / totalScroll));
            setScrollProgress(progress);

            const parentWidth = scrollEl.parentElement ? scrollEl.parentElement.clientWidth : window.innerWidth;
            const maxTranslation = scrollEl.scrollWidth - parentWidth;

            if (maxTranslation > 0) {
                setTranslateX(progress * maxTranslation);
            } else {
                setTranslateX(0);
            }
        };

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleScroll);
        const timer = setTimeout(handleScroll, 100);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleScroll);
            clearTimeout(timer);
        };
    }, [isHomePage, filteredProducts, activeCategory, activeSubtype]);


    // Determine what mode we are rendering
    let renderMode = 'PRODUCTS'; // default if search
    if (!searchQuery) {
        if (activeCategory === 'All') renderMode = 'BRANDS';
        else if (!activeSubtype) renderMode = 'SUBTYPES';
    }

    // Flatten all products across categories and subtypes for search purposes
    const allProducts = React.useMemo(() => {
        return filteredProducts.reduce((acc, brand) => {
            const brandProducts = (brand.subtypes || []).reduce((subAcc, sub) => {
                const subProducts = (sub.products || []).map(p => ({
                    ...p,
                    category: p.category || brand.brand,
                    name: p.name || sub.name
                }));
                return [...subAcc, ...subProducts];
            }, []);
            return [...acc, ...brandProducts];
        }, []);
    }, [filteredProducts]);

    const displayItems = React.useMemo(() => {
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            return allProducts.filter(product =>
                (product.name?.toLowerCase().includes(query)) ||
                (product.category?.toLowerCase().includes(query)) ||
                (product.app?.toLowerCase().includes(query))
            );
        }

        if (renderMode === 'BRANDS') {
            return isHomePage ? filteredProducts.slice(0, 4) : filteredProducts;
        }

        if (renderMode === 'SUBTYPES') {
            // We only have one brand in filteredProducts if activeCategory !== 'All'
            const currentBrand = filteredProducts[0];
            return currentBrand ? (currentBrand.subtypes || []) : [];
        }

        if (renderMode === 'PRODUCTS') {
            const currentBrand = filteredProducts[0];
            if (!currentBrand) return [];
            const currentSubtype = (currentBrand.subtypes || []).find(s => s.name === activeSubtype);
            return currentSubtype ? (currentSubtype.products || []).map(p => ({
                ...p,
                category: p.category || currentBrand.brand,
                name: p.name || currentSubtype.name
            })) : [];
        }

        return [];
    }, [searchQuery, renderMode, filteredProducts, allProducts, activeSubtype, isHomePage]);

    const catalogContent = (
        <Box 
            component="section" 
            sx={{ 
                pt: isHomePage ? { xs: 8, lg: 0 } : { xs: 4, lg: 6 }, 
                pb: isHomePage ? { xs: 8, lg: 0 } : { xs: 8, lg: 12 }, 
                bgcolor: isHomePage ? 'transparent' : '#f8fafc',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                minHeight: isHomePage ? { lg: '100vh' } : 'auto'
            }}
        >
            <Container maxWidth={false} sx={{ maxWidth: '1350px', width: { xs: '100%', lg: 'calc(100% - 80px)' }, px: { xs: 2, lg: 2 }, mx: 'auto', overflow: 'hidden' }}>
                <Stack
                    direction={{ xs: 'column', md: 'row' }}
                    justifyContent="space-between"
                    alignItems={{ xs: 'flex-start', md: 'flex-end' }}
                    spacing={4}
                    sx={{ mb: 8 }}
                >
                    <Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
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
                                {isHomePage ? 'Featured Range' : 'Our Inventory'}
                            </Typography>
                        </Box>
                        <Typography variant="h2" color="primary">
                            {isHomePage ? 'Products' : 'Product Catalog'}
                        </Typography>
                    </Box>

                    {!isHomePage && (
                        <Stack direction="column" alignItems={{ xs: 'flex-start', md: 'flex-end' }} spacing={3} sx={{ width: { xs: '100%', md: 'auto' } }}>
                            <Box sx={{ width: { xs: '100%', md: '450px' } }}>
                                <TextField
                                    fullWidth
                                    placeholder="Search products or applications..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    variant="outlined"
                                    size="small"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Search size={18} color="#000158" opacity={0.6} />
                                            </InputAdornment>
                                        ),
                                        sx: {
                                            bgcolor: 'white',
                                            borderRadius: 0,
                                            fontSize: '14px',
                                            fontFamily: 'inherit',
                                            fontWeight: 500,
                                            boxShadow: 'none',
                                            '& fieldset': {
                                                borderColor: 'rgba(0, 1, 88, 0.2)',
                                                borderWidth: '1px',
                                                borderRadius: 0
                                            },
                                            '&:hover fieldset': { borderColor: 'rgba(0, 1, 88, 0.4)' },
                                            '&.Mui-focused fieldset': { borderColor: 'primary.main', borderWidth: '2px' },
                                        }
                                    }}
                                />
                            </Box>
                        </Stack>
                    )}
                </Stack>

                {displayItems.length === 0 ? (
                    <Box sx={{ textAlign: 'center', py: 10 }}>
                        <Typography variant="h5" color="text.secondary" sx={{ fontWeight: 700, mb: 2 }}>
                            No products found
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                            We couldn't find anything matching "{searchQuery}".
                        </Typography>
                        <AnimatedButton
                            lightBg={false}
                            onClick={() => setSearchQuery('')}
                            sx={{ px: 4, py: 1 }}
                        >
                            Clear Search
                        </AnimatedButton>
                    </Box>
                ) : (
                    <>
                        {!isHomePage && activeCategory !== 'All' && !searchQuery && renderMode === 'SUBTYPES' && (
                            <Box sx={{ mb: 4, display: 'flex', gap: 2 }}>
                                <Button
                                    onClick={() => setActiveCategory('All')}
                                    sx={{ color: 'primary.main', fontWeight: 700 }}
                                    startIcon={<ArrowRight size={18} style={{ transform: 'rotate(180deg)' }} />}
                                >
                                    BACK TO ALL BRANDS
                                </Button>
                                <Typography variant="h6" color="primary" sx={{ fontWeight: 900, textTransform: 'uppercase' }}>
                                    / {activeCategory}
                                </Typography>
                            </Box>
                        )}
                        {!isHomePage && renderMode === 'PRODUCTS' && !searchQuery && (
                            <Box sx={{ mb: 4, display: 'flex', gap: 2, alignItems: 'center' }}>
                                <Button
                                    onClick={() => setActiveSubtype(null)}
                                    sx={{ color: 'primary.main', fontWeight: 700 }}
                                    startIcon={<ArrowRight size={18} style={{ transform: 'rotate(180deg)' }} />}
                                >
                                    BACK TO {activeCategory}
                                </Button>
                                <Typography variant="h6" color="primary" sx={{ fontWeight: 900, textTransform: 'uppercase' }}>
                                    / {activeSubtype}
                                </Typography>
                            </Box>
                        )}
                        {isHomePage ? (
                            <>
                                <Box
                                    ref={scrollRef}
                                sx={{
                                    display: 'flex',
                                    gap: 3,
                                    pb: 4,
                                    px: 1,
                                    mx: -1,
                                    scrollBehavior: { xs: 'smooth', lg: 'auto' },
                                    WebkitOverflowScrolling: 'touch',
                                    width: { xs: 'auto', lg: 'max-content' },
                                    transform: {
                                        xs: 'none',
                                        lg: `translate3d(-${translateX}px, 0, 0)`
                                    },
                                    transition: {
                                        xs: 'none',
                                        lg: 'transform 0.1s ease-out'
                                    },
                                    overflowX: {
                                        xs: 'auto',
                                        lg: 'visible'
                                    },
                                    '&::-webkit-scrollbar': {
                                        height: '6px',
                                        display: { xs: 'block', lg: 'none' }
                                    },
                                    '&::-webkit-scrollbar-track': {
                                        bgcolor: 'rgba(0, 1, 88, 0.05)',
                                        borderRadius: '10px',
                                    },
                                    '&::-webkit-scrollbar-thumb': {
                                        bgcolor: 'primary.main',
                                        borderRadius: '10px',
                                        '&:hover': {
                                            bgcolor: 'rgba(0, 1, 88, 0.8)',
                                        }
                                    }
                                }}
                            >
                                {displayItems.map((item, i) => (
                                    <Box
                                        key={i}
                                        sx={{
                                            width: { xs: '280px', sm: '320px', md: '340px' },
                                            flexShrink: 0
                                        }}
                                    >
                                        {renderMode === 'BRANDS' ? (
                                            <BrandCard brand={item} onClick={() => setActiveCategory(item.brand)} />
                                        ) : renderMode === 'SUBTYPES' ? (
                                            <SubtypeCard subtype={item} onClick={() => setActiveSubtype(item.name)} />
                                        ) : (
                                            <ProductCard product={item} />
                                        )}
                                    </Box>
                                ))}
                            </Box>
                            <Box 
                                sx={{ 
                                    display: { xs: 'none', lg: 'block' }, 
                                    width: '100%', 
                                    height: '6px', 
                                    bgcolor: 'rgba(0, 1, 88, 0.05)', 
                                    mt: 4, 
                                    borderRadius: '10px',
                                    position: 'relative',
                                    overflow: 'hidden'
                                }}
                            >
                                <Box 
                                    sx={{ 
                                        position: 'absolute', 
                                        left: 0, 
                                        top: 0, 
                                        height: '100%', 
                                        width: `${scrollProgress * 100}%`, 
                                        bgcolor: 'primary.main', 
                                        borderRadius: '10px',
                                        transition: 'width 0.1s ease-out'
                                    }}
                                />
                            </Box>
                        </>
                        ) : (
                            <Box
                                sx={{
                                    maxHeight: '915px',
                                    overflowY: 'auto',
                                    overflowX: 'hidden',
                                    pr: 2,
                                    mr: -2,
                                    pb: 2,
                                    '&::-webkit-scrollbar': {
                                        width: '6px',
                                    },
                                    '&::-webkit-scrollbar-track': {
                                        bgcolor: 'rgba(0, 1, 88, 0.05)',
                                        borderRadius: '10px',
                                    },
                                    '&::-webkit-scrollbar-thumb': {
                                        bgcolor: 'rgba(0, 1, 88, 0.2)',
                                        borderRadius: '10px',
                                        '&:hover': {
                                            bgcolor: 'primary.main',
                                        }
                                    }
                                }}
                            >
                                <Grid container spacing={3} justifyContent="center">
                                    {displayItems.map((item, i) => (
                                        <Grid item key={i} xs={12} sm={6} md={4} lg={3}>
                                            <Box sx={{ maxWidth: { xs: '280px', sm: '100%' }, mx: 'auto', height: '100%' }}>
                                                {renderMode === 'BRANDS' ? (
                                                    <BrandCard brand={item} onClick={() => setActiveCategory(item.brand)} />
                                                ) : renderMode === 'SUBTYPES' ? (
                                                    <SubtypeCard subtype={item} onClick={() => setActiveSubtype(item.name)} />
                                                ) : (
                                                    <ProductCard product={item} />
                                                )}
                                            </Box>
                                        </Grid>
                                    ))}
                                </Grid>
                            </Box>
                        )}
                    </>
                )}
            </Container>
        </Box>
    );

    if (isHomePage) {
        return (
            <Box 
                ref={pinRef} 
                sx={{ 
                    position: 'relative', 
                    height: { xs: 'auto', lg: '180vh' },
                    bgcolor: '#f8fafc'
                }}
            >
                <Box 
                    sx={{ 
                        position: { xs: 'relative', lg: 'sticky' }, 
                        top: 0, 
                        height: { xs: 'auto', lg: '100vh' }, 
                        display: 'flex', 
                        alignItems: 'center', 
                        overflow: 'hidden',
                        width: '100%',
                        bgcolor: '#f8fafc'
                    }}
                >
                    {catalogContent}
                </Box>
            </Box>
        );
    }

    return catalogContent;
};

const BrandCard = ({ brand, onClick }) => (
    <Card
        onClick={onClick}
        sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            borderRadius: 0,
            border: 'none',
            bgcolor: '#ffffff',
            cursor: 'pointer',
            boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
            transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            willChange: 'transform, box-shadow',
            position: 'relative',
            overflow: 'hidden',
            '&:hover': {
                transform: 'translate3d(0, -10px, 0)',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
                '& .MuiCardMedia-root': {
                    transform: 'scale(1.05) translate3d(0,0,0)',
                },
                '& .brand-arrow': {
                    transform: 'translate3d(5px, 0, 0)',
                    color: 'primary.main'
                }
            }
        }}
    >
        <Box sx={{ position: 'relative', height: { xs: 220, md: 240 }, overflow: 'hidden' }}>
            <CardMedia
                component="img"
                src={brand.image || levisBristleImage}
                alt={brand.brand}
                sx={{
                    height: '100%',
                    width: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease',
                    willChange: 'transform'
                }}
            />
            <Box
                sx={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(0,1,88,0.8) 0%, rgba(0,1,88,0) 100%)',
                    display: 'flex',
                    alignItems: 'flex-end',
                    p: 3
                }}
            >
                <Typography variant="h5" sx={{ color: 'white', fontWeight: 900, textTransform: 'uppercase' }}>
                    {brand.brand}
                </Typography>
            </Box>
        </Box>
        <CardContent sx={{ p: 3, flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                    mb: 3,
                    lineHeight: 1.6,
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    textAlign: 'justify'
                }}
            >
                {brand.description}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'text.secondary', fontWeight: 700, fontSize: '0.875rem' }}>
                <Typography variant="caption" sx={{ textTransform: 'uppercase', letterSpacing: '0.1em' }}>View More</Typography>
                <ArrowRight className="brand-arrow" size={18} style={{ transition: 'transform 0.3s ease, color 0.3s ease', willChange: 'transform' }} />
            </Box>
        </CardContent>
    </Card>
);

const SubtypeCard = ({ subtype, onClick }) => (
    <Card
        onClick={onClick}
        sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            borderRadius: 0,
            border: 'none',
            bgcolor: '#ffffff',
            cursor: 'pointer',
            boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
            transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            willChange: 'transform, box-shadow',
            position: 'relative',
            overflow: 'hidden',
            '&:hover': {
                transform: 'translate3d(0, -10px, 0)',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
                '& .MuiCardMedia-root': {
                    transform: 'scale(1.05) translate3d(0,0,0)',
                },
                '& .subtype-arrow': {
                    transform: 'translate3d(5px, 0, 0)',
                    color: 'primary.main'
                }
            }
        }}
    >
        <Box sx={{ position: 'relative', height: { xs: 200, md: 220 }, overflow: 'hidden' }}>
            <CardMedia
                component="img"
                src={subtype.image || levisBristleImage}
                alt={subtype.name}
                sx={{
                    height: '100%',
                    width: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease',
                    willChange: 'transform'
                }}
            />
            <Box
                sx={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(0,1,88,0.85) 0%, rgba(0,1,88,0) 100%)',
                    display: 'flex',
                    alignItems: 'flex-end',
                    p: 3
                }}
            >
                <Typography variant="h6" sx={{ color: 'white', fontWeight: 900, textTransform: 'uppercase' }}>
                    {subtype.name}
                </Typography>
            </Box>
        </Box>
        <CardContent sx={{ p: 3, flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                    mb: 3,
                    lineHeight: 1.6,
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                }}
            >
                {subtype.description}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'text.secondary', fontWeight: 700, fontSize: '0.875rem' }}>
                <Typography variant="caption" sx={{ textTransform: 'uppercase', letterSpacing: '0.1em' }}>View More</Typography>
                <ArrowRight className="subtype-arrow" size={18} style={{ transition: 'transform 0.3s ease, color 0.3s ease', willChange: 'transform' }} />
            </Box>
        </CardContent>
    </Card>
);

const ProductCard = ({ product }) => (
    <Card
        sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            borderRadius: 0,
            border: '1px solid rgba(255, 255, 255, 0.1)',
            bgcolor: '#000158',
            color: 'white',
            boxShadow: 'none',
            transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.4s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            willChange: 'transform, border-color, box-shadow',
            position: 'relative',
            overflow: 'hidden',
            '&:hover': {
                borderColor: 'rgba(255, 255, 255, 0.3)',
                transform: 'translate3d(0, -10px, 0)',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
                '& .MuiCardMedia-root': {
                    transform: 'scale(1.1) translate3d(0,0,0)',
                },
                '& .overlay-hover': {
                    opacity: 0.1,
                }
            }
        }}
    >
        <Box sx={{ position: 'relative', height: { xs: 200, md: 300 }, overflow: 'hidden', bgcolor: 'rgba(223, 223, 223, 0.3)' }}>
            <Box
                className="overlay-hover"
                sx={{
                    position: 'absolute',
                    inset: 0,
                    bgcolor: 'primary.main',
                    opacity: 0,
                    transition: 'opacity 0.5s ease',
                    zIndex: 1
                }}
            />
            <CardMedia
                component="img"
                src={product.image}
                alt={product.name}
                sx={{
                    height: '100%',
                    width: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease',
                    willChange: 'transform'
                }}
            />
            <Typography
                sx={{
                    position: 'absolute',
                    top: 12,
                    right: 12,
                    fontSize: '8px',
                    fontWeight: 900,
                    textTransform: 'uppercase',
                    letterSpacing: '0.2em',
                    color: 'primary.main',
                    bgcolor: 'rgba(255, 255, 255, 0.9)',
                    
                    px: 1,
                    py: 0.5,
                    border: '1px solid',
                    borderColor: 'divider',
                    zIndex: 2,
                    backdropFilter: 'blur(4px)',
                }}
            >
                {product.category}
            </Typography>
        </Box>

        <CardContent
            sx={{
                p: { xs: 2, md: 3 },
                height: { xs: 190, md: 70 },
                flexGrow: 1,
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: `url(${productsBgImage})`,
                    backgroundSize: '140%',
                    backgroundPosition: 'center',
                    opacity: 0.40, // Maintaining user preference
                    zIndex: 0
                },
            }}
        >
            <Box sx={{ position: 'relative', zIndex: 1, height: '100%', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <Typography
                    variant="h6"
                    sx={{
                        fontSize: { xs: '1rem', md: '1rem' },
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        color: 'white',
                        mb: { xs: 0, md: 2 },
                        lineHeight: 1.2,
                        minHeight: '2.4em',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                    }}
                >
                    {product.name}
                </Typography>

                <Box sx={{ mt: 'auto' }}>
                    <Divider sx={{ mb: 0, borderColor: 'rgba(255, 255, 255, 0.1)' }} />
                    <Typography
                        sx={{
                            fontSize: '0.875rem',
                            fontWeight: 500,
                            lineHeight: 1.5,
                            color: 'rgba(255, 255, 255, 1)',
                            display: '-webkit-box',
                            WebkitLineClamp: 3, // Show up to 3 lines
                            justifyContent: 'center',
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            wordBreak: 'break-word', // Ensure long words don't stretch card
                            mb: 1
                        }}
                    >
                        {product.command || product.app}
                    </Typography>
                </Box>

            
            </Box>
        </CardContent>
    </Card>
);

export default ProductCatalog;
