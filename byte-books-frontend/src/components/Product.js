import React, { useState } from 'react';
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import { useHistory } from 'react-router-dom';

const Product = ({ id, bookName, Author, imageSrc, Price, Description }) => {
    const history = useHistory();
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    }

    const handleMouseLeave = () => {
        setIsHovered(false);
    }

    const handleClick = () => {
        history.push(`/product/${id}`);
    }

    return (
        <Card 
            style={{ 
                position: 'relative', 
                overflow: 'hidden', 
                borderRadius: '10px', 
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <CardActionArea onClick={handleClick}>
                <CardMedia
                    component="img"
                    height="550" 
                    image={`${process.env.PUBLIC_URL}/images/${imageSrc}`}
                    alt={`${bookName}`}
                    style={{ width: '100%', objectFit: 'contain' }} 
                />
                <CardContent style={{ 
                    position: 'absolute', 
                    top: 350, 
                    backgroundColor: 'rgba(255,255,255,0.8)', 
                    width: '100%', 
                    transition: 'all 0.3s', 
                    transform: isHovered ? 'translateY(0)' : 'translateY(50%)' 
                    }}>
                    <Typography gutterBottom variant="h5" component="div" style={{ fontWeight: 'bold' ,textAlign:'center'}}>
                        {bookName}
                    </Typography>
                    {!isHovered && (<>
                        <Typography variant="body2" color="textSecondary" style={{ marginTop: '4px' ,textAlign:'center'}}>
                        by {Author}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" style={{ marginTop: '8px' ,textAlign:'center'}}>
                        Price: {Price}
                    </Typography>
                    </>
                    )}
                    {isHovered && (
                        <Typography variant="body2" color="textSecondary" style={{ marginTop: '8px' }}>
                            Description: {Description}
                        </Typography>
                    )}
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

export default Product;
