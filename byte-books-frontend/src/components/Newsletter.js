import React, { useState } from 'react';
import {
  TextField,
  FormControl,
  InputLabel,
  InputAdornment,
  IconButton,
  Typography,
  Box,
} from '@mui/material';
import { Email as EmailIcon } from '@mui/icons-material';

const Newsletter = () => {
    const [email, setEmail] = useState('');

  const handleInputChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit =  (event) =>{
    event.preventDefault();
    console.log(email);
    setEmail('');
  }

    return (
        <Box bgcolor="#f5f5f5" p={3} height={300}>
      <Typography variant="h5" gutterBottom>
        Subscribe to Byte Books Newsletter
      </Typography>
      <Typography variant="body1" gutterBottom>
        Stay updated with the latest releases, promotions, and news from Byte Books.
      </Typography>
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth>
          <InputLabel htmlFor="newsletter-email">Email</InputLabel>
          <TextField
            id="newsletter-email"
            type="email"
            value={email}
            onChange={handleInputChange}
            placeholder="Enter your email"
            fullWidth
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton type="submit">
                    <EmailIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </FormControl>
      </form>
    </Box>
    );
};

export default Newsletter;