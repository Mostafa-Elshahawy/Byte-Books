import React,{useState} from 'react';
import { Grid, Button,TextField,DialogContent, DialogActions } from '@mui/material';
import ImageUpload from './ImageUpload';
import axios from 'axios';
const DialogBox = ({open,handleCloseDialog,handleSave})=> {
    const [formData,setFormData] = useState({
        name:'',
        description:'',
        author:'',
        price:'',
        quantity:'',
        image:''
    });
    const handleImageUpload = async (file) => {
        try{
            const response = await axios.post('http://localhost:8000/admin/upload-image',file);
            setFormData({...formData,image:response.data.image});
        }catch(error){
            console.log(error);
        }
    }

    const handleImageReset = ()=>{
        setFormData({...formData,image:''});
    }
    const handleChange = (e) =>{
        setFormData({...formData,[e.target.id]:e.target.value});
    }

    const saveProduct = ()=>{
        handleSave(formData);
        handleCloseDialog();
    }

    return (
        <DialogContent open={open} onClose={handleCloseDialog} >
        <DialogContent>
            <Grid container direction='column' justify="center" alignItems="center" style={{ borderRight: '1px solid #ccc', width: '50%' }}>
            <TextField required autoFocus margin="dense" id="name" label="Name" type="text" fullWidth onChange={handleChange}/>
            <TextField required margin='dense' id='description' label='Description' type='text' fullwidth onChange={handleChange}/>
            <TextField required margin='dense' id ='author' label='Author' type='text' fullwidth onChange={handleChange}/>
            <TextField required margin='dense' id='price' label='Price' type='number' fullwidth onChange={handleChange}/>
            <TextField required margin='dense' id='quantity' label='Quantity' type='number' fullwidth onChange={handleChange}/>
            <ImageUpload onUpload={handleImageUpload} onReset={handleImageReset}/>
            </Grid>
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
