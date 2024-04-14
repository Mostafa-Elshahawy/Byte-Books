import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Button, createTheme, ThemeProvider} from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from 'react-router-dom';
import Axios from 'axios';

const theme = createTheme({
    palette: {
        primary: {
            main: '#944e63',
        },
    },
});

const styles = {
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px',
        backgroundColor: '#944e63', // Adjust background color as needed
        color: '#ffffff', // Adjust text color as needed
    },
    button: {
        '&:hover': {
            backgroundColor: '#b0697e',
            borderRadius: '10px',
            color: '#ffffff',
        },
        color: '#ffffff',
        fontWeight: 500,
        borderRadius: '8px',
        margin: '0 10px',
    },
    search: {
        position: 'relative',
        borderRadius: '8px',
        backgroundColor: '#ffffff',
        flexGrow: 1,
        width: 'auto', 
        '&:hover': {
            backgroundColor: '#f0f0f0',
        },
        padding: '5px 10px',
        paddingLeft: '50px',
    },
    searchIcon: {
        padding: '0 8px',
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputInput: {
        padding: '5px',
        paddingLeft: 'calc(1em + 32px)',
        transition: 'width 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
        width: '100%',
    },
};

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(sessionStorage.getItem('loginStatus'));
    const [userType, setUserType] = useState('');
    if (isLoggedIn === 0) {
        setUserType('admin');
    }else if(isLoggedIn === 1){
        setUserType('user');
    }else{
        setUserType('guest');
    }
    const handleLogout = async () => {
        try {
            const response = await Axios.post('http://localhost:8000/logout');
            if (response.data.message === 'logged out') {
                sessionStorage.removeItem('loginStatus');
                setIsLoggedIn(2);
                setUserType('guest');
                window.location.href = '/login';
            }
        } catch (error) {
            console.log('error during logout', error.response.data);
        }
    };


    return (
        <ThemeProvider theme={theme}>
            <AppBar position='static' style={{ width: '100%', marginBottom: '20px' }}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <img src={`${process.env.PUBLIC_URL}/images/logo.png`} alt="logo" style={{ width: '50px' }} />
                    </IconButton>
                    <Typography variant="h6" component={Link} to='/main' style={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}>
                        ByteBooks
                    </Typography>
                    <Button component={Link} to='/main' color='inherit' sx={styles.button}>
                        Home
                    </Button>
                    <Button component={Link} to='/store' color='inherit' sx={styles.button}>
                        Store
                    </Button>
                    <Button component={Link} to="/contact-us" color="inherit" sx={styles.button}>
                        Contact Us
                    </Button>
                    
                    {userType === 'admin' && (
                        <IconButton color="inherit" onClick={handleLogout} sx={styles.button}>
                            <ExitToAppIcon />
                        </IconButton>
                    )}

                    {userType === 'user' && (
                        <> 
                            <Button component={Link} to="/orders" color="inherit" sx={styles.button}>
                                Orders
                            </Button>
                            <IconButton component={Link} to="/cart" color="inherit" sx={styles.button}>
                                <ShoppingCartIcon />
                            </IconButton>
                            <IconButton color="inherit" onClick={handleLogout} sx={styles.button}>
                                <ExitToAppIcon />
                            </IconButton>
                        </>
                    )}

                    {userType === 'guest' && (
                        <Button component={Link} to='/login' color='inherit' sx={styles.button}>
                            Sign In
                        </Button>
                    )}
                                    </Toolbar>
                                </AppBar>
                            </ThemeProvider>
                        );
                    };

export default Navbar;
