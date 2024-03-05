// ProductView.js
import React, { useState, useEffect } from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell, Paper,IconButton } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import axios from 'axios';
const ProductView = () => {
  // State for storing product data and analytical data
  const [products, setProducts] = useState([]);


  const fetchProducts = async ()=>{
    try{
      let response = axios.get('http://localhost:8000/products/all');
     
      setProducts(response.data.prods);
      console.log(products);
    }catch(error){
      console.log(error);
    }
  }

  const handleDeleteProduct = async (id)=>{
    try{
      const response = await axios.delete('http://localhost:8000/products/delete/'+id);
      console.log(response.data);
    }catch(error){
      console.log(error);
    }
  }

  const handleEditProduct = async (id)=>{
    
  }
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Actions</TableCell>
           
           
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.id}</TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.description}</TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell>{product.quantity}</TableCell>
              <TableCell>
                <IconButton onClick={handleEditProduct(product.id)}><EditIcon /></IconButton>
                <IconButton onClick={handleDeleteProduct(product.id)}><DeleteIcon /></IconButton>
              </TableCell>
        
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* Render analytical data in another table */}
    </Paper>
  );
};

export default ProductView;
