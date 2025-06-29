import { useContext } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container, Box } from '@mui/material';
import { AuthContext } from '../context/AuthContext';

function Layout() {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        E-Commerce App
                    </Typography>
                    {user && (
                        <Button color="inherit" onClick={handleLogout}>
                            Logout
                        </Button>
                    )}
                </Toolbar>
            </AppBar>
            <Container component="main" sx={{ mt: 3, mb: 3, flexGrow: 1 }}>
                <Outlet />
            </Container>
            <Box component="footer" sx={{ py: 3, backgroundColor: 'grey.100', mt: 'auto' }}>
                <Container maxWidth="lg">
                    <Typography variant="body2" color="text.secondary" align="center">
                        © {new Date().getFullYear()} E-Commerce App
                    </Typography>
                </Container>
            </Box>
        </Box>
    );
}

export default Layout;