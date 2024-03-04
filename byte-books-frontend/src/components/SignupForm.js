import React ,{useState} from 'react';
import {Button, Grid, TextField, Typography,Link , useTheme} from '@mui/material';
import {Link as RouterLink} from 'react-router-dom';
import GoogleIcon from '@mui/icons-material/Google';
import { ThemeProvider } from '@emotion/react'; 
import manReadinImage from '../images/man-reading.png';

const SignUpForm = ({title,onSubmit})=>{
    const theme = useTheme();

    const [formData,setFormData] = useState({
        username:'',
        email:'',
        password:'',
        phone:'',
        address:''
    });

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

    const handleChange=(event)=>{
        const {name,value} = event.target;
        setFormData(prevState =>({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if(onSubmit){
            onSubmit(formData);
        }
    };
    return (
        <ThemeProvider theme={theme}>
            <form style={{display:'flex',alignItems:'center',justifyContent:'center',height:'100%'}} onSubmit={handleSubmit}>
                <img src={manReadinImage} style={{width:'50%'}} alt="man reading"/>
                <Grid container direction="column" justify="center" alignItems="center" style={{borderLeft:'1px solid #ccc',width:'50%'}}>
                    <Typography variant="h2" style={SignUpLabel}>Sign Up</Typography>
                    <TextField required name="username" label="Username" variant='outlined' style={{ marginBottom: theme.spacing(2), width: '80%' }} value={formData.username} onChange={handleChange} />
                    <TextField required name="email" label="Email" variant='outlined' style={{ marginBottom: theme.spacing(2), width: '80%' }} value={formData.email} onChange={handleChange} />
                    <TextField required name="password" label="Password" type="password" variant='outlined' style={{ marginBottom: theme.spacing(2), width: '80%' }} value={formData.password} onChange={handleChange} />
                    <TextField required name="phone" label="Phone" variant='outlined' style={{ marginBottom: theme.spacing(2), width: '80%' }} value={formData.phone} onChange={handleChange} />
                    <TextField required name="address" label="Address" variant='outlined' style={{ marginBottom: theme.spacing(2), width: '80%' }} value={formData.address} onChange={handleChange} />
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