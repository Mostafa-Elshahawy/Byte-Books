import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import {Grid,Typography} from '@mui/material';


const ContactUsPage = () => {
    return (
        <div>
            <Navbar />
                <Grid container style={{padding:'5px',marginRight:'10px', marginLeft:'10px', marginTop:'20px', display: 'flex',flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                    <Typography variant="h4" gutterBottom style={{fontWeight:'bold'}}>
                        Contact Us
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        If you have any questions, feel free to contact us on our social media pages or by email or phone.
                    </Typography>
                </Grid>
                <section style={{display:'flex',flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop:'20px', marginBottom:'20px'}}>
                    <div style={{display:'flex',flexDirection: 'column', justifyContent: 'center', alignItems: 'center', margin:'20px'}}>
                        <img src={`${process.env.PUBLIC_URL}/images/PhoneContact.png`} alt='contact by phone' style={{width:'200px'}} />
                        <p style={{textAlign:'center',fontWeight:'bold'}}>Call us on 123-456-7890</p>
                    </div>
                    <div style={{display:'flex',flexDirection: 'column', justifyContent: 'center', alignItems: 'center', margin:'20px'}}>
                        <img src={`${process.env.PUBLIC_URL}/images/PhoneContact.png`} alt='contact by phone' style={{width:'200px'}} />
                        <p style={{textAlign:'center',fontWeight:'bold'}}>Send us an E-mail on ByteBooks@gmail.com</p>
                    </div>
                    <div style={{display:'flex',flexDirection: 'column', justifyContent: 'center', alignItems: 'center', margin:'20px'}}>
                        <img src={`${process.env.PUBLIC_URL}/images/PhoneContact.png`} alt='contact by phone' style={{width:'200px'}} />
                        <p style={{textAlign:'center',fontWeight:'bold'}}>Visit us on our branch at 123 Main St</p>
                    </div>
                </section>
            <Footer />
        </div>
    );
};

export default ContactUsPage