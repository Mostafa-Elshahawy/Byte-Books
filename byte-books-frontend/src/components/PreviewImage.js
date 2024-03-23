import React from 'react';

const PreviewImage = ({ imageSrc }) => {
    return (
        <div>
            <img src={`${process.env.PUBLIC_URL}/images/${imageSrc}`} alt={imageSrc}  
            style={{ width:'500px',height:'1250px', backgroundSize: 'cover'}} />
        </div>
    );
};

export default PreviewImage;