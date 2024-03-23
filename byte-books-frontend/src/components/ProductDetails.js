import React,{useState} from 'react';
import PreviewImage from './PreviewImage';
import Box from '@mui/material/Box';
import axios from 'axios';

const ProductDetails = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const decreaseQuantity = () => {
    if (quantity > 1) {
        setQuantity(quantity - 1);
    }
}

const increaseQunatity = () => {
    setQuantity(quantity + 1);
}
  const handleCartAddition =  async () => {
    try {
        const response = await axios.post('http://localhost:8000/cart/product/' + product.id, { quantity }, { withCredentials: true });
        console.log(response.data);
    }catch (error) {
        console.log('error during adding a product', error);
    }
};
  return (
    <Box display="flex" flexDirection='row' justifyContent='space-between' height='100vh'> 
      <PreviewImage imageSrc={product.image} />
      <div>
        <h1>{product.title}</h1>
        <p>{product.description}</p>
        <h3>{product.price}</h3>
        <p>book genre</p>
      </div>
      <>
      <div style={{display:'flex',flexDirection: 'column', justifyContent: 'center', alignItems: 'center', margin:'20px'}}>
        <div style={{display:'flex',flexDirection:'row' ,justifyContent: 'center', alignItems: 'center'}}>
            <button onClick={decreaseQuantity}>-</button>
            <span>{quantity}</span>
            <button onClick={increaseQunatity}>+</button>
        </div>
        <button onClick={handleCartAddition}>Add to cart</button>
        </div>
      </>
    </Box>
  );
};

export default ProductDetails;
