import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useHistory ,Link} from 'react-router-dom';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
//import StarIcon from '@mui/icons-material/Star';
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

    const Product= ({bookName,Author,imageSrc,Price,ProductID})=> {
        const history = useHistory();

        const handleClick = ()=>{
            history.push(`/product/${ProductID}`);
        };
        
        return (
            <ThemeProvider theme={theme}>
                <Card onClick={handleClick}>
                    <CardMedia component="img" src={`${process.env.PUBLIC_URL}/images/${imageSrc}`} alt={`${bookName}`} />
                    <CardContent>
                        <Typography variant ='subtitle1'>{bookName}</Typography>
                        <Typography variant ='h5'>{Author}</Typography>
                        {/*<div className='starRating'>
                            <StarIcon />
                            <StarIcon />
                            <StarIcon />
                            <StarIcon />
                            <StarIcon />
                        </div>*/}
                        <Typography variant='h4'>{Price}</Typography>
                    </CardContent>
                    <Button component={Link} to='../pages/Cart' color='inherit'><ShoppingCartIcon className='cart' /></Button>
                </Card>
            </ThemeProvider>
        );
    };

    export default Product;