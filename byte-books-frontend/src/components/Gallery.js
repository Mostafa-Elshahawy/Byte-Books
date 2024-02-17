import React ,{useState} from 'react';
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';
import Product from './Product';

const Gallery = ({products}) => {
    const [page, setPage] = useState(1);
    const productsPerPage = 12;
    const totalPages =Math.ceil(products.length / productsPerPage);

    const handleChangePage = (event, value) => {
        setPage(value);
    };

    const startIndex =(page-1)*productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const currentProducts = products.slice(startIndex, endIndex);

    return (
        <div style={{margin:'10px'}}>
            <Grid container spacing={4}>
                {currentProducts.map((product,index)=>(
                    <Grid  item xs={12} sm={6} md={3} key={index}>
                        <Product product={product} />
                    </Grid>
                ))}
            </Grid>
            <Pagination count={totalPages} page={page} onChange={handleChangePage} variant="outlined" shape="rounded" size='large' style={{ margintTop:'20px',justifyContent:'center'}} />
        </div>
    );
};

export default Gallery;