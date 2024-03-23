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
    <Box display="flex" flexDirection="column" justifyContent="space-between" height="100vh">
      <Box boxShadow={3} border={1} borderRadius={5} p={2} mb={2}>
        <PreviewImage imageSrc={product.image} />
      </Box>
      <Box boxShadow={3} border={1} borderRadius={5} p={2} mb={2}>
        <div>
          <h1>{product.title}</h1>
          <p>{product.description}</p>
          <h3>{product.price}</h3>
          <p>book genre</p>
        </div>
      </Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" boxShadow={3} border={1} borderRadius={5} p={2}>
        <Button onClick={decreaseQuantity} variant="outlined">-</Button>
        <span style={{ margin: '0 10px' }}>{quantity}</span>
        <Button onClick={increaseQuantity} variant="outlined">+</Button>
        <Button onClick={handleCartAddition} variant="contained" color="primary">Add to cart</Button>
      </Box>
    </Box>
  );
};

export default ProductDetails;
