import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import Newsletter from '../components/Newsletter';
import Gallery from '../components/Gallery';
const Main = ()=>{

    const staticProds =[
        { id: 1, name: 'Atomic Habits', price: 50, image: '../images/atomic habits.jpg' },
        { id: 2, name: 'DeepWork', price: 60, image: '../images/DeepWork.jpg' },
        {id:3, name:'100years' ,price:40, image:'../images/100years.jpg'},
        {id:4, name:'animal farm', price:20, image:'../images/AnimalFarm.jpg'},
        {id:5, name:'macbeth', price: 20 , image:'../images/macbeth.jpg'},
        {id:6 , name:'norse mythology', price:30, image:'../images/norse-mythology.jpg'},
        {id:7, name:'the first 20 hours', price:40, image:'../images/thefirst20.jpg'},
        {id:8, name :' the lost symbol', price:20, image:'../images/theLostSymbol.jpg'},
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