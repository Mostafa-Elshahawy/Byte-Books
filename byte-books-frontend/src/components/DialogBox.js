import React,{useState} from 'react';
import { Button,TextField,DialogContent, DialogActions } from '@mui/material';
import ImageUpload from './ImageUpload';
const DialogBox = ({open,handleCloseDialog,handleImageUploead,uploadedImage, handleSave})=> {
    const [formData,setFormData] = useState({
        name:'',
        description:'',
        author:'',
        price:'',
        quantity:'',
        image:''
    });

    const handleChange = (e) =>{
        setFormData({...formData,[e.target.id]:e.target.value});
    }

    const saveProduct = ()=>{
        setFormData({...formData,imageURL:URL.createObjectURL(uploadedImage)});
        handleSave(formData);
        handleCloseDialog();
    }

    return (
        <DialogContent open={open} onClose={handleCloseDialog} >
        <DialogContent>
            <TextField autoFocus margin="dense" id="name" label="Name" type="text" fullWidth onChange={handleChange}/>
            <TextField margin='dense' id='description' label='Description' type='text' fullwidth onChange={handleChange}/>
            <TextField margin='dense' id ='author' label='Author' type='text' fullwidth onChange={handleChange}/>
            <TextField margin='dense' id='price' label='Price' type='number' fullwidth onChange={handleChange}/>
            <TextField margin='dense' id='quntity' label='Quantity' type='number' fullwidth onChange={handleChange}/>
            <ImageUpload handleImageUploead={handleImageUploead} />
            {uploadedImage && (<img src={URL.createObjectURL(uploadedImage)} alt='Uploaded' style={{width: '100%', marginTop: '10px'}}/>)}
        </DialogContent>
        <DialogActions>
            <Button onClick={handleCloseDialog} color='primary'>
                cancel
            </Button>
            <Button onClick={saveProduct} color='primary'>
                save
            </Button>
        </DialogActions>
        </DialogContent>
    );
};

export default DialogBox;
