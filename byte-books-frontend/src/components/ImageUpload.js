import React,{useState} from 'react';
import {Button} from '@mui/material'; 

const ImageUpload = ({onUpload,onReset}) => {

    const[selectedImage,setSelectedImage] = useState(null);

    const handleImageChange = (e) =>{
        setSelectedImage(e.target.files[0]);
    };

    const handleUpload = ()=> {
        if(selectedImage){
            const formData = new FormData();
            formData.append('image',selectedImage);
            onUpload(formData);
        }else{
            console.warn("no Image Selected");
        }
    }

    return(
        <div>
            <input type='file' accept='image/*' onChange={handleImageChange} />
            <Button color='secondary' onClick={handleUpload}>Upload</Button>
            <Button color='secondary' onClick={onReset}>Reset</Button>
        </div>
    );
};

export default ImageUpload;