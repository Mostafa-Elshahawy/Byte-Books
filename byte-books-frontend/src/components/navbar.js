import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Button,createTheme,ThemeProvider} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import {Link} from 'react-router-dom';
import Axios from 'axios';


const theme = createTheme({
    palette: {
        primary:{
            main:'#944e63',
        },
    },
});

const styles = {
    button: {
        '&:hover': {
            backgroundColor :'#b0697e',
            borderRadius: '10px',
            color:'#ffffff',    
        },
        color:'#ffffff',
        fontWeight:500,
        borderRadius: '8px',
    },
};

const Navbar = () => {

    const handleLogout = async ()=>{
        try{
            const response = await Axios.post('http://localhost:8000/logout');
            if (response.data.message === 'logged out'){
                sessionStorage.setItem('loginStatus',false);
                window.location.href='/main';
            }
        }catch(error){
            console.log('error during logout',error.response.data);
        }
    }

    const loginStatus = sessionStorage.getItem('loginStatus');
    return (
        <ThemeProvider theme={theme}>
            <AppBar position='static' style={{width :'100%',marginBottom: '20px'}}>
                <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu">
                    <MenuIcon />
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
                {loginStatus ?(
                    <>
                    <Button component={Link} to="/account" color="inherit" sx={styles.button}>
                    Account
                    </Button>
                    <IconButton color="inherit" onClick={handleLogout} sx={styles.button}>
                    <ExitToAppIcon />
                    </IconButton>
                    </>
                ):(
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