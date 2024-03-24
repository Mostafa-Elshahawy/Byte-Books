import React, { useState } from 'react';
import PreviewImage from './PreviewImage';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import axios from 'axios';

const ProductDetails = ({ product }) => {
  const [quantity, setQuantity] = useState(1);

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleCartAddition = async () => {
    try {
      const response = await axios.post('http://localhost:8000/cart/product/' + product.id, { quantity }, { withCredentials: true });
      console.log(response.data);
    } catch (error) {
      console.log('error during adding a product', error);
    }
  };

  return (
    <Box display="flex" flexDirection="row" justifyContent="space-between" height="700px">
      <Box borderRadius={5} p={2} mb={2}>
        <PreviewImage imageSrc={product.image} />
      </Box>
      <Box  borderRadius={5} p={2} mb={2}>
        <div>
          <h1 style={{fontWeight: 'bold', fontSize: '30px',marginBottom: '10px'}}>{product.title}</h1>
          <h3 style={{fontWeight: 'bold', fontSize: '20px',marginBottom: '10px'}}>by: {product.author}</h3>
          <h3 style={{fontWeight: 'bold', fontSize: '25px',marginBottom: '10px'}}>{product.price} $</h3>
          <p style={{marginBottom: '10px', fontSize: '17px'}}>{product.description}</p>
          <h5>book genre</h5>
        </div>
      </Box>
      <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" borderRadius={5} p={2}>
        <div>
          <Button onClick={decreaseQuantity} variant="outlined">-</Button>
          <span style={{ margin: '10px' }}>{quantity}</span>
          <Button onClick={increaseQuantity} variant="outlined">+</Button>
        </div>
        <Button onClick={handleCartAddition} variant="contained" color="primary" style={{ margin: '10px' }}>Add to cart</Button>
      </Box>
    </Box>
  );
};

export default ProductDetails;
