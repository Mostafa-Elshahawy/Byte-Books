import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Button, createTheme, ThemeProvider, InputBase} from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
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
    const [isLoggedIn, setIsLoggedIn] = useState(!!sessionStorage.getItem('loginStatus'));
    const [searchQuery,setSearchQuery] = useState('');
    const [isAdmin, setIsAdmin] = useState(!!sessionStorage.getItem('isAdmin'));
    //const history = useHistory();
    const handleLogout = async () => {
        try {
            const response = await Axios.post('http://localhost:8000/logout');
            if (response.data.message === 'logged out') {
                sessionStorage.removeItem('loginStatus');
                sessionStorage.removeItem('isAdmin');
                setIsLoggedIn(false);
                setIsAdmin(false);
            }
        } catch (error) {
            console.log('error during logout', error.response.data);
        }
    };

    const handleSearchQuery =(e) =>{
        setSearchQuery(e.target.value);
    };

    const handleSearchSubmit = (e) =>{
        // if (e.key === 'Enter') {
        //     e.preventDefault();
        //     if (searchQuery.trim() !== '') {
        //         history.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
        //     }
        // }
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
                    <div style={styles.search}>
                        <div style={styles.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Search..."
                            style={styles.inputInput}
                            value={searchQuery}
                            onChange={handleSearchQuery}
                           onKeyDown={handleSearchSubmit}
                        />
                    </div>
                    <Button component={Link} to='/main' color='inherit' sx={styles.button}>
                        Home
                    </Button>
                    <Button component={Link} to='/store' color='inherit' sx={styles.button}>
                        Store
                    </Button>
                    <Button component={Link} to="/contact-us" color="inherit" sx={styles.button}>
                        Contact Us
                    </Button>
                    
                    {isLoggedIn ? (
                        isAdmin ? (
                            <>
                            <IconButton color="inherit" onClick={handleLogout} sx={styles.button}>
                                <ExitToAppIcon />
                            </IconButton>
                        </>
                        ):(
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
                        )
                    ) : (
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
