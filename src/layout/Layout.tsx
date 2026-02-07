import React from 'react';
import { AppBar, Box, Toolbar, Typography, Button, Container, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link as RouterLink, useLocation } from 'react-router-dom';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const location = useLocation();

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <AppBar position="static" color="transparent" elevation={0} sx={{ backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                <Container maxWidth="lg">
                    <Toolbar disableGutters>
                        {/* Logo / Brand */}
                        <Typography
                            variant="h6"
                            noWrap
                            component={RouterLink}
                            to="/"
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'Outfit',
                                fontWeight: 700,
                                letterSpacing: '.1rem',
                                color: 'inherit',
                                textDecoration: 'none',
                                background: 'linear-gradient(45deg, #6C63FF, #00D4FF)',
                                backgroundClip: 'text',
                                textFillColor: 'transparent',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                            }}
                        >
                            Lumina Learners
                        </Typography>

                        {/* Mobile Menu Icon */}
                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="device menu"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                        </Box>

                        {/* Mobile Logo */}
                        <Typography
                            variant="h5"
                            noWrap
                            component={RouterLink}
                            to="/"
                            sx={{
                                mr: 2,
                                display: { xs: 'flex', md: 'none' },
                                flexGrow: 1,
                                fontFamily: 'Outfit',
                                fontWeight: 700,
                                letterSpacing: '.1rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            LUMINA
                        </Typography>

                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end', gap: 2 }}>
                            <Button
                                component={RouterLink}
                                to="/"
                                color={location.pathname === '/' ? 'primary' : 'inherit'}
                                sx={{ my: 2, display: 'block' }}
                            >
                                Home
                            </Button>
                            <Button
                                component={RouterLink}
                                to="/students"
                                color={location.pathname.startsWith('/students') ? 'primary' : 'inherit'}
                                sx={{ my: 2, display: 'block' }}
                            >
                                Students
                            </Button>
                            <Button
                                component={RouterLink}
                                to="/students/add"
                                variant="contained"
                                color="primary"
                                sx={{ my: 2, display: 'block' }}
                            >
                                Enroll Student
                            </Button>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>

            <Container component="main" maxWidth="lg" sx={{ mt: 4, mb: 4, flexGrow: 1 }}>
                {children}
            </Container>

            {/* Footer */}
            <Box component="footer" sx={{ py: 3, px: 2, mt: 'auto', backgroundColor: 'rgba(255,255,255,0.02)' }}>
                <Container maxWidth="lg">
                    <Typography variant="body2" color="text.secondary" align="center">
                        {'Designed for Performance & Extensibility'}
                    </Typography>
                </Container>
            </Box>
        </Box>
    );
};

export default Layout;
