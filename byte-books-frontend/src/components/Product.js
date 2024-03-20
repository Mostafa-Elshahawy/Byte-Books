import React, { useState } from 'react';
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';

const Product = ({ bookName, Author, imageSrc, Price, Description, onClick }) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    }

    const handleMouseLeave = () => {
        setIsHovered(false);
    }

    return (
        <Card 
            style={{ position: 'relative', overflow: 'hidden', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <CardActionArea onClick={onClick}>
                <CardMedia
                    component="img"
                    height="200"
                    image={imageSrc}
                    alt={bookName}
                />
                <CardContent style={{ position: 'absolute', bottom: 0, backgroundColor: 'rgba(255,255,255,0.8)', width: '100%', transition: 'all 0.3s', transform: isHovered ? 'translateY(0)' : 'translateY(100%)' }}>
                    <Typography gutterBottom variant="h5" component="div" style={{ fontWeight: 'bold' }}>
                        {bookName}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        by {Author}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" style={{ marginTop: '8px' }}>
                        Price: {Price}
                    </Typography>
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
