import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography, styled } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

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

  const fetchCartItems = async () => {
    try {
      const response = await axios.get('http://localhost:8000/user/cart', { withCredentials: true });
      setCartItems(response.data);
      let total = 0;
      response.data.forEach(item => {
        total += item.price * item.quantity;
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
      await axios.post('http://localhost:8000/user/orders/checkout', {}, { withCredentials: true });
      setCartItems([]);
    } catch (error) {
      console.error('Error checking out:', error);
    }
  };

  return (
    <div>
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
                  <img src={`${process.env.PUBLIC_URL}/images/${item.image}`} alt={item.name} style={{ maxWidth: 100, maxHeight: 150 }} />
                </StyledImageCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>${item.price.toFixed(2)}</TableCell>
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
      <Typography variant="subtitle2" align="right" gutterBottom>
        Total: ${totalAmount.toFixed(2)}
      </Typography>
      <Button variant="contained" color="primary" onClick={handleCheckOut} fullWidth>
        Checkout
      </Button>
    </div>
  );
};

export default ShoppingCart;
