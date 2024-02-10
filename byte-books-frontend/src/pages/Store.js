import React,{useState,useEffect} from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Gallery from '../components/Gallery';
import axios from 'axios';

const Store = () => {
    const [products, setProducts] = useState([]);

    useEffect(()=>{
        const fetchData = async () =>{
            try{
                const data = await axios.get('http://localhost:5000/products');
                setProducts(data.data);
            }
            catch(error){
                console.log(error);
            }
        } ;
        fetchData();
    },[]);
    return (
        <div>
            <Navbar />
            <Gallery products={products} />
            <Footer />
        </div>
    );
};

export default Store;