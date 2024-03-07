import React ,{useState} from 'react';
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';
import Product from './Product';
import {Dialog,DialogActions,DialogContent,DialogTitle,Button} from '@mui/material';

const Gallery = ({products}) => {
    const [page, setPage] = useState(1);
    const [open,setOpen] = useState(false);
    const [selectedProduct,setSelectedProduct] = useState(null);
    const productsPerPage = 12;
    const totalPages =Math.ceil(products.length / productsPerPage);

    const handleChangePage = (event, value) => {
        setPage(value);
    };

    const startIndex =(page-1)*productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const currentProducts = products.slice(startIndex, endIndex);

    const handleClickOpen = (product)=>{
        setSelectedProduct(product);
        setOpen(true);
    }

    const handleClose = ()=>{
        setOpen(false);
    }

    return (
        <div style={{margin:'10px'}}>
            <Grid container spacing={4}>
                {currentProducts.map((product,index)=>(
                    <Grid  item xs={12} sm={6} md={3} key={index}>
                        <Product bookName={product.name} Author={product.author} imageSrc={product.image} onClick={() => handleClickOpen(product)}/>
                    </Grid>
                ))}
            </Grid>
            <Pagination count={totalPages} page={page} onChange={handleChangePage} variant="outlined" shape="rounded" size='large' style={{ margintTop:'20px',justifyContent:'center'}} />
            <Dialog open={open} onClose={handleClose} fullscreen>
                <DialogTitle>{selectedProduct?.name}</DialogTitle>
                <DialogContent>
                    <p>{selectedProduct?.description}</p>
                </DialogContent>
                <DialogActions>
                    <Button color='secondary' onClick={handleClose}>Close</Button>
                    <Button color='primary' >add to cart</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default Gallery;