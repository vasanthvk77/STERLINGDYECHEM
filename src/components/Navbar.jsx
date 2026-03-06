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
} from '@mui/material';
import { Menu as MenuIcon, X as CloseIcon, ChevronDown } from 'lucide-react';

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
                anchor="top"
                open={mobileMenuOpen}
                onClose={() => setMobileMenuOpen(false)}
                PaperProps={{
                    sx: { height: '100%', p: 3, borderRadius: 0 }
                }}
            >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 6 }}>
                    <Typography variant="h6" sx={{ fontWeight: 900, color: 'primary.main' }}>
                        STERLING DYE CHEM
                    </Typography>
                    <IconButton onClick={() => setMobileMenuOpen(false)}>
                        <CloseIcon size={32} />
                    </IconButton>
                </Box>
                <List sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {navLinks.map((link) => (
                        <ListItem key={link.name} disablePadding divider>
                            <ListItemButton
                                onClick={() => {
                                    navigateTo(link.name);
                                    setMobileMenuOpen(false);
                                }}
                                sx={{ py: 2 }}
                            >
                                <ListItemText
                                    primary={link.name}
                                    primaryTypographyProps={{
                                        fontWeight: 900,
                                        fontSize: '24px',
                                        color: 'primary.main'
                                    }}
                                />
                                {link.hasDropdown && <ChevronDown size={20} style={{ opacity: 0.5 }} />}
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </AppBar>
    );
};

export default Navbar;
