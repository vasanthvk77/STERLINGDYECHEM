import React, { useState } from 'react';
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

const getImageUrl = (path) => {
    if (!path) return '';
    if (path.startsWith('http') || path.startsWith('data:')) return path;
    const cleanPath = path.startsWith('/') ? path.substring(1) : path;
    const finalPath = cleanPath.startsWith('public/') ? cleanPath.substring(7) : cleanPath;
    return `${import.meta.env.BASE_URL}${finalPath}`;
};

const ProductCatalog = ({ categories, activeCategory, setActiveCategory, activeSubtype, setActiveSubtype, filteredProducts, isHomePage }) => {
    const [searchQuery, setSearchQuery] = useState('');


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

    return (
        <Box component="section" sx={{ py: { xs: 8, lg: 12 }, bgcolor: 'rgba(223, 223, 223, 0.2)' }}>
            <Container maxWidth="lg">
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
                        <Button
                            variant="outlined"
                            color="primary"
                            onClick={() => setSearchQuery('')}
                            sx={{ borderRadius: 0, px: 4, py: 1, fontWeight: 800 }}
                        >
                            Clear Search
                        </Button>
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
                            <Box
                                sx={{
                                    display: 'flex',
                                    gap: 3,
                                    overflowX: 'auto',
                                    pb: 4,
                                    px: 1,
                                    mx: -1,
                                    scrollBehavior: 'smooth',
                                    WebkitOverflowScrolling: 'touch',
                                    '&::-webkit-scrollbar': {
                                        height: '6px',
                                    },
                                    '&::-webkit-scrollbar-track': {
                                        bgcolor: 'rgba(0, 1, 88, 0.05)',
                                        borderRadius: '10px',
                                    },
                                    '&::-webkit-scrollbar-thumb': {
                                        bgcolor: 'rgba(0, 1, 88, 0.1)',
                                        borderRadius: '10px',
                                        '&:hover': {
                                            bgcolor: 'rgba(0, 1, 88, 0.2)',
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
                        ) : (
                            <Box
                                sx={{
                                    maxHeight: '915px', // Precisely fits 2 rows (444px card + 24px gap = 912px)
                                    overflowY: 'auto',
                                    overflowX: 'hidden',
                                    pr: 2,
                                    mr: -2, // Offset the padding so the grid doesn't shift
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
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            position: 'relative',
            overflow: 'hidden',
            '&:hover': {
                transform: 'translateY(-10px)',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
                '& .MuiCardMedia-root': {
                    transform: 'scale(1.05)',
                },
                '& .brand-arrow': {
                    transform: 'translateX(5px)',
                    color: 'primary.main'
                }
            }
        }}
    >
        <Box sx={{ position: 'relative', height: { xs: 220, md: 240 }, overflow: 'hidden' }}>
            <CardMedia
                component="img"
                image={getImageUrl(brand.image)}
                alt={brand.brand}
                sx={{
                    height: '100%',
                    width: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease'
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
                <ArrowRight className="brand-arrow" size={18} style={{ transition: 'all 0.3s ease' }} />
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
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            position: 'relative',
            overflow: 'hidden',
            '&:hover': {
                transform: 'translateY(-10px)',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
                '& .MuiCardMedia-root': {
                    transform: 'scale(1.05)',
                },
                '& .subtype-arrow': {
                    transform: 'translateX(5px)',
                    color: 'primary.main'
                }
            }
        }}
    >
        <Box sx={{ position: 'relative', height: { xs: 200, md: 220 }, overflow: 'hidden' }}>
            <CardMedia
                component="img"
                image={getImageUrl(subtype.image)}
                alt={subtype.name}
                sx={{
                    height: '100%',
                    width: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease'
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
                <ArrowRight className="subtype-arrow" size={18} style={{ transition: 'all 0.3s ease' }} />
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
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            position: 'relative',
            overflow: 'hidden',
            '&:hover': {
                borderColor: 'rgba(255, 255, 255, 0.3)',
                transform: 'translateY(-10px)',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
                '& .MuiCardMedia-root': {
                    transform: 'scale(1.1)',
                },
                '& .overlay-hover': {
                    opacity: 0.1,
                }
            }
        }}
    >
        <Box sx={{ position: 'relative', height: { xs: 200, md: 200 }, overflow: 'hidden', bgcolor: 'rgba(223, 223, 223, 0.3)' }}>
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
                image={getImageUrl(product.image || "/public/images/products/levis_bristle.png")}
                alt={product.name}
                sx={{
                    height: '100%',
                    width: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease'
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
                height: { xs: 190, md: 220 },
                flexGrow: 1,
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: 'url(/public/images/products/products_bg.png)',
                    backgroundSize: '140%',
                    backgroundPosition: 'center',
                    opacity: 0.40, // Maintaining user preference
                    zIndex: 0
                },
                // Solid-ish blue for legibility
            }}
        >
            <Box sx={{ position: 'relative', zIndex: 1, height: '100%', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <Typography
                    variant="h6"
                    sx={{
                        fontSize: { xs: '1rem', md: '1rem' },
                        fontWeight: 900,
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
                        {product.command || product.app || "Details coming soon..."}
                    </Typography>
                </Box>

                <Button
                    fullWidth
                    sx={{
                        mt: { xs: 2, md: 3 },
                        py: { xs: 1, md: 1.5 },
                        bgcolor: 'rgba(255, 255, 255, 0.1)',
                        color: 'white',
                        fontSize: '10px',
                        fontWeight: 900,
                        borderRadius: 0,
                        '&:hover': {
                            bgcolor: 'white',
                            color: '#000158',
                        }
                    }}
                    endIcon={<ArrowRight size={14} />}
                >
                    Technical Specs
                </Button>
            </Box>
        </CardContent>
    </Card>
);

export default ProductCatalog;
