import React from 'react';

import {Typography,Button} from '@mui/material';
const Hero = ()=>{

    return (
        <section style={{backgroundImage: `url(${process.env.PUBLIC_URL}/images/hero.jpg)`, height: '700px', width: '100%',backgroundSize:'cover',backgroundRepeat:'no-repeat', backgroundPosition: 'center'}}>
            <Typography variant="h3" gutterBottom style={{fontWeight:'bold',color:'#F8F4EC' , position: 'absolute', top: '60%', left: '30%', transform: 'translate(-50%, -50%)',backgroundColor:'#402B3A',padding:'10px'}}>
                Welcome to Byte Books
            </Typography>
            <Typography variant='h5' gutterBottom style={{fontWeight:'normal',color:'#944e63',position: 'absolute', top: '70%', left: '40%', transform: 'translate(-50%, -50%)',backgroundColor:'#F8F4EC',padding:'10px'}}>
                Browse the finest collection of bestsellers at lowest prices possible
            </Typography>
            <Button variant='contained' color='primary' style={{position: 'absolute', top: '70%', left: '65%', transform: 'translate(-50%, -50%)',padding:'10px',fontWeight:'bold',color:'#F8F4EC'}} >
                Shop Now
            </Button>
        </section>
    )
}

export default Hero;