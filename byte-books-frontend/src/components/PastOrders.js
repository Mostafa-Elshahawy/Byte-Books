import React from 'react';
import { Typography, List, ListItem, ListItemText } from '@material-ui/core';

const PastOrders = ({ orders }) => {
  return (
    <div>
      <Typography variant="h4">Past Orders</Typography>
      {orders.length === 0 ? (
        <Typography variant="body1">You have no past orders</Typography>
      ) : (
        <List>
          {orders.map((order, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={`Order #${order.id}`}
                secondary={`Total: $${order.total}`}
              />
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
};

export default PastOrders;
