import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#000158',
            contrastText: '#ffffff',
        },
        secondary: {
            main: '#dfdfdfe6',
            contrastText: '#000158',
        },
        background: {
            default: '#ffffff',
            paper: '#ffffff',
        },
        text: {
            primary: '#000158',
            secondary: 'rgba(0, 1, 88, 0.7)',
        },
    },
    typography: {
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        h1: {
            fontWeight: 900,
            letterSpacing: '-0.02em',
            textTransform: 'uppercase',
        },
        h2: {
            fontWeight: 900,
            letterSpacing: '-0.02em',
            textTransform: 'uppercase',
        },
        h3: {
            fontWeight: 900,
            letterSpacing: '-0.01em',
            textTransform: 'uppercase',
        },
        button: {
            fontWeight: 900,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 0,
                    padding: '12px 24px',
                },
            },
        },
    },
});

export default theme;
