import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import ImageUpload from './ImageUpload';

const EditDialog = ({ open, handleClose, Product, handleSave, handleEdit,handleImageUpload,handleImageReset,uploadedImage }) => {

    const handleChange = (field, value) => {
        let parsedValue;

        if (field === 'price') {
            parsedValue = parseFloat(value);
        } else if (field === 'quantity') {
            parsedValue = parseInt(value, 10); 
        } else {
            parsedValue = value;
        }

        handleEdit({ ...Product, [field]: parsedValue ,image: uploadedImage});
    };


    return (
        <Dialog open={open} onClose={handleClose}  >
            <DialogTitle>Edit Product</DialogTitle>
            <DialogContent >
                <TextField
                    margin='dense'
                    label='name'
                    value={Product?.name || ''}
                    onChange={(e) => handleChange('name', e.target.value)}
                />
                <TextField
                    margin='dense'
                    label='description'
                    value={Product?.description || ''}
                    onChange={(e) => handleChange('description', e.target.value)}
                />
                <TextField
                    margin='dense'
                    label='author'
                    value={Product?.author || ''}
                    onChange={(e) => handleChange('author', e.target.value)}
                />
                <TextField
                    margin='dense'
                    label='price'
                    value={Product?.price || ''}
                    onChange={(e) => handleChange('price', e.target.value)}
                />
                <TextField
                    margin='dense'
                    label='quantity'
                    value={Product?.quantity || ''}
                    onChange={(e) => handleChange('quantity', e.target.value)}
                />
                <ImageUpload onUpload={handleImageUpload} onReset={handleImageReset} />
            </DialogContent>
            <DialogActions>
                <Button color='secondary' onClick={handleClose}>Cancel</Button>
                <Button color='secondary' onClick={handleSave}>Save</Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditDialog;
