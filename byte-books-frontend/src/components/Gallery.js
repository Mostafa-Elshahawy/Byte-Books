import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';
import Product from './Product';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';
import axios from 'axios';

const Gallery = ({ products, pagenationOn }) => {
    const [page, setPage] = useState(1);
    const [open, setOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const productsPerPage = 12;
    const totalPages = Math.ceil(products.length / productsPerPage);

    const handleChangePage = (event, value) => {
        setPage(value);
    };

    const startIndex = (page - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const currentProducts = products.slice(startIndex, endIndex);

    const handleClickOpen = (product) => {
        setSelectedProduct(product);
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleCartAddition = async (id) => {
        try {
            const response = await axios.post('localhost:8000/cart/product/' + id);
            console.log(response.data);
        } catch (error) {
            console.log('error during adding a product', error);
        }
    }

    return (
        <div style={{ margin: '20px' }}>
            <Grid container spacing={6}>
                {currentProducts.map((product, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index}>
                        <Product id={product.id} bookName={product.name} Author={product.author} imageSrc={product.image} Price={product.price} Description={product.description} onClick={() => handleClickOpen(product)} />
                    </Grid>
                ))}
            </Grid>
            {true && <Pagination count={totalPages} page={page} onChange={handleChangePage} variant="outlined" shape="rounded" size='large' style={{ margin: 'auto', marginTop: '20px', justifyContent: 'center' }} />}
            <Dialog open={open} onClose={handleClose} fullscreen>
                <DialogTitle>{selectedProduct?.name}</DialogTitle>
                <DialogContent>
                    <p>{selectedProduct?.description}</p>
                </DialogContent>
                <DialogActions>
                    <Button color='secondary' onClick={handleClose}>Close</Button>
                    <Button color='primary' onClick={() => handleCartAddition(selectedProduct?.id)}>add to cart</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default Gallery;
