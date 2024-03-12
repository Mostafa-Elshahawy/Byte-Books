import React ,{useState,useEffect } from "react";
import ProductDetails from "../components/ProductDetails";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {useParams} from 'react-router-dom';
import axios from 'axios';

const ProductDetailsPage = ()=>{
    const {id} = useParams();
    const [product,setProduct] = useState(null); 

    useEffect(()=>{
        const fetchProduct = async ()=>{
            try{
                const response = await axios.get(`http://localhost:8000/product/${id}`);
                setProduct(response.data);
            }catch(error){
                console.log('error during fetching product',error)
            }
        };
        fetchProduct();
    },[id])

    return(
        <>
        <Navbar />
        {product ? <ProductDetails product={product} /> : <p>Error Loading the product</p>}
        <Footer />
        </>
    );
};

export default ProductDetailsPage;