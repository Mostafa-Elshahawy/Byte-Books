// ProductEdit.js
import React, { useState, useEffect } from 'react';
import { Button} from '@mui/material';
import DialogBox from './DialogBox';
import axios from 'axios';

const ProductEdit = () => {
  // State for managing product editing
  const [openDialog, setOpenDialog] = useState(false);
  const [uploadedImage,setUploadedImage] = useState(null);

  const handleCreate = ()=>{
    setOpenDialog(true);
  }
  // Handler to open the edit dialog
  const handleEdit = () => {
    setOpenDialog(true);
   
  };

  // Handler to close the edit dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setUploadedImage(null);
  };

  const handleImageUpload = (file)=>{
    setUploadedImage(file);
  }

  const handleSave = async (formData)=>{

        try{
          const response = await axios.post('http://localhost:8000/products/create',formData);
          console.log(response.data);
        }
        catch(error){
          console.log(error)
        }
    }


  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleCreate}>
        Add Product
      </Button>
      {/* Render product editing form/dialog */}
      <DialogBox open={openDialog} handleCloseDialog={handleCloseDialog} handleImageUpload={handleImageUpload} uploadedImage={uploadedImage} handleSave={handleSave}/>
    </div>
  );
};

export default ProductEdit;
