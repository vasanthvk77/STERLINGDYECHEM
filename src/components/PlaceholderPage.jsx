import React from 'react';
import { Box, Typography, Paper, Container } from '@mui/material';

const PlaceholderPage = ({ title }) => (
    <Box
        sx={{
            pt: 24,
            pb: 12,
            minHeight: '70vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: 'rgba(223, 223, 223, 0.2)'
        }}
    >
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
            <Typography
                variant="h2"
                color="primary"
                sx={{ fontWeight: 900, textTransform: 'uppercase', mb: 4, letterSpacing: '-0.02em' }}
            >
                {title}
            </Typography>
            <Box sx={{ width: 64, height: 4, bgcolor: 'primary.main', mx: 'auto', mb: 6 }} />
            <Paper
                elevation={0}
                sx={{
                    p: { xs: 6, md: 10 },
                    border: '2px dashed',
                    borderColor: 'rgba(0, 1, 88, 0.2)',
                    bgcolor: '#ffffff',
                    borderRadius: 2
                }}
            >
                <Typography variant="h6" sx={{ color: 'text.secondary', fontWeight: 500 }}>
                    Content for the <Box component="span" sx={{ fontWeight: 900, color: 'primary.main' }}>{title}</Box> page will be added here later.
                </Typography>
            </Paper>
        </Container>
    </Box>
);

export default PlaceholderPage;
