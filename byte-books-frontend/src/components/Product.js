import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import StarIcon from '@mui/icons-material/Star';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const theme = createTheme   ({
    palette: {
        primary: {
            main: '#944e63',
        },
    },
    overrides: {
        MuiCard:{
            root:{
                width:'calc(100% / 1.25)',
                height:'300px',
                marign:'8px',
                borderRadius:'8px',
                boxShadow:'0px 4px 6px rgba(0, 0, 0, 0.)',
                transition: 'box-shadow .3 ease-in-out',
                '&:hover': {
                    boxshadow:'0px 8px 12px rgba(0, 0, 0, 0.2)',
                },
            },
        },
    },
    MuiTypography: {
        subtitle1: {
          color: '#333',
        },
        h4: {
          color: '#f00',
        },
      },
    });

    const Product= ()=> {
        return (
            <ThemeProvider theme={theme}>
                <Card>
                    <CardMedia content='img' src='../images/atomic-habits.jpg' alt='Atomic Habits'/>
                    <CardContent>
                        <Typography variant ='subtitle1'>James Clear</Typography>
                        <Typography variant ='h5'>Atomic Habits</Typography>
                        <div className='starRating'>
                            <StarIcon />
                            <StarIcon />
                            <StarIcon />
                            <StarIcon />
                            <StarIcon />
                        </div>
                        <Typography variant='h4'>$19.99</Typography>
                    </CardContent>
                    <a href = '#'><ShoppingCartIcon className='cart' /></a>
                </Card>
            </ThemeProvider>
        );
    };

    export default Product;