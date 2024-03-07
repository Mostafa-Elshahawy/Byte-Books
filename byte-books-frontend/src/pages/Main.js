import React,{useState,useEffect} from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import Newsletter from '../components/Newsletter';
import Gallery from '../components/Gallery';
import axios from 'axios';
const Main = ()=>{
    const [products,setProducts] = useState([]);
    const fetchProducts = async ()=>{
        try{
            const response = await axios.get('http://localhost:8000/products/all');
            const first12 = response.data.slice(0,12);
            setProducts(first12);
        }catch(error){
            console.log(error);
        }
    }
    useEffect(()=>{
        fetchProducts();
    },[])
    

    return (
        <>
        <Navbar />
        <Hero />
        <Gallery products={products} />
        <Newsletter />
        <Footer />
        </>
    )
}

export default Main;