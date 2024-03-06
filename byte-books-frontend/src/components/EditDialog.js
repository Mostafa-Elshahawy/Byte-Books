import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';

const EditDialog = ({open,handleClose,Product,handleSave,handleEdit}) => {

    
    return(
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Edit Product</DialogTitle>
            <DialogContent>
                <TextField label='name' value={Product?.name || ''} onChange={(e)=>handleEdit({...Product,name:e.target.value})}/>
                <TextField label='description' value={Product?.description || ''} onChange={(e)=>handleEdit({...Product,description:e.target.value})}/>
                <TextField label='author' value={Product?.author || ''} onChange={(e)=>handleEdit({...Product,author:e.target.value})}/>
                <TextField label='price' value={Product?.price || ''} onChange={(e)=>handleEdit({...Product,price:e.target.value})}/>
                <TextField label='quantity' value={Product?.quantity || ''} onChange={(e)=>handleEdit({...Product,quantity:e.target.value})}/>
            </DialogContent>
            <DialogActions>
                <Button color='secondary' onClick={handleClose}>Cancel</Button>
                <Button color='secondary' onClick={handleSave}>Save</Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditDialog;