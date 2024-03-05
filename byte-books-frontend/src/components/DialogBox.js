import React,{useState} from 'react';
import { Button,TextField,DialogContent, DialogActions } from '@mui/material';
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
        const { id, value } = e.target;
    let newValue;

    // Check if the id is 'price' or 'quantity' and parse accordingly
    if (id === 'price') {
        newValue = parseFloat(value);
    } else if (id === 'quantity') {
        newValue = parseInt(value, 10); // The second argument, 10, specifies the radix (base) for the conversion
    } else {
        newValue = value;
    }

    setFormData({ ...formData, [id]: newValue });
    }

    const saveProduct = ()=>{
        handleSave(formData);
        handleCloseDialog();
    }

    return (
        <DialogContent open={open} onClose={handleCloseDialog} >
        <DialogContent>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center',justifyContent: 'center' }}>
            <div style={{width:'600px', margin:'10px'}}><TextField required  id="name"  label="Name" type="text" fullWidth onChange={handleChange}/></div>
            <div style={{width:'600px', margin:'10px'}}><TextField required  id='description'  label='Description' type='text' fullwidth onChange={handleChange}/></div>
            <div style={{width:'600px', margin:'10px'}}><TextField required  id ='author' label='Author' type='text' fullwidth onChange={handleChange}/></div>
            <div style={{width:'200px', margin:'10px'}}><TextField required  id='price' label='Price' type='number' fullwidth onChange={handleChange}/></div>
            <div style={{width:'200px', margin:'10px'}}><TextField required  id='quantity'  label='Quantity' type='number' fullwidth onChange={handleChange}/></div>
            <div style={{width:'600px', margin:'10px'}}><ImageUpload onUpload={handleImageUpload} onReset={handleImageReset}/></div>
            </div>
        </DialogContent>
        <DialogActions style={{justifyContent:'space-between'}}>
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
