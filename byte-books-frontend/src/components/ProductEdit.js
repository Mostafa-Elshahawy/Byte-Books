// ProductEdit.js
import React, { useState} from 'react';
import DialogBox from './DialogBox';
import axios from 'axios';

const ProductEdit = () => {
  // State for managing product editing
  const [openDialog, setOpenDialog] = useState(false);

  // Handler to close the edit dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };


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
      {/* Render product editing form/dialog */}
      <DialogBox open={openDialog} handleCloseDialog={handleCloseDialog} handleSave={handleSave}/>
    </div>
  );
};

export default ProductEdit;
