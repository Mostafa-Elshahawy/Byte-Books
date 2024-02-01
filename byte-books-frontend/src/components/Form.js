import React from "react";
import {Button, Typography, Link,TextField,Grid,useTheme} from '@mui/material';
import {Link as RouterLink} from 'react-router-dom';
import GoogleIcon from '@mui/icons-material/Google';
import {ThemeProvider} from "@mui/material/styles";
import manReadinImage from '../images/man-reading.png';

const Form = ({title,onSubmit}) => {
    const theme = useTheme();
  
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
        backgroundColor: theme.palette.secondary.main,
        color: '#fff',
        '&:hover': {
          backgroundColor: theme.palette.secondary.dark,
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
      <form style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }} onSubmit={handleSubmit}>
        {/* Image */}
        <img src={manReadinImage} alt="man reading" style={{ width: '50%' }} />

        <Grid container direction="column" justify="center" alignItems="center" style={{ borderLeft: '1px solid #ccc', width: '50%' }}>
          {/* Sign In label */}
          <Typography variant="h2" style={signInLabel}>
            Sign In
          </Typography>

          {/* Username input */}
          <TextField label="Username" variant="outlined" fullWidth style={{ marginBottom: theme.spacing(2) ,width:'80%' }} />

          {/* Password input */}
          <TextField label="Password" type="password" variant="outlined" fullWidth style={{ marginBottom: theme.spacing(2) ,width:'80%' }} />

          {/* Sign up link */}
          <Typography variant="body2" align="center" style={signUpLink}>
            <Link component={RouterLink} to="/signup">
              Don't have an account? Create one.
            </Link>
          </Typography>

          {/* Sign In button */}
          <Button type="submit" variant="contained" style={{ marginTop: theme.spacing(2) }}>
            Sign In
          </Button>

          {/* Sign In with Google button */}
          <Button startIcon={<GoogleIcon />} style={googleButton}>
            Sign In with Google
          </Button>
        </Grid>
      </form>
    </ThemeProvider>
    );
};

export default Form;