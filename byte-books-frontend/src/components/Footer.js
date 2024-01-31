import React from 'react';
import './footer.css'
const Footer = () => {
    return (
        <>
            <div className='row g-5 mb-5' >
                <div className='col-lg-4'>
                    <div className='mb-4 footer-logo-wrap'><a href='#' className='footer-logo'>Byte Books<span>.</span></a></div>
                    <p className='mb-4'>Your trusted bookstore, find all the new and old books of your liking in all the geners you want with the lowest prices on the market </p>

                    <ul className='list-unstyled custom-social'>
                        <li><a href='#'><span className='fa fa-brands fa-facebook-f'></span></a></li>
                        <li><a href='#'><span className='fa fa-brands fa-twitter'></span></a></li>
                        <li><a href='#'><span className='fa fa-brands fa-instagram'></span></a></li>
                        <li><a href='#'><span className='fa fa-brands fa-linkedin'></span></a></li>
                    </ul>
                </div>
                <div className='col-lg-8'> 
                    <div className='row lins-wrap'>
                        <div className='col-6 col-sm-6 col-md-3'>
                            <ul className='list-unstyled'>
                                    <li><a href="#">About us</a></li>
									<li><a href="#">Services</a></li>
									<li><a href="#">Account</a></li>
									<li><a href="#">Contact us</a></li>
                            </ul>
                        </div>
                        <div class="col-6 col-sm-6 col-md-3">
								<ul class="list-unstyled">
									<li><a href="#">Support</a></li>
									<li><a href="#">Knowledge base</a></li>
									<li><a href="#">Live chat</a></li>
								</ul>
						</div>
                        <div class="col-6 col-sm-6 col-md-3">
								<ul class="list-unstyled">
									<li><a href="#">Jobs</a></li>
									<li><a href="#">Our team</a></li>
									<li><a href="#">Leadership</a></li>
									<li><a href="#">Privacy Policy</a></li>
								</ul>
						</div>
                        <div class="col-6 col-sm-6 col-md-3">
								<ul class="list-unstyled">
									<li><a href="#">Animal farm</a></li>
									<li><a href="#">Atomic Habits</a></li>
									<li><a href="#">Deep Work</a></li>
								</ul>
						</div>
                    </div>
                </div>
            </div>
            <div class="border-top copyright">
					<div class="row pt-4">
						<div class="col-lg-6">
							<p class="mb-2 text-center text-lg-start">Copyright &copy;<script>document.write(new Date().getFullYear());</script>. All Rights Reserved. &mdash; Designed with love by <a href="https://untree.co">Untree.co</a> Distributed By <a hreff="https://themewagon.com">ThemeWagon</a> 
                        </p>
						</div>

						<div class="col-lg-6 text-center text-lg-end">
							<ul class="list-unstyled d-inline-flex ms-auto">
								<li class="me-4"><a href="#">Terms &amp; Conditions</a></li>
								<li><a href="#">Privacy Policy</a></li>
							</ul>
						</div>

					</div>
				</div>
        </>
        /*
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
        </footer>*/
    );
};

export default Footer;