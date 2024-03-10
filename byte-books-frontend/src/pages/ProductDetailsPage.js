import React ,{useState,useEffect } from "react";
import ProductDetails from "../components/ProductDetails";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {useParams} from 'react-router-dom';
import axios from 'axios';

const ProductDetailsPage = ()=>{
    const {ProductID} = useParams();
    const [product,setProduct] = useState(null); 

    useEffect(()=>{
        const fetchProduct = async ()=>{
            try{
                const response = await axios.get(`localhost:8000/product/:id${ProductID}`);
                setProduct(response.data);
            }catch(error){
                console.log('error during fetchin product',error)
            }
        };
        fetchProduct();
    },[ProductID])

    return(
        <>
        <Navbar />
        {product ? <ProductDetails product={product} /> : <p>Loading...</p>}
        <Footer />
        </>
    );
};

export default ProductDetailsPage;