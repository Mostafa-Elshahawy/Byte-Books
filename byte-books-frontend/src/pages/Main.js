import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import Newsletter from '../components/Newsletter';
import Gallery from '../components/Gallery';

const Main = ()=>{

    const staticProds =[
        {bookName: 'Atomic Habits', Author:'james clear', imageSrc: '../images/atomic habits.jpg' },
        {bookName: 'DeepWork', Author:'cal newport', imageSrc: '../images/DeepWork.jpg' },
        {bookName: '100years' ,Author:'zeby we regalto', imageSrc:'../images/100years.jpg'},
        {bookName: 'animal farm', Author:'george orwell', imageSrc:'../images/AnimalFarm.jpg'},
        {bookName: 'macbeth', Author:'william shakespeare' , imageSrc:'../images/macbeth.jpg'},
        {bookName: 'norse mythology', Author:'neil geiman', imageSrc:'../images/norse-mythology.jpg'},
        {bookName: 'the first 20 hours', Author:'brandon sanderson', imageSrc:'../images/thefirst20.jpg'},
        {bookName: ' the lost symbol', Author:'dan brown', imageSrc:'../images/theLostSymbol.jpg'},
        {bookName: 'macbeth', Author:'william shakespeare' , imageSrc:'../images/macbeth.jpg'},
        {bookName: 'norse mythology', Author:'neil geiman', imageSrc:'../images/norse-mythology.jpg'},
        {bookName: 'the first 20 hours', Author:'brandon sanderson', imageSrc:'../images/thefirst20.jpg'},
        {bookName: ' the lost symbol', Author:'dan brown', imageSrc:'../images/theLostSymbol.jpg'},
    ];

    return (
        <>
        <Navbar />
        <Hero />
        <Gallery products={staticProds} />
        <Newsletter />
        <Footer />
        </>
    )
}

export default Main;