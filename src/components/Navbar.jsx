import React, { useState } from 'react';
import {
    AppBar,
    Toolbar,
    Box,
    Button,
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemText,
    ListItemButton,
    Menu as MuiMenu,
    MenuItem,
    Typography,
    Container,
    useScrollTrigger,
    Collapse
} from '@mui/material';
import { Menu as MenuIcon, X as CloseIcon, ChevronDown, ChevronUp } from 'lucide-react';

const Navbar = ({ isScrolled, currentPage, navLinks, navigateTo, mobileMenuOpen, setMobileMenuOpen }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [activeDropdown, setActiveDropdown] = useState(null);

    const handleOpenDropdown = (event, linkName) => {
        setAnchorEl(event.currentTarget);
        setActiveDropdown(linkName);
    };

    const handleCloseDropdown = () => {
        setAnchorEl(null);
        setActiveDropdown(null);
    };

    const textColor = '#ffffff';

    return (
        <AppBar
            position="fixed"
            elevation={0}
            sx={{
                justifyContent: 'center',
                top: { xs: 0, lg: 20 },
                left: { xs: 0, lg: '50%' },
                right: { xs: 0, lg: 'auto' },
                transform: { xs: 'none', lg: 'translateX(-50%)' },
                width: { xs: '100%', lg: 'calc(100% - 80px)' },
                maxWidth: 'lg',
                height: '80px',
                bgcolor: 'rgba(223, 223, 223, 0.85)',
                backdropFilter: 'blur(10px)',
                borderRadius: 0,
                border: '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 10px 40px rgba(0, 1, 88, 0.2)',
                transition: 'all 0.4s ease',
                zIndex: 1100,
            }}
        >
            <Container maxWidth={false}>
                <Toolbar disableGutters sx={{ justifyContent: 'space-between', minHeight: '100px', px: 2 }}>
                    {/* LOGO */}
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            cursor: 'pointer',
                        }}
                        onClick={() => navigateTo('HOME')}
                    >
                        <img
                            src="/images/logo.png"
                            alt="Sterling Dye Chem"
                            style={{ height: '48px', width: 'auto' }}
                        />
                    </Box>

                    {/* DESKTOP MENU */}
                    <Box sx={{ display: { xs: 'none', lg: 'flex' }, alignItems: 'center', gap: 1 }}>
                        {navLinks.map((link) => (
                            <React.Fragment key={link.name}>
                                <Button
                                    onClick={() => link.hasDropdown ? null : navigateTo(link.name)}
                                    onMouseEnter={(e) => link.hasDropdown && handleOpenDropdown(e, link.name)}
                                    sx={{
                                        color: currentPage === link.name ? 'rgba(255, 255, 255, 0.95)' : 'rgba(0, 1, 88, 0.95)',
                                        bgcolor: currentPage === link.name ? 'rgba(0, 1, 88, 0.95)' : 'transparent',
                                        fontWeight: 800,
                                        fontSize: '12px',
                                        letterSpacing: '0.06em',
                                        px: 3,
                                        py: 1,
                                        borderRadius: 0,
                                        position: 'relative',
                                        '&:hover': {
                                            bgcolor: 'rgba(0, 1, 88, 0.95)',
                                            color: 'rgba(255, 255, 255, 0.95)',
                                        }
                                    }}
                                    endIcon={link.hasDropdown && <ChevronDown size={14} strokeWidth={3} />}
                                >
                                    {link.name}
                                </Button>

                                {link.hasDropdown && activeDropdown === link.name && (
                                    <MuiMenu
                                        anchorEl={anchorEl}
                                        open={Boolean(anchorEl)}
                                        onClose={handleCloseDropdown}
                                        MenuListProps={{ onMouseLeave: handleCloseDropdown }}
                                        PaperProps={{
                                            elevation: 20,
                                            sx: {
                                                minWidth: 260,
                                                borderRadius: 0,
                                                mt: 2,
                                                bgcolor: 'rgba(0, 1, 88, 0.95)',
                                                backdropFilter: 'blur(20px)',
                                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
                                            }
                                        }}
                                    >
                                        {link.subItems.map((item) => (
                                            <MenuItem
                                                key={item}
                                                onClick={() => {
                                                    navigateTo('PRODUCT');
                                                    window.dispatchEvent(new CustomEvent('setCategory', { detail: item }));
                                                    window.dispatchEvent(new CustomEvent('setSubtype', { detail: null }));
                                                    handleCloseDropdown();
                                                }}
                                                sx={{
                                                    fontSize: '11px',
                                                    fontWeight: 800,
                                                    py: 2,
                                                    px: 3,
                                                    textTransform: 'uppercase',
                                                    letterSpacing: '0.08em',
                                                    color: '#ffffff',
                                                    '&:hover': {
                                                        bgcolor: '#ffffff',
                                                        color: '#000158'
                                                    }
                                                }}
                                            >
                                                {item}
                                            </MenuItem>
                                        ))}
                                    </MuiMenu>
                                )}
                            </React.Fragment>
                        ))}
                    </Box>

                    {/* ACTIONS */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Button
                            variant="contained"
                            onClick={() => navigateTo('CONTACT US')}
                            sx={{
                                display: { xs: 'none', sm: 'flex' },
                                bgcolor: currentPage === 'CONTACT US' ? '#000158' : '#ffffff',
                                color: currentPage === 'CONTACT US' ? '#ffffff' : '#000158',
                                borderRadius: 0,
                                px: 4,
                                py: 1.2,
                                fontWeight: 900,
                                fontSize: '11px',
                                letterSpacing: '0.12em',
                                border: !isScrolled && currentPage === 'HOME' ? '1px solid #ffffff' : '1px solid #000158',
                                '&:hover': {
                                    bgcolor: currentPage === 'CONTACT US' ? '#0000a0' : (isScrolled || currentPage !== 'HOME' ? 'rgba(0, 1, 88, 0.05)' : 'rgba(255, 255, 255, 0.1)'),
                                    color: currentPage === 'CONTACT US' ? '#ffffff' : (isScrolled || currentPage !== 'HOME' ? '#000158' : '#ffffff'),
                                    transform: 'translateY(-1px)',
                                    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.2)'
                                }
                            }}
                        >
                            CONTACT US
                        </Button>
                        <IconButton
                            onClick={() => setMobileMenuOpen(true)}
                            sx={{
                                display: { xs: 'flex', lg: 'none' },
                                color: isScrolled || currentPage !== 'HOME' ? '#000158' : '#ffffff',
                                p: 1
                            }}
                        >
                            <MenuIcon size={28} strokeWidth={2.5} />
                        </IconButton>
                    </Box>
                </Toolbar>
            </Container>

            {/* MOBILE MENU */}
            <Drawer
                anchor="right"
                open={mobileMenuOpen}
                onClose={() => setMobileMenuOpen(false)}
                PaperProps={{
                    sx: {
                        width: { xs: '75%', sm: '350px' },
                        bgcolor: '#000158', // Deep blue premium look
                        color: 'white',
                    }
                }}
            >
                <Box sx={{ p: { xs: 3, sm: 4 }, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                    <img src="/images/logo.png" alt="SDC" style={{ height: '40px', filter: 'brightness(0) invert(1)' }} />
                    <IconButton onClick={() => setMobileMenuOpen(false)} sx={{ color: 'white' }}>
                        <CloseIcon size={32} />
                    </IconButton>
                </Box>
                <Box sx={{ p: { xs: 2.5, sm: 4 }, overflowY: 'auto', height: '100%' }}>
                    <List sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                        {navLinks.map((link) => (
                            <React.Fragment key={link.name}>
                                <ListItem disablePadding>
                                    <ListItemButton
                                        onClick={() => {
                                            if (link.hasDropdown) {
                                                setActiveDropdown(activeDropdown === link.name ? null : link.name);
                                            } else {
                                                navigateTo(link.name);
                                                setMobileMenuOpen(false);
                                                setActiveDropdown(null);
                                            }
                                        }}
                                        sx={{
                                            py: 1.5,
                                            px: 2,
                                            borderRadius: '8px',
                                            bgcolor: currentPage === link.name ? 'rgba(255,255,255,0.05)' : 'transparent',
                                            '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' }
                                        }}
                                    >
                                        <ListItemText
                                            primary={link.name}
                                            primaryTypographyProps={{
                                                fontWeight: 700,
                                                fontSize: '15px',
                                                color: currentPage === link.name ? '#00d2ff' : 'white',
                                                letterSpacing: '0.05em'
                                            }}
                                        />
                                        {link.hasDropdown && (
                                            activeDropdown === link.name ?
                                                <ChevronUp size={20} style={{ color: 'rgba(255,255,255,0.7)' }} /> :
                                                <ChevronDown size={20} style={{ color: 'rgba(255,255,255,0.7)' }} />
                                        )}
                                    </ListItemButton>
                                </ListItem>
                                {link.hasDropdown && (
                                    <Collapse in={activeDropdown === link.name} timeout="auto" unmountOnExit>
                                        <List component="div" disablePadding sx={{ pl: 4, mb: 2 }}>
                                            {link.subItems.map((subItem) => (
                                                <ListItemButton
                                                    key={subItem}
                                                    onClick={() => {
                                                        navigateTo('PRODUCT');
                                                        window.dispatchEvent(new CustomEvent('setCategory', { detail: subItem }));
                                                        setMobileMenuOpen(false);
                                                        setActiveDropdown(null);
                                                    }}
                                                    sx={{
                                                        py: 1.5,
                                                        px: 2,
                                                        borderRadius: '6px',
                                                        '&:hover': { bgcolor: 'rgba(255,255,255,0.05)' }
                                                    }}
                                                >
                                                    <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: '#00d2ff', mr: 2 }} />
                                                    <ListItemText
                                                        primary={subItem}
                                                        primaryTypographyProps={{
                                                            color: 'rgba(255,255,255,0.8)',
                                                            fontSize: '13px',
                                                            fontWeight: 500
                                                        }}
                                                    />
                                                </ListItemButton>
                                            ))}
                                        </List>
                                    </Collapse>
                                )}
                            </React.Fragment>
                        ))}
                    </List>

                    <Box sx={{ mt: 6, pt: 4, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)', mb: 1, fontWeight: 600, letterSpacing: '0.1em', fontSize: '11px' }}>GET IN TOUCH</Typography>
                        <Typography variant="body1" sx={{ color: 'white', fontWeight: 700, fontSize: '15px' }}>info@sterlingdyechem.com</Typography>
                    </Box>
                </Box>
            </Drawer>
        </AppBar>
    );
};

export default Navbar;
