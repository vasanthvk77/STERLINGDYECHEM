import React, { useState } from 'react';
import {
    Box,
    Container,
    Grid,
    Typography,
    TextField,
    Button,
    Stack,
    MenuItem,
    Paper,
    Alert,
    CircularProgress,
    Snackbar,
    Autocomplete,
    Checkbox,
    Chip,
    FormControlLabel
} from '@mui/material';
import { Mail, Phone, ArrowRight, CheckCircle2, X, MessageCircle } from 'lucide-react';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import emailjs from '@emailjs/browser';
import db from '../data/db.json';

const Contact = () => {
    // --- EMAIL CONFIGURATION ---
    // Change SEND_METHOD to 1 for EmailJS (Direct Frontend)
    // Change SEND_METHOD to 2 for Gmail SMTP (Serverless Vercel Function)
    const SEND_METHOD = 2;

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        whatsapp: '',
        products: ['Silicone Inks'],
        message: ''
    });

    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState('idle'); // idle, loading, success, error
    const [showSnackbar, setShowSnackbar] = useState(false);
    const [syncWhatsApp, setSyncWhatsApp] = useState(false);

    const productOptions = [
        "Silicone Inks",
        "Oilbase Non PVC",
        "Specialitys",
        "Waterbase Pigments",
        "Eco friendly water based textile inks"
    ];

    const validateForm = () => {
        const newErrors = {};
        if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }
        if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
        if (formData.products.length === 0) newErrors.products = 'Select at least one product';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => {
            const next = { ...prev, [name]: value };
            if (name === 'phone' && syncWhatsApp) {
                next.whatsapp = value;
            }
            return next;
        });
        // Clear error when user types
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: null }));
        }
    };

    const handleSyncToggle = (e) => {
        const checked = e.target.checked;
        setSyncWhatsApp(checked);
        if (checked) {
            setFormData(prev => ({ ...prev, whatsapp: prev.phone }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setStatus('loading');

        const fullName = `${formData.firstName} ${formData.lastName}`.trim();
        const requirement = formData.products.join(', ');

        const templateParams = {
            name: fullName,
            requirement: requirement,
            email: formData.email,
            phone: formData.phone,
            whatsapp: formData.whatsapp || 'Not provided',
            command: formData.message || 'There is no additional message given by customer'
        };

        try {
            if (SEND_METHOD === 1) {
                // METHOD 1: EMAILJS (Frontend)
                const { service_id, public_key, ack_template_id, admin_template_id } = db.emailjs_details;

                // 1. Send Admin Notification First
                await emailjs.send(service_id, admin_template_id, templateParams, public_key);

                // 2. Send Customer Acknowledgment Second
                await emailjs.send(
                    service_id,
                    ack_template_id,
                    {
                        name: fullName,
                        requirement: requirement,
                        email: formData.email
                    },
                    public_key
                );
            } else {
                // METHOD 2: RESEND (Serverless API)
                const response = await fetch('/api/sendEmail', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(templateParams)
                });

                if (!response.ok) throw new Error('API Error');
            }

            setStatus('success');
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                whatsapp: '',
                products: ['Silicone Inks'],
                message: ''
            });
            setShowSnackbar(true);
        } catch (error) {
            console.error('Email Sending Error:', error);
            setStatus('error');
        }
    };

    return (
        <>
            <Box
                id="contact-section"
                component="section"
                sx={{
                    height: { xs: "auto", md: "auto", lg: "100vh" },

                    pt: { xs: 15, lg: 22 }, // Pushes content below navbar height (100px + 20px gap)
                    pb: { xs: 8, lg: 12 },
                    bgcolor: 'primary.main',
                    color: '#ffffff',
                    position: 'relative',
                    overflow: 'hidden',
                    minHeight: '100vh',
                    display: 'flex',
                    alignItems: 'center'
                }}
            >
                {/* BACKGROUND IMAGE WITH OVERLAY */}
                <Box sx={{ position: 'absolute', inset: 0, zIndex: 0 }}>
                    <Box
                        component="img"
                        src={`${import.meta.env.BASE_URL}images/contact_bg_vibrant.png`}
                        alt="Vibrant Color Background"
                        sx={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }}
                    />
                    <Box
                        sx={{
                            position: 'absolute',
                            inset: 0,
                            // background: 'linear-gradient(to right, #000158, rgba(0, 1, 88, 0.7), transparent)',
                            zIndex: 1
                        }}
                    />
                </Box>

                {/* GRID PATTERN OVERLAY */}
                <Box
                    sx={{
                        position: 'absolute',
                        inset: 0,
                        opacity: 0.05,
                        pointerEvents: 'none',
                        zIndex: 0,
                        backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
                        backgroundSize: '40px 40px',
                    }}
                />

                <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 10 }}>
                    <Grid container spacing={{ xs: 4, lg: 6 }} alignItems="center">
                        <Grid item xs={12} lg={6}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
                                <Box sx={{ width: 48, height: '2px', bgcolor: '#ffffff' }} />
                                <Typography
                                    variant="caption"
                                    sx={{
                                        fontWeight: 900,
                                        letterSpacing: '0.3em',
                                        textTransform: 'uppercase',
                                        color: '#ffffff'
                                    }}
                                >
                                    Connect With Us
                                </Typography>
                            </Box>
                            <Typography
                                variant="h2"
                                sx={{ color: '#ffffff', mb: 4, lineHeight: 1.1, fontSize: { xs: '2rem', md: '2.5rem' } }}
                            >
                                Ask for Requirements
                            </Typography>
                            <Typography
                                variant="body1"
                                sx={{
                                    fontSize: '1.125rem',
                                    fontWeight: 300,
                                    lineHeight: 1.6,
                                    color: 'rgba(255, 255, 255, 0.8)',
                                    maxWidth: '500px',
                                    mb: 6,
                                    textAlign: 'justify',
                                }}
                            >
                                Our technical engineering team is ready to assist you with safety data sheets (SDS), technical specifications, and custom formulation requests.
                            </Typography>

                            <Stack spacing={4}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                                    <Box
                                        sx={{
                                            width: 48,
                                            height: 48,
                                            border: '1px solid rgba(255, 255, 255, 0.3)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}
                                    >
                                        <Mail size={20} color="#ffffff" />
                                    </Box>
                                    <Box>
                                        <Typography
                                            variant="caption"
                                            sx={{
                                                fontWeight: 700,
                                                textTransform: 'uppercase',
                                                letterSpacing: '0.1em',
                                                opacity: 0.6,
                                                display: 'block'
                                            }}
                                        >
                                            General Inquiries
                                        </Typography>
                                        <Typography variant="h6" sx={{ fontWeight: 700 }}>
                                            sales@sterlingdyechem.com
                                        </Typography>
                                    </Box>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                                    <Box
                                        sx={{
                                            width: 48,
                                            height: 48,
                                            border: '1px solid rgba(255, 255, 255, 0.3)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}
                                    >
                                        <Phone size={20} color="#ffffff" />
                                    </Box>
                                    <Box>
                                        <Typography
                                            variant="caption"
                                            sx={{
                                                fontWeight: 700,
                                                textTransform: 'uppercase',
                                                letterSpacing: '0.1em',
                                                opacity: 0.6,
                                                display: 'block'
                                            }}
                                        >
                                            Direct Support
                                        </Typography>
                                        <Typography variant="h6" sx={{ fontWeight: 700 }}>
                                            +91 8749432456
                                        </Typography>
                                    </Box>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                                    <Box
                                        sx={{
                                            width: 48,
                                            height: 48,
                                            border: '1px solid rgba(255, 255, 255, 0.3)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}
                                    >
                                        <MessageCircle size={20} color="#ffffff" />
                                    </Box>
                                    <Box>
                                        <Typography
                                            variant="caption"
                                            sx={{
                                                fontWeight: 700,
                                                textTransform: 'uppercase',
                                                letterSpacing: '0.1em',
                                                opacity: 0.6,
                                                display: 'block'
                                            }}
                                        >
                                            Connect via WhatsApp
                                        </Typography>
                                        <Typography variant="h6" sx={{ fontWeight: 700 }}>
                                            +91 93240 12345
                                        </Typography>
                                    </Box>
                                </Box>
                            </Stack>
                        </Grid>

                        <Grid item xs={12} lg={6}>
                            <Paper
                                elevation={0}
                                sx={{
                                    p: { xs: 4, lg: 6 },
                                    borderRadius: '0px',
                                    bgcolor: 'rgba(223, 223, 223, 0.85)',
                                    backdropFilter: 'blur(10px)',
                                    color: 'primary.main',
                                    border: '1px solid rgba(255, 255, 255, 0.2)',
                                    boxShadow: '0 25px 50px -12px rgba(0, 1, 88, 0.2)'
                                }}
                            >
                                <Typography variant="h5" sx={{ fontWeight: 900, mb: 4, textTransform: 'uppercase', letterSpacing: '-0.02em' }}>
                                    Business Inquiry
                                </Typography>

                                {status === 'error' && (
                                    <Alert severity="error" sx={{ mb: 3, borderRadius: 0 }}>
                                        Failed to send your request. Please try again later.
                                    </Alert>
                                )}

                                <form onSubmit={handleSubmit}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={6}>
                                            <TextField
                                                fullWidth
                                                label="First Name"
                                                name="firstName"
                                                value={formData.firstName}
                                                onChange={handleChange}
                                                error={!!errors.firstName}
                                                helperText={errors.firstName}
                                                variant="filled"
                                                size="small"
                                                InputProps={{
                                                    disableUnderline: true,
                                                    sx: { borderRadius: 0, color: 'white' }
                                                }}
                                                sx={{
                                                    bgcolor: '#b9bd62ff',
                                                    '& .MuiInputLabel-root': { color: 'white' },
                                                    '& .MuiInputLabel-root.Mui-focused': { color: 'white' },
                                                    '& .MuiFilledInput-root:hover': { bgcolor: '#9ba035ff' },
                                                    '& .MuiFilledInput-root.Mui-focused': { bgcolor: '#9ba035ff' }
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                fullWidth
                                                label="Last Name"
                                                name="lastName"
                                                value={formData.lastName}
                                                onChange={handleChange}
                                                variant="filled"
                                                size="small"
                                                InputProps={{
                                                    disableUnderline: true,
                                                    sx: { borderRadius: 0, color: 'white' }
                                                }}
                                                sx={{
                                                    bgcolor: '#b9bd62ff',
                                                    '& .MuiInputLabel-root': { color: 'white' },
                                                    '& .MuiInputLabel-root.Mui-focused': { color: 'white' },
                                                    '& .MuiFilledInput-root:hover': { bgcolor: '#9ba035ff' },
                                                    '& .MuiFilledInput-root.Mui-focused': { bgcolor: '#9ba035ff' }
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                fullWidth
                                                label="Phone Number"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                error={!!errors.phone}
                                                helperText={errors.phone}
                                                variant="filled"
                                                size="small"
                                                InputProps={{
                                                    disableUnderline: true,
                                                    sx: { borderRadius: 0, color: 'white' }
                                                }}
                                                sx={{
                                                    bgcolor: '#b9bd62ff',
                                                    '& .MuiInputLabel-root': { color: 'white' },
                                                    '& .MuiInputLabel-root.Mui-focused': { color: 'white' },
                                                    '& .MuiFilledInput-root:hover': { bgcolor: '#9ba035ff' },
                                                    '& .MuiFilledInput-root.Mui-focused': { bgcolor: '#9ba035ff' }
                                                }}
                                            />
                                            {formData.phone && (
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            checked={syncWhatsApp}
                                                            onChange={handleSyncToggle}
                                                            size="small"
                                                            sx={{
                                                                color: 'primary.main',
                                                                '&.Mui-checked': { color: 'primary.main' }
                                                            }}
                                                        />
                                                    }
                                                    label={
                                                        <Typography sx={{ fontSize: '0.75rem', fontWeight: 600, color: 'primary.main', opacity: 0.8 }}>
                                                            Use same for WhatsApp?
                                                        </Typography>
                                                    }
                                                    sx={{ mt: 0.5, ml: 0 }}
                                                />
                                            )}
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                fullWidth
                                                label="WhatsApp (Optional)"
                                                name="whatsapp"
                                                value={formData.whatsapp}
                                                onChange={handleChange}
                                                disabled={syncWhatsApp}
                                                variant="filled"
                                                size="small"
                                                InputProps={{
                                                    disableUnderline: true,
                                                    sx: { borderRadius: 0, color: 'white' }
                                                }}
                                                sx={{
                                                    bgcolor: '#b9bd62ff',
                                                    opacity: syncWhatsApp ? 0.7 : 1,
                                                    '& .MuiInputLabel-root': { color: 'white' },
                                                    '& .MuiInputLabel-root.Mui-focused': { color: 'white' },
                                                    '& .MuiFilledInput-root:hover': { bgcolor: '#9ba035ff' },
                                                    '& .MuiFilledInput-root.Mui-focused': { bgcolor: '#9ba035ff' },
                                                    '& .Mui-disabled': { WebkitTextFillColor: 'rgba(255, 255, 255, 0.5)' }
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                label="Corporate Email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                error={!!errors.email}
                                                helperText={errors.email}
                                                variant="filled"
                                                size="small"
                                                InputProps={{
                                                    disableUnderline: true,
                                                    sx: { borderRadius: 0, color: 'white' }
                                                }}
                                                sx={{
                                                    bgcolor: '#b9bd62ff',
                                                    '& .MuiInputLabel-root': { color: 'white' },
                                                    '& .MuiInputLabel-root.Mui-focused': { color: 'white' },
                                                    '& .MuiFilledInput-root:hover': { bgcolor: '#9ba035ff' },
                                                    '& .MuiFilledInput-root.Mui-focused': { bgcolor: '#9ba035ff' }
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Autocomplete
                                                multiple
                                                id="product-interest"
                                                options={productOptions}
                                                disableCloseOnSelect
                                                value={formData.products}
                                                onChange={(event, newValue) => {
                                                    setFormData(prev => ({ ...prev, products: newValue }));
                                                    if (errors.products) setErrors(prev => ({ ...prev, products: null }));
                                                }}
                                                getOptionLabel={(option) => option}
                                                renderOption={(props, option, { selected }) => (
                                                    <li {...props} style={{ padding: '4px 12px' }}>
                                                        <Checkbox
                                                            icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                                                            checkedIcon={<CheckBoxIcon fontSize="small" />}
                                                            style={{ marginRight: 8 }}
                                                            checked={selected}
                                                            sx={{ color: '#000158' }}
                                                        />
                                                        <Typography sx={{ fontSize: '13px', fontWeight: 600 }}>
                                                            {option}
                                                        </Typography>
                                                    </li>
                                                )}
                                                renderTags={(value, getTagProps) =>
                                                    value.map((option, index) => {
                                                        const { key, ...tagProps } = getTagProps({ index });
                                                        return (
                                                            <Chip
                                                                key={key}
                                                                variant="filled"
                                                                label={option}
                                                                {...tagProps}
                                                                deleteIcon={<X size={14} color="#fff" />}
                                                                sx={{
                                                                    bgcolor: '#ffffffff',
                                                                    color: '#000158',
                                                                    borderRadius: '20px',
                                                                    height: '28px',
                                                                    fontSize: '11px',
                                                                    fontWeight: 700,
                                                                    '& .MuiChip-label': { px: 2 },
                                                                    '& .MuiChip-deleteIcon': {
                                                                        color: '#fff !important',
                                                                        opacity: 0.8,
                                                                    }
                                                                }}
                                                            />
                                                        );
                                                    })
                                                }
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        variant="filled"
                                                        label="Product Interest"
                                                        placeholder={formData.products.length === 0 ? "Select products..." : ""}
                                                        size="small"
                                                        error={!!errors.products}
                                                        helperText={errors.products}
                                                        InputProps={{
                                                            ...params.InputProps,
                                                            disableUnderline: true,
                                                            sx: {
                                                                borderRadius: 0,
                                                                bgcolor: '#b9bd62ff',
                                                                color: 'white',
                                                                pt: '24px !important',
                                                                pb: '8px !important',
                                                                px: '12px !important'
                                                            }
                                                        }}
                                                        sx={{
                                                            '& .MuiInputLabel-root': { color: 'white' },
                                                            '& .MuiInputLabel-root.Mui-focused': { color: 'main.primary' },
                                                            '& .MuiAutocomplete-endAdornment .MuiIconButton-root': { color: 'main.primary' }
                                                        }}
                                                    />
                                                )}
                                                slotProps={{
                                                    popper: {
                                                        placement: 'bottom-start',
                                                        modifiers: [{ name: 'flip', enabled: false }]
                                                    },
                                                    paper: {
                                                        elevation: 12,
                                                        sx: {
                                                            mt: 1,
                                                            borderRadius: '8px',
                                                            border: '1px solid rgba(0, 1, 88, 0.1)',
                                                            '& .MuiAutocomplete-listbox': { p: 1 }
                                                        }
                                                    }
                                                }}
                                                sx={{
                                                    '& .MuiAutocomplete-inputRoot': {
                                                        bgcolor: '#b9bd62ff',
                                                        borderRadius: 0,
                                                        pt: '24px !important',
                                                        pb: '8px !important',
                                                        px: '12px !important',
                                                        display: 'flex',
                                                        flexWrap: 'wrap',
                                                        gap: '8px'
                                                    },
                                                    '& .MuiAutocomplete-endAdornment': {
                                                        top: '50%',
                                                        transform: 'translateY(-50%)',
                                                        right: '8px',
                                                        '& .MuiIconButton-root': {
                                                            padding: '4px',
                                                            color: '#000158'
                                                        }
                                                    }
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                multiline
                                                rows={3}
                                                label="Message / Requirements"
                                                name="message"
                                                value={formData.message}
                                                onChange={handleChange}
                                                variant="filled"
                                                size="small"
                                                InputProps={{
                                                    disableUnderline: true,
                                                    sx: { borderRadius: 0, color: 'white' }
                                                }}
                                                sx={{
                                                    bgcolor: '#b9bd62ff',
                                                    '& .MuiInputLabel-root': { color: 'white' },
                                                    '& .MuiInputLabel-root.Mui-focused': { color: 'white' },
                                                    '& .MuiFilledInput-root:hover': { bgcolor: '#9ba035ff' },
                                                    '& .MuiFilledInput-root.Mui-focused': { bgcolor: '#9ba035ff' }
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Button
                                                fullWidth
                                                type="submit"
                                                variant="contained"
                                                size="large"
                                                disabled={status === 'loading'}
                                                sx={{
                                                    py: 2,
                                                    mt: 1,
                                                    bgcolor: status === 'success' ? 'success.main' : '#b9bd62ff',
                                                    '& .MuiFilledInput-root:hover': { bgcolor: '#28911cff' },
                                                    '& .MuiFilledInput-root.Mui-focused': { bgcolor: '#28911cff' },
                                                    '& .MuiButton-root:hover': { bgcolor: '#28911cff' },

                                                }}
                                                endIcon={status === 'loading' ? <CircularProgress size={20} color="inherit" /> : <ArrowRight size={14} />}
                                            >
                                                {status === 'success' ? 'Request Sent' : 'Submit'}
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </form>
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>

                {/* Success Feedback */}
                <Snackbar
                    open={showSnackbar}
                    autoHideDuration={6000}
                    onClose={() => setShowSnackbar(false)}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                >
                    <Alert
                        onClose={() => setShowSnackbar(false)}
                        severity="success"
                        icon={<CheckCircle2 size={20} />}
                        sx={{ width: '100%', borderRadius: 0, bgcolor: 'success.main', color: '#fff' }}
                    >
                        Thank you! Your inquiry has been sent. Check your email for confirmation.
                    </Alert>
                </Snackbar>
            </Box>

            {/* Google Map Embed (Full Width, below the Contact block) */}
            <Box sx={{ width: '100%', height: 450, display: 'block' }}>
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5675.503814995908!2d77.31921810079999!3d11.089354854211928!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba90753a25e39af%3A0xac2e355abbb6a30e!2sSTERLING%20DYE%20CHEM%20SHOP!5e0!3m2!1sen!2sin!4v1772892968105!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0, display: 'block' }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                />
            </Box>
        </>
    );
};

export default Contact;
