import React ,{useState,useEffect} from 'react';
import Gallery from './Gallery';
import axios from 'axios';

const BooksLikethis = () => {

    const [products,setProducts] = useState([]);
    const fetchProducts = async ()=>{
        try{
            const response = await axios.get('http://localhost:8000/products/all');
            const first12 = response.data.slice(0,4);
            setProducts(first12);
        }catch(error){
            console.log(error);
        }
    }
    useEffect(()=>{
        fetchProducts();
    },[])
    return (
        <div>
            <h1>Books Like This Book ...</h1>
            <Gallery products={products} pgaenationOn={false}/>
        </div>
    );
};

export default BooksLikethis;