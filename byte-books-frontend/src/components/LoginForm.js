import React,{useState} from "react";
import {Button, Typography, Link,TextField,Grid,useTheme} from '@mui/material';
import {Link as RouterLink} from 'react-router-dom';
import GoogleIcon from '@mui/icons-material/Google';
import {ThemeProvider} from "@mui/material/styles";
import manReadinImage from '../images/man-reading.png';

const LoginForm = ({title,onSubmit}) => {
    const theme = useTheme();

    const [formData,setFormData] = useState({
        email:'',
        password:''
    });
      const signInLabel = {
        fontWeight: 'bold',
        fontSize: '24px',
        marginBottom: theme.spacing(2),
      };
    
      const signUpLink = {
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
    
    const handleChange = (event)=>{
      const {name,value}=event.target;
      setFormData(prevstate =>({
        ...prevstate,[name]:value
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
      <form style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }} onSubmit={handleSubmit}>
        <Grid container direction="column" justify="center" alignItems="center" style={{ borderRight: '1px solid #ccc', width: '50%' }}>
          <Typography variant="h2" style={signInLabel}>
            Sign In
          </Typography>
          <TextField required name='email' label="Email" variant="outlined" fullWidth style={{ marginBottom: theme.spacing(2) ,width:'80%' }} value={formData.email} onChange={handleChange}/>
          <TextField required name='password' label="Password" type="password" variant="outlined" fullWidth style={{ marginBottom: theme.spacing(2) ,width:'80%' }} value={formData.password} onChange={handleChange}/>
          <Typography variant="body2" align="center" style={signUpLink}>
            <Link component={RouterLink} to="/signup">
              Don't have an account? Create one.
            </Link>
          </Typography>

          {/* Sign In button */}
          <Button type="submit" variant="contained" style={{ marginTop: theme.spacing(2), fontWeight: 'bold',backgroundColor:'#944e63','&:hover':{
            backgroundColor: '#b0697e',
          }}}>
            Sign In
          </Button>

          {/* Sign In with Google button */}
          <Button startIcon={<GoogleIcon />} style={googleButton}>
            Sign In with Google
          </Button>
        </Grid>
        {/* Image */}
        <img src={manReadinImage} alt="man reading" style={{ width: '50%' }} />
      </form>
    </ThemeProvider>
    );
};

export default LoginForm;