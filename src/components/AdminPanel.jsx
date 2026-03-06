import React, { useState } from 'react';
import {
    Box,
    Container,
    Typography,
    Button,
    Stack,
    Paper,
    Grid,
    TextField,
    MenuItem,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton,
    CircularProgress,
    Avatar
} from '@mui/material';
import {
    Plus as PlusIcon,
    Trash2 as TrashIcon,
    Package as PackageIcon,
    LogOut as LogOutIcon,
    Image as ImageIcon
} from 'lucide-react';

const AdminPanel = ({ products, onAdd, onDelete, onLogout }) => {
    const [isAdding, setIsAdding] = useState(false);
    const [newProduct, setNewProduct] = useState({
        name: '',
        category: 'Reactive Dyes',
        cas: '',
        app: '',
        image: '/images/products/reactive.png'
    });
    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const categories = ['Silicone Inks', 'Oilbase Non PVC', 'Specialitys', 'Waterbase Pigments', 'Eco friendly water based textile inks'];

    const handleAdd = async (e) => {
        e.preventDefault();
        setLoading(true);

        let finalImageUrl = newProduct.image;

        // Upload image first if a file is selected
        if (selectedFile) {
            const formData = new FormData();
            formData.append('image', selectedFile);

            try {
                const uploadRes = await fetch('http://localhost:5000/api/upload', {
                    method: 'POST',
                    body: formData
                });
                const uploadData = await uploadRes.json();
                finalImageUrl = uploadData.url;
            } catch (err) {
                console.error("Upload failed", err);
                setLoading(false);
                return; // Stop further execution if upload fails
            }
        }

        await onAdd({ ...newProduct, image: finalImageUrl });

        setLoading(false);
        setIsAdding(false);
        setSelectedFile(null);
        setNewProduct({
            name: '',
            category: 'Reactive Dyes',
            cas: '',
            app: '',
            image: '/images/products/reactive.png'
        });
    };

    return (
        <Box sx={{ pt: 12, minHeight: '100vh', bgcolor: 'rgba(223, 223, 223, 0.2)' }}>
            {/* HEADER */}
            <Box sx={{ bgcolor: '#ffffff', borderBottom: '1px solid', borderColor: 'divider', py: 6 }}>
                <Container maxWidth="lg">
                    <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', md: 'center' }} spacing={4}>
                        <Box>
                            <Typography variant="h4" color="primary" sx={{ fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.02em' }}>
                                Inventory Management
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1, opacity: 0.5 }}>
                                <PackageIcon size={14} />
                                <Typography variant="caption" sx={{ fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                                    {products.length} Products Active
                                </Typography>
                            </Box>
                        </Box>
                        <Stack direction="row" spacing={2}>
                            <Button
                                variant="contained"
                                startIcon={isAdding ? null : <PlusIcon size={18} />}
                                onClick={() => setIsAdding(!isAdding)}
                                sx={{ borderRadius: 0, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', px: 4 }}
                            >
                                {isAdding ? 'Cancel' : 'Add Product'}
                            </Button>
                            <Button
                                variant="outlined"
                                startIcon={<LogOutIcon size={18} />}
                                onClick={onLogout}
                                sx={{ borderRadius: 0, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', px: 4, borderWidth: 2, '&:hover': { borderWidth: 2 } }}
                            >
                                Logout
                            </Button>
                        </Stack>
                    </Stack>
                </Container>
            </Box>

            <Container maxWidth="lg" sx={{ py: 8 }}>
                {/* ADD PRODUCT FORM */}
                {isAdding && (
                    <Paper
                        elevation={0}
                        sx={{
                            p: 6,
                            border: '2px solid',
                            borderColor: 'primary.main',
                            borderRadius: 0,
                            mb: 8,
                            bgcolor: '#ffffff'
                        }}
                    >
                        <Typography variant="h6" color="primary" sx={{ fontWeight: 900, textTransform: 'uppercase', mb: 6, borderBottom: '1px solid', borderColor: 'divider', pb: 2 }}>
                            New Product Details
                        </Typography>
                        <Box component="form" onSubmit={handleAdd}>
                            <Grid container spacing={4}>
                                <Grid item xs={12} md={4}>
                                    <TextField
                                        fullWidth
                                        label="Product Name"
                                        variant="filled"
                                        required
                                        value={newProduct.name}
                                        onChange={e => setNewProduct({ ...newProduct, name: e.target.value })}
                                        InputProps={{ disableUnderline: true }}
                                        sx={{ bgcolor: 'rgba(223, 223, 223, 0.3)', '& .MuiFilledInput-root': { borderRadius: 0 } }}
                                    />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <TextField
                                        fullWidth
                                        select
                                        label="Category"
                                        variant="filled"
                                        value={newProduct.category}
                                        onChange={e => {
                                            let img = '/images/products/reactive.png';
                                            if (e.target.value === 'Acid Dyes') img = '/images/products/acid.png';
                                            if (e.target.value === 'Pigments') img = '/images/products/pigments.png';
                                            if (e.target.value === 'Auxiliaries') img = '/images/products/auxiliaries.png';
                                            setNewProduct({ ...newProduct, category: e.target.value, image: img });
                                        }}
                                        InputProps={{ disableUnderline: true }}
                                        sx={{ bgcolor: 'rgba(223, 223, 223, 0.3)', '& .MuiFilledInput-root': { borderRadius: 0 } }}
                                    >
                                        {categories.map(c => <MenuItem key={c} value={c}>{c}</MenuItem>)}
                                    </TextField>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <TextField
                                        fullWidth
                                        label="CAS Number"
                                        variant="filled"
                                        required
                                        value={newProduct.cas}
                                        onChange={e => setNewProduct({ ...newProduct, cas: e.target.value })}
                                        InputProps={{ disableUnderline: true }}
                                        sx={{ bgcolor: 'rgba(223, 223, 223, 0.3)', '& .MuiFilledInput-root': { borderRadius: 0 } }}
                                    />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <TextField
                                        fullWidth
                                        label="Application / Uses"
                                        variant="filled"
                                        required
                                        value={newProduct.app}
                                        onChange={e => setNewProduct({ ...newProduct, app: e.target.value })}
                                        InputProps={{ disableUnderline: true }}
                                        sx={{ bgcolor: 'rgba(223, 223, 223, 0.3)', '& .MuiFilledInput-root': { borderRadius: 0 } }}
                                    />
                                </Grid>
                                <Grid item xs={12} md={8}>
                                    <Stack direction="row" spacing={2} alignItems="stretch">
                                        <Box sx={{ flex: 1 }}>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                hidden
                                                id="product-image-upload"
                                                onChange={e => setSelectedFile(e.target.files[0])}
                                            />
                                            <Button
                                                component="label"
                                                htmlFor="product-image-upload"
                                                fullWidth
                                                variant="outlined"
                                                startIcon={<ImageIcon size={18} />}
                                                sx={{
                                                    height: '100%',
                                                    borderStyle: 'dashed',
                                                    borderWidth: 2,
                                                    borderRadius: 0,
                                                    color: 'text.secondary',
                                                    borderColor: 'divider',
                                                    '&:hover': { borderWidth: 2, borderColor: 'primary.main' }
                                                }}
                                            >
                                                {selectedFile ? selectedFile.name : 'Choose local image file...'}
                                            </Button>
                                        </Box>
                                        <Paper
                                            elevation={0}
                                            sx={{
                                                width: 56,
                                                height: 56,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                bgcolor: 'rgba(223, 223, 223, 0.3)',
                                                border: '1px solid',
                                                borderColor: 'divider',
                                                borderRadius: 0
                                            }}
                                        >
                                            {selectedFile ? <Typography variant="caption" sx={{ fontWeight: 900, color: 'primary.main' }}>OK</Typography> : <ImageIcon size={20} style={{ opacity: 0.2 }} />}
                                        </Paper>
                                    </Stack>
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                variant="contained"
                                disabled={loading}
                                startIcon={loading ? <CircularProgress size={18} color="inherit" /> : <PlusIcon size={18} />}
                                sx={{ mt: 6, px: 8, py: 2, borderRadius: 0, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em' }}
                            >
                                Publish to Catalog
                            </Button>
                        </Box>
                    </Paper>
                )}

                {/* INVENTORY TABLE */}
                <TableContainer component={Paper} elevation={0} sx={{ borderRadius: 0, border: '1px solid', borderColor: 'divider' }}>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ bgcolor: 'primary.main' }}>
                                <TableCell sx={{ color: '#ffffff', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Product</TableCell>
                                <TableCell sx={{ color: '#ffffff', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Category</TableCell>
                                <TableCell sx={{ color: '#ffffff', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em' }}>CAS No.</TableCell>
                                <TableCell align="right" sx={{ color: '#ffffff', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {products.map((product) => (
                                <TableRow key={product.id} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell>
                                        <Stack direction="row" spacing={3} alignItems="center">
                                            <Avatar
                                                src={product.image}
                                                variant="square"
                                                sx={{ width: 48, height: 48, bgcolor: 'rgba(223, 223, 223, 0.3)', border: '1px solid', borderColor: 'divider' }}
                                            />
                                            <Typography variant="subtitle2" sx={{ fontWeight: 800, textTransform: 'uppercase', color: 'primary.main' }}>
                                                {product.name}
                                            </Typography>
                                        </Stack>
                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            variant="caption"
                                            sx={{
                                                bgcolor: 'rgba(223, 223, 223, 0.5)',
                                                px: 1.5,
                                                py: 0.5,
                                                fontWeight: 900,
                                                textTransform: 'uppercase',
                                                letterSpacing: '0.05em',
                                                border: '1px solid',
                                                borderColor: 'divider'
                                            }}
                                        >
                                            {product.category}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="body2" sx={{ fontFamily: 'monospace', color: 'text.secondary', fontWeight: 500 }}>
                                            {product.cas}
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="right">
                                        <IconButton
                                            onClick={() => onDelete(product.id)}
                                            sx={{ color: 'error.light', '&:hover': { color: 'error.main', bgcolor: 'transparent' } }}
                                        >
                                            <TrashIcon size={20} />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </Box>
    );
};

export default AdminPanel;
