import React from 'react';
import './footer.css'
const Footer = () => {
    return (
        <footer>
            <div className ="col">
            <img className= "logo" src="images/logo.png" alt="" width="50px" height="50px"/>
            <h4>Contact</h4>
            <p><strong>Address :</strong> om-eldony-kafr el ba3bsa</p>
            <p><storng>Phone:</storng> +201005863778</p>
            <p><storng>hours:</storng> 9am : 9pm</p>
            <div className = "follow">
                <h4>Follow Us</h4>
                <div className = "icon">
                    <i className ="fab fa-facebook-f"></i>
                    <i className = "fab fa-twitter"></i>
                    <i className = "fab fa-youtube"></i>
                    <i className = "fab fa-instagram"></i>
                    <i className = "fab fa-reddit"></i>
                </div>
            
            </div>
        </div>
        <div class = "col">
            <h4>My account</h4>
            <a href="login.html">login</a>
            <a href="shopping-cart.html">shopping cart</a>
            <a href="#" >help</a>
        </div>
        <div className = "col">
            <h4>about</h4>
            <a href="#" >about us</a>
            <a href="#" >Privacy Policy</a>
            <a href="#">Terms & conditions</a>
            <a href="contactus.html">contact us</a>
        </div>
        </footer>
    );
};

export default Footer;