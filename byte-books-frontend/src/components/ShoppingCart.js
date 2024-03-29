import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography, styled } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Snackbar from '@mui/material/Snackbar';

const StyledTableContainer = styled(TableContainer)({
  maxWidth: 800,
  margin: 'auto',
  marginTop: theme => theme.spacing(2),
});

const StyledTable = styled(Table)({
  minWidth: 500,
});

const StyledTableHead = styled(TableHead)({
  backgroundColor: theme => theme.palette.primary.main,
});

const StyledTableCell = styled(TableCell)({
  color: '#fff',
  fontWeight: 'bold',
});

const StyledImageCell = styled(TableCell)({
  maxWidth: 100,
  maxHeight: 150,
});

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const fetchCartItems = async () => {
    try {
      const response = await axios.get('http://localhost:8000/user/cart', { withCredentials: true });
      setCartItems(response.data);
      let total = 0;
      response.data.forEach(item => {
        total += (item.Product[0].price || 0) * (item.quantity || 0);
      });
      setTotalAmount(total);
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  }

  useEffect(() => {
    fetchCartItems()
  }, []);

  const handleDeleteItem = async (itemId) => {
    try {
      await axios.delete(`http://localhost:8000/user/cart/product/${itemId}`, { withCredentials: true });
      setCartItems(cartItems.filter(item => item.id !== itemId));
    } catch (error) {
      console.error('Error deleting item from cart:', error);
    }
  };

  const handleCheckOut = async () => {
    try {
      const response = await axios.post('http://localhost:8000/user/orders/checkout', {}, { withCredentials: true });
      if(response.data.message === 'order placed successfully'){
        setCartItems([]);
        setSnackbarMessage('Order placed successfully');
        setSnackbarOpen(true);
      }
      
    } catch (error) {
      console.error('Error checking out:', error);
    }
  };

  return (
    <div style={{display:'flex',flexDirection: 'row', justifyContent: 'center', alignItems: 'center', margin:'100px'}}>
      <Typography variant="h6" gutterBottom>
        Shopping Cart
      </Typography>
      <StyledTableContainer component={Paper}>
        <StyledTable>
          <StyledTableHead>
            <TableRow>
              <StyledTableCell>Image</StyledTableCell>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Price</StyledTableCell>
              <StyledTableCell>Quantity</StyledTableCell>
              <StyledTableCell>Delete</StyledTableCell>
            </TableRow>
          </StyledTableHead>
          <TableBody>
            {cartItems.map((item) => (
              <TableRow key={item.id}>
                <StyledImageCell>
                  <img src={`${process.env.PUBLIC_URL}/images/${item.Product[0].image}`} alt={item.name} style={{ maxWidth: 100, maxHeight: 150 }} />
                </StyledImageCell>
                <TableCell>{item.Product[0].name}</TableCell>
                <TableCell>${(item.Product[0].price || 0).toFixed(2)}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>
                  <Button onClick={() => handleDeleteItem(item.id)}>
                    <DeleteIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </StyledTable>
      </StyledTableContainer>
      <div>
         <Typography variant="h1" align="center" gutterBottom>
        Total: ${(totalAmount || 0).toFixed(2)}
      </Typography>
      <Button variant="contained" color="primary" onClick={handleCheckOut} style={{width:'200px'}}>
        Checkout
      </Button>
      </div>
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={() => setSnackbarOpen(false)} message={snackbarMessage}/>
    </div>
  );
};

export default ShoppingCart;
