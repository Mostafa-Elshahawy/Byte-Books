import React from'react';
import {Button, Grid, TextField, Typography,Link , useTheme} from '@mui/material';
import {Link as RouterLink} from 'react-router-dom';
import GoogleIcon from '@mui/icons-material/Google';
import { ThemeProvider } from '@emotion/react'; 
import manReadinImage from '../images/man-reading.png';

const SignUpForm = ({title,onSubmit})=>{
    const theme = useTheme();

    const SignUpLabel = {
        fontWeight: 'bold',
        fontSize:'24px',
        marginBottom: theme.spacing(2),
    };
    const SignInLink = {
        marginTop: theme.spacing(2),
    };

    const googleButton = {
        marginTop: theme.spacing(2),
        backgroundColor: '#CAA6A6',
        color: '#fff',
        fontWeight: 'bold',
        '&:hover': {
          backgroundColor: '#b38080',
        },
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        if(onSubmit){
            onSubmit();
        }
    };
    return (
        <ThemeProvider theme={theme}>
            <form style={{display:'flex',alignItems:'center',justifyContent:'center',height:'100%'}} onSubmit={handleSubmit}>
                <img src={manReadinImage} style={{width:'50%'}} alt="man reading"/>
                <Grid container direction="column" justify="center" alignItems="center" style={{borderLeft:'1px solid #ccc',width:'50%'}}>
                    <Typography variant="h2" style={SignUpLabel}>Sign Up</Typography>
                    <TextField label="Email" variant='outlined' style={{marginBottom:theme.spacing(2),width:'80%'}}/>
                    <TextField label="Username" variant='outlined' style={{marginBottom:theme.spacing(2),width:'80%'}}/>
                    <TextField label="Password" type="password" variant='outlined' style={{marginBottom:theme.spacing(2),width:'80%'}}/>
                    <TextField label="Phone" variant='outlined' style={{marginBottom:theme.spacing(2),width:'80%'}}/>
                    <TextField label="Adress" variant='outlined' style={{marginBottom:theme.spacing(2),width:'80%'}}/>
                    <Typography variant='body2' align='center' style={SignInLink}>
                        <Link component={RouterLink} to="/login" >Already have an account? Sign In here</Link>
                    </Typography>
                    <Button type='submit' variant='contained' style={{ marginTop: theme.spacing(2), fontWeight: 'bold',backgroundColor:'#944e63','&:hover':{
                        backgroundColor: '#b0697e',
                        }}}>Sign Up
                    </Button>
                    <Button startIcon={<GoogleIcon/>} type='submit' variant='contained' style={googleButton}>Sign Up with Google</Button>
                </Grid>
            </form>
        </ThemeProvider>
    )
}


export default SignUpForm;