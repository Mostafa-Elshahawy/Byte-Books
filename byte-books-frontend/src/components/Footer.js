import React from 'react';
import {Container,Grid,Typography,Link} from '@mui/material';

const Footer = () => {
    return (
        <footer style={{backgroundColor:'#f9edec', marginTop: '30px',marginRight:'0', marginLeft:'0' }}>
        <Container>
            <Grid container spacing={3} justifyContent="space-between">
                {/*Social media contact info*/}
                <Grid items xs={12} sm={4} sx={{padding:'20px'}}>
                    <Typography variant='h6' gutterBottom fontWeight='bold'>
                        Our socialmedia
                    </Typography>
                    <ul style={{listStyleType:'none',padding:'0'}}>
                        <li><Link href='#'>Facebook</Link></li>
                        <li><Link href='#'>X</Link></li>
                        <li><Link href='#'>Instagram</Link></li>
                        <li><Link href='#'>Linkedin</Link></li>
                    </ul>
                </Grid>
                {/*Adresses and contact info*/}
                <Grid item xs={12} sm={4} sx={{padding:'20px'}}>
                    <Typography variant="h6" gutterBottom fontWeight="bold">
                        Addresses and Contact Info
                    </Typography>
                     <ul style={{listStyleType:'none',padding:'0'}}>
                        <li>123 Main St, City</li>
                        <li>Phone: 123-456-7890</li>
                        <li>Email: ByteBooks@gmail.com</li>
                    </ul>
                </Grid>
                {/* Important Links Column */}
                <Grid item xs={12} sm={4} sx={{padding:'20px'}}>
                    <Typography variant="h6" gutterBottom fontWeight="bold">
                        Important Links
                    </Typography>
                    <ul style={{listStyleType:'none',padding:'0'}}>
                         <li><Link href="#">About Us</Link></li>
                        <li><Link href="#">Services</Link></li>
                        <li><Link href="#">FAQ</Link></li>
                    </ul>
                </Grid>
            </Grid>
        </Container>
        </footer>
    );
};

export default Footer;