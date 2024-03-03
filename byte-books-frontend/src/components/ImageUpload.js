import React,{useState} from 'react';
import axios from 'axios';

const ImageUpload = () => {

    const[selectedImage,setSeltectedImage] = useState(null);
    const[uploadResponse,setUploadResponse] = useState(null);

    const handleImageChange = (e) =>{
        setSeltectedImage(e.target.files[0]);
    };

    const handleUpload = async () => {
        if(selectedImage){
            const formData = new FormData();
            formData.append('image',selectedImage);

            try{
                const response = await axios.post('http://localhost:8000/admin/upload-image',formData);
                setUploadResponse(response.data);
            }catch(error){
                console.log(error)
                setUploadResponse(error);
            }
        }
        else{
            console.warn("no Image Selected")
        }
    }
    return(
        <div>
            <input type='file' accept='image/*' onChange={handleImageChange} />
            <button onClick={handleUpload}>Upload</button>
            {uploadResponse &&<p>{uploadResponse}</p>}
        </div>
    );
};

export default ImageUpload;