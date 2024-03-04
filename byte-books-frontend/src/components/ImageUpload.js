import React,{useState} from 'react';

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
            <button onClick={handleUpload}>Upload</button>
            <button onClick={onReset}>Reset</button>
        </div>
    );
};

export default ImageUpload;