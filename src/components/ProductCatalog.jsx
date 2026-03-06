import React from 'react';
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
} from '@mui/material';
import { ArrowRight } from 'lucide-react';

const ProductCatalog = ({ categories, activeCategory, setActiveCategory, filteredProducts, isHomePage, homePageProducts }) => {
    const displayProducts = isHomePage ? homePageProducts : filteredProducts;

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
                        <Stack direction="row" flexWrap="wrap" spacing={2}>
                            {categories.map(cat => (
                                <Button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    variant={activeCategory === cat ? 'contained' : 'outlined'}
                                    sx={{
                                        borderRadius: 0,
                                        px: 3,
                                        py: 1,
                                        fontSize: '10px',
                                        fontWeight: 900,
                                        color: activeCategory === cat ? '#ffffff' : 'rgba(0, 1, 88, 0.6)',
                                        borderColor: activeCategory === cat ? 'primary.main' : 'rgba(0, 1, 88, 0.2)',
                                        '&:hover': {
                                            borderColor: 'primary.main',
                                            bgcolor: activeCategory === cat ? 'primary.main' : 'transparent',
                                            color: activeCategory === cat ? '#ffffff' : 'primary.main',
                                        },
                                    }}
                                >
                                    {cat}
                                </Button>
                            ))}
                        </Stack>
                    )}
                </Stack>

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
                        {displayProducts.map((product, i) => (
                            <Box
                                key={i}
                                sx={{
                                    width: { xs: '280px', sm: '320px', md: '340px' },
                                    flexShrink: 0
                                }}
                            >
                                <ProductCard product={product} />
                            </Box>
                        ))}
                    </Box>
                ) : (
                    <Grid container spacing={3}>
                        {displayProducts.map((product, i) => (
                            <Grid item key={i} xs={12} sm={6} md={4} lg={3}>
                                <ProductCard product={product} />
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Container>
        </Box>
    );
};

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
        <Box sx={{ position: 'relative', height: 192, overflow: 'hidden', bgcolor: 'rgba(223, 223, 223, 0.3)' }}>
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
                image={product.image || "/public/images/products/levis_bristle.png"}
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
                p: 3,
                flexGrow: 1,
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: 'url(/public/images/products/products_bg.png)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    opacity: 0.60, // Maintaining user preference
                    zIndex: 0
                },
                // Solid-ish blue for legibility
            }}
        >
            <Box sx={{ position: 'relative', zIndex: 1, height: '100%', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <Typography
                    variant="h6"
                    sx={{
                        fontSize: '1rem',
                        fontWeight: 900,
                        textTransform: 'uppercase',
                        color: 'white',
                        mb: 2,
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
                    <Divider sx={{ mb: 2, borderColor: 'rgba(255, 255, 255, 0.1)' }} />
                    <Typography
                        sx={{
                            fontSize: '0.875rem',
                            fontWeight: 500,
                            lineHeight: 1.5,
                            color: 'rgba(255, 255, 255, 1)',
                            display: '-webkit-box',
                            WebkitLineClamp: 3, // Show up to 3 lines
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
                        mt: 3,
                        py: 1.5,
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
