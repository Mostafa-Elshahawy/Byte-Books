import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const theme = createTheme({
    palette: {
        primary:{
            main:'#944e63',
        },
    },
});

const ProductDetails = ({ product }) => {
  return (
    <ThemeProvider theme={theme}>
      <Card sx={{ display: 'flex', maxWidth: 800, margin: 'auto', marginTop: 20 }}>
        <CardMedia
          component="img"
          sx={{ width: 200, height: 300 }}
          image={product.image}
          title={product.name}
        />
        <div sx={{ display: 'flex', flexDirection: 'column', marginLeft: 2 }}>
          <CardContent sx={{ flex: '1 0 auto' }}>
            <Typography component="h5" variant="h5">
              {product.name}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {product.description}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              Price: ${product.price}
            </Typography>
          </CardContent>
          <div>
            <Button variant="contained" color="primary">
              Add to Cart
            </Button>
          </div>
        </div>
      </Card>
    </ThemeProvider>
  );
};

export default ProductDetails;
