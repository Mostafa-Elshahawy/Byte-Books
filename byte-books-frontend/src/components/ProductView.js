import React, { useState, useEffect } from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell, Paper, IconButton,Snackbar } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import EditDialog from './EditDialog';
import axios from 'axios';

const ProductView = () => {
 const [products, setProducts] = useState([]);
 const [editingProduct, setEditingProduct] = useState(null);
 const [isDialogOpen, setIsDialogOpen] = useState(false);
 const [uploadedImage,setUploadedImage] = useState(null);
 const [snackBarOpen, setSnackBarOpen] = useState(false);

 const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8000/products/all');
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
 };

 const handleImageUpload = async (file) => {
   try{
     const response = await axios.post('http://localhost:8000/admin/upload-image',file);
     setUploadedImage(response.data.image);
     setSnackBarOpen(true);
   }catch(error){
    console.error('error while uploading image',error);
   }
 }

 const handleImageReset = () => {
  setUploadedImage(null);
 };
 const handleDeleteProduct = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8000/products/delete/${id}`);
      console.log(response.data);
      fetchProducts(); // Refresh the product list after deletion
    } catch (error) {
      console.error(error);
    }
 };

 
 const handleEditProduct = (product) => {
    setEditingProduct(product);
    setIsDialogOpen(true);
 };

 const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingProduct(null);
 };

 const handleEdit = (updatedProduct, uploadedImage) => {
  setEditingProduct({...updatedProduct, image: uploadedImage});
 };

 const handleSaveProduct = async () => {
    try {
      const updatedProduct = {...editingProduct, image: uploadedImage};
      const response = await axios.patch(`http://localhost:8000/products/update/${editingProduct.id}`, updatedProduct, { withCredentials: true });
      console.log(response.data);
      setIsDialogOpen(false);
      setEditingProduct(null);
      setUploadedImage(null);
      fetchProducts(); 
    } catch (error) {
      console.error('Error during editing:', error);
    }
 };

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
                <IconButton onClick={() => handleEditProduct(product)}> <EditIcon /> </IconButton>
                <IconButton onClick={() => handleDeleteProduct(product.id)}> <DeleteIcon /> </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <EditDialog open={isDialogOpen} handleClose={handleCloseDialog} Product={editingProduct} 
      handleSave={handleSaveProduct} handleEdit={handleEdit} 
      handleImageReset={handleImageReset} handleImageUpload={handleImageUpload}
      />
      <Snackbar open={snackBarOpen} autoHideDuration={6000} onClose={() => setSnackBarOpen(false)}  message="Image uploaded successfully" />
    </Paper>
 );
};

export default ProductView;
