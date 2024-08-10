import React from 'react';
import { Card } from 'react-bootstrap';

function CustomCard({ variant }) {
    return (
        <Card
            bg={variant.toLowerCase()}
            key={variant}
            text={variant.toLowerCase() === 'light' ? 'dark' : 'white'}
            style={{ width: '18rem' }}
            className="mb-2"
            border="dark"
        >
            
            <Card.Body>
                <Card.Text>
                    <center>Task Management App</center>
                    
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default CustomCard;
