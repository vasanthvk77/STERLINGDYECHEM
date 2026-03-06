import React, { useState } from 'react';
import {
    Box,
    Paper,
    Typography,
    TextField,
    Button,
    Stack,
    InputAdornment,
    Alert,
    Container
} from '@mui/material';
import { Lock, User, ArrowRight } from 'lucide-react';

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Note: Keeping original fetch for consistency with existing logic, 
            // though the app seems to be moving towards db.json
            const response = await fetch('http://localhost:5000/users');
            const users = await response.json();

            const user = users.find(u => u.username === username && u.password === password);

            if (user) {
                onLogin(user);
            } else {
                setError('Invalid credentials. Please try again.');
            }
        } catch (err) {
            setError('Could not connect to the auth server.');
        }
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                bgcolor: 'primary.main',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                p: 3
            }}
        >
            <Paper
                elevation={24}
                sx={{
                    width: '100%',
                    maxWidth: 400,
                    p: { xs: 4, md: 6 },
                    borderRadius: 0,
                    position: 'relative'
                }}
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: 8,
                        bgcolor: 'primary.main'
                    }}
                />

                <Box sx={{ mb: 6, textAlign: 'center' }}>
                    <Typography
                        variant="h4"
                        color="primary"
                        sx={{ fontWeight: 900, textTransform: 'uppercase', mb: 1, letterSpacing: '-0.02em' }}
                    >
                        Admin Login
                    </Typography>
                    <Typography
                        variant="caption"
                        sx={{ fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.2em', color: 'text.disabled' }}
                    >
                        Authorized Personnel Only
                    </Typography>
                </Box>

                <Box component="form" onSubmit={handleSubmit}>
                    <Stack spacing={4}>
                        <TextField
                            fullWidth
                            label="Username"
                            variant="outlined"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <User size={18} />
                                    </InputAdornment>
                                ),
                            }}
                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 0 } }}
                        />

                        <TextField
                            fullWidth
                            label="Password"
                            type="password"
                            variant="outlined"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Lock size={18} />
                                    </InputAdornment>
                                ),
                            }}
                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 0 } }}
                        />

                        {error && (
                            <Alert severity="error" sx={{ borderRadius: 0, fontWeight: 700, textTransform: 'uppercase', fontSize: '10px' }}>
                                {error}
                            </Alert>
                        )}

                        <Button
                            fullWidth
                            type="submit"
                            variant="contained"
                            size="large"
                            endIcon={<ArrowRight size={18} />}
                            sx={{
                                py: 2,
                                fontWeight: 900,
                                textTransform: 'uppercase',
                                letterSpacing: '0.2em',
                                borderRadius: 0
                            }}
                        >
                            Sign In
                        </Button>
                    </Stack>
                </Box>

                <Box sx={{ mt: 4, textAlign: 'center' }}>
                    <Button
                        onClick={() => window.history.back()}
                        sx={{
                            color: 'text.disabled',
                            fontSize: '10px',
                            fontWeight: 800,
                            textTransform: 'uppercase',
                            letterSpacing: '0.1em',
                            '&:hover': { color: 'primary.main', bgcolor: 'transparent' }
                        }}
                    >
                        Back to Website
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
};

export default Login;
